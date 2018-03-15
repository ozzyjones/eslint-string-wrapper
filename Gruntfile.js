module.exports = function (grunt) {

    // Project Config.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        tslint: {
            options: {
                configuration: 'tslint.json',
                force: false,
                fix: grunt.option('fix')
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
    grunt.registerTask('lint', ['tslint']);

    grunt.registerTask('help', function () {

        var help = 
        `
    Help Menu
    =========
    grunt tslint [--fix]        Lint Typescript
        `

        console.log(help);
    });
};