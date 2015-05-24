# PostCSS Unwrap @media

[![Build Status](https://travis-ci.org/mistakster/postcss-unwrap-at-media.svg?branch=master)](https://travis-ci.org/mistakster/postcss-unwrap-at-media)

[PostCSS] plugin to unwrap @media rules to make styles IE8 (and older) friendly.


```css
/* Input example */
.block {
  width: 100%;
}
@media (min-width: 720px) {
  .block {
    float: left;
    width: 25%;
  }
}
```

```css
/* Output example */
.block {
  width: 100%;
}
.block {
  float: left;
  width: 25%;
}
```

## Usage

Basic usage:

```js
postcss([ require('postcss-unwrap-at-media') ])
```

Here is an example of Gulpfile which create two versions of styles: 

```js
var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var unwrapAtMedia = require('postcss-unwrap-at-media');
 
gulp.task('default', function () {
  return gulp.src('./src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/'))
    .pipe(postcss([ unwrapAtMedia ]))
    .pipe(rename({ suffix: '.ie8' }))
    .pipe(gulp.dest('./dist/'));
});
```

See [PostCSS] docs for examples for your environment.


[PostCSS]: https://github.com/postcss/postcss
