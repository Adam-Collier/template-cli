var gulp = require("gulp");
var browserSync = require("browser-sync").create();

gulp.task("default", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3001
  });
  gulp.watch("./css/**/*.css").on("change", browserSync.reload);
  gulp.watch("**/*.html").on("change", browserSync.reload);
});
