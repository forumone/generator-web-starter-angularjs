module.exports = function (grunt) {
  grunt.registerTask('build', [
    'bower',
    'compileAssets',
    'htmlbuild'
  ]);
};
