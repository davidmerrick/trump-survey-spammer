module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            background: {
                options: {
                    transform: [['babelify', {presets: ['es2015', 'react']}]]
                },
                src: 'src/app/Background.js',
                dest: 'dist/js/background-bundle.js'
            },
            client: {
                options: {
                    transform: [['babelify', {presets: ['es2015', 'react']}]]
                },
                src: 'src/app/Client.js',
                dest: 'dist/js/client-bundle.js'
            }
        },
        watch: {
            files: 'src/**',
            tasks: ['default']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', ['browserify', 'watch']);
};