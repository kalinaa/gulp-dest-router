# Install

```
npm install gulp-dest-router --save-dev
```

# Basic Usage

You can use routes to build your files in different directories.
Like this:

```javascript
'use strict';

var destRouter = require('gulp-dest-router');

gulp.task('copy:static', function () {
    gulp.src([
               './index.html',
               './static/images/*.png'  //if you use '*' in path, you must use exact relative path
             ])                           //to the file in router
        .pipe(destRouter({
            dest:'./build/assets',      //default destination path for all files
            routes:{
                'index.html': '../',    //for index.html dest path is one level up from default dest path
                'vk.png':'icons'        //for ./static/images/vk.png file dest path is ./build/assets/icons,
                '*': 'other_folder'     //for all other files (use '*' symbol)
            }                             //in ./static/images/ dest path is ./build/assets/other_folder
        }));
})
```

> if `*` is not defined, all files will be copied to default destination path.
> gulp-dest-router is not able to handle entire folder, like `path/to/include/**`

Also you can use it instead of gulp.dest
```javascript
'use strict';

var destRouter = require('gulp-dest-router');

gulp.task('styles', function () {
    gulp.src('*.css')
        .pipe(destRouter('styles'));      // copy all .css files to 'styles' directory
})
```

## Options

- `dest`

	`String` Required.
	Default destination path for all files.

- `routes`

	`Object`
	Optional setting. If it is passed, all files will be copied to default dest path.
	Use `*` for all files.

	```javascript
	{
	    'relativePath/to/srcFile': 'dest/path'
	}
	```
	> relative path from source path, which was defined in gulp.src()