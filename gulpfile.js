"use strict";

var gulp = require("gulp"); // подключение gulp
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass"); // плагин для компиляции scss в css
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");  // плагин для автоматического добавления префиксов в css
var csso = require("gulp-csso");
var rename = require("gulp-rename"); // плагин для переименования файлов
var server = require("browser-sync").create(); // плагин для создания локального сервера
var imagemin = require("gulp-imagemin"); // плагин для минификации изображений
var svgstore = require("gulp-svgstore"); // плагин для создания svg спрайтов
var posthtml = require("gulp-posthtml"); // плагин для минификации html
var include = require("posthtml-include"); // подключает файлы в html
var del = require("del"); // плагин для удаления файлов и каталогов
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify'); // плагин для минификации js
var replace = require('gulp-replace');
const svgmin = require("gulp-svgmin"); // плагин для минификации svg

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass()).on('error', sass.logError)
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false,
    index: "index.html"
  });

  gulp.watch("source/sass/*/.scss", gulp.series("css", "refresh"));
  gulp.watch("source/img/vector/sprite-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
});

gulp.task("cssDev", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("serverDev", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("cssDev"));
  gulp.watch("source/img/vector/sprite-*.svg").on("change", server.reload);
  gulp.watch("source/*.html").on("change", server.reload);
  gulp.watch("source/js/*.js").on("change", server.reload);
});


gulp.task("images", function () {
  return gulp.src("source/img/*/.{png,jpg,svg}") // путь ко всем изображениям
    .pipe(imagemin([ // минифицируем изображения
      imagemin.optipng({optimizationLevel: 3}), // безопасное сжатие
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img")); // выгружаем минифицированные изображения в build/img
});

gulp.task("sprite", function () {
  //
  // return gulp.src("source/img/vector/**/*.svg") // указываем путь к svg файлам
  //   .pipe(svgmin({
  //     plugins: [{
  //       removeViewBox: false
  //     }]
  //   })) // минимизируем svg перед созданием спрайта
  //   .pipe(cheerio({
  //     run: function ($) {
  //       $('[fill]').removeAttr('fill');
  //       $('[style]').removeAttr('style');
  //     },
  //     parserOptions: {
  //       xmlMode: true
  //     }
  //   }))
  //   // .pipe(replace('&gt;', '>'))
  //   .pipe(svgstore({ // создаем спрайт
  //     inlineSvg: true // уберет из файла все не нужное (doctype, xml и прочее)
  //   }))
  //   .pipe(rename('sprite.svg')) // перименовываем svg
  //   .pipe(gulp.dest(path.img.build + 'vector')); // выгружаем в папку build/img





  return gulp.src("source/img/sprite-*.svg")
    .pipe(svgstore({ // создаем спрайт
      inlineSvg: true // уберет из файла все не нужное (doctype, xml и прочее)
    }))
    .pipe(rename("sprite.svg")) // перименовываем svg
    .pipe(gulp.dest("source/img")); // выгружаем в папку build/img
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(replace('.js', '.min.js'))
    .pipe(replace('style.css', 'style.min.css'))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build/"));
});

gulp.task("js", function () {
  return gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "images", "sprite", "css", "js", "html"));
gulp.task("start", gulp.series("build", "server"));
gulp.task("startDev", gulp.series("cssDev", "serverDev"))
