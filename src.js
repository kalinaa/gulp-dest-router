'use strict';

var
  fse = require('fs-extra'),
  path = require('path'),
  through2 = require('through2');

function router(options) {
  var
    opt = options || {},
    destPath = opt.dest || '',
    routes = opt.routes || {};

  if (typeof opt === 'string') destPath = opt;

  return through2.obj(function (file, enc, next) {
    if (file.isStream()) {
      this.emit('error', new Error('gulp-dest-router : Stream content is not supported'));
      return next(null, file);
    }
    if (file.isBuffer()) {
      try {
        var content = getFileContent(file.path);
        var paths = getFilesPath(file.relative, routes, destPath);

        if (paths.length == 0) paths = getFilesPath('*', routes, destPath);
        if (paths.length == 0) paths.push(destPath);
        file.contents = new Buffer(content);

        paths.forEach(function (item) {
          var dirName = file.relative.slice(0, file.relative.lastIndexOf('/') === -1 ?
            '' : file.relative.lastIndexOf('/'));

          fse.mkdirs(path.join(item, dirName), function (e) {
            if (e) console.log(e);
            fse.writeFile(path.join(item, file.relative), file.contents, function (e) {
              if (e) console.log(e);
            });
          });
        })
      }
      catch (err) {
        console.log(err);
        this.emit('error', new Error('Error in gulp-dest-router', err));
      }
    }
    this.push(file);
    return next();
  });
}

function getFilesPath(file, routes, destPath) {
  var paths = [];
  if (Array.isArray(routes[file])) {
    paths = routes[file].map(function (item) {
      return path.join(destPath, item);
    })
  } else if (typeof routes[file] === 'string') {
    paths.push(path.join(destPath, routes[file]));
  }
  return paths;
}

function getFileContent(file) {
  if (!fse.existsSync(file)) throw new Error('File not find: ' + file);

  return fse.readFileSync(file, { encoding: 'utf8' });
}

module.exports = router;