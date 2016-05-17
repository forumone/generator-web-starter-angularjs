module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'sync:source',
    'sync:build'
  ]);
};
