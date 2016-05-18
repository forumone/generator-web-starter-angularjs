module.exports = function (grunt) {
  grunt.registerTask('default', [
    'build',
    'connect',
    // 'simple-watch',
    'watch' // Must use watch task for LiveReload to work.
  ]);
};
