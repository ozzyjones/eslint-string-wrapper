module.exports = function (grunt) {

    // Project Config.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        tslint: {
            options: {
                configuration: 'tslint.json',
                force: false,
                fix: true
            },
            files: {
                src: [
                    'src/*.{ts,tsx}'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-tslint');

    grunt.registerTask('default', ['tslint']);
};