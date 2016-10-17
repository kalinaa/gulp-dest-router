# Install

```
npm install gulp-dest-router --save-dev
```

# Basic Usage

You can use routes for build your files in different directories.
Like this:

```javascript
'use strict';

var destRouter = require('gulp-dest-router');

gulp.task('copy:static', function () {
    gulp.src([
               './index.html',
               './static/images/*.png'  if you use '*' in path, you must use exact relative path to the file in router
             ])
        .pipe(destRouter({
            dest:'./build/assets',      //default destination path for all files
            routes:{
                'index.html': '../',    //for index.html dest path is up one level from default dest path
                'vk.png':'icons'        //for ./static/images/vk.png file dest path is ./build/assets/icons,
                '*': 'other_folder'     //for all other files (use '*' symbol)
                                            //in ./static/images/ dest path is ./build/assets/other_folder
            }
        }));
})
```

> if '*' not defined, all files will be copied to default destination path
> gulp-dest-router is not able to handle folder completely, like 'path/to/include/**'

Also you can use it instead gulp.dest
```
'use strict';

var destRouter = require('gulp-dest-router');

gulp.task('styles', function () {
    gulp.src('*.css')
        .pipe(destRouter('styles'));      // copy all .css files to 'styles' directory
})
```

## Options

- `dest`

	//`String`.
	Default destination path for all files.

- `routes`

	//`Object`
	Optional setting. If pass it, all files will be copied to default dest path.
	'*' - use for all files.

	```
	{
	    'relativePath/to/srcFile': 'dest/path'
	}
	```
	> relative path from source path, which has been defined in gulp.src()