var isPublic = typeof window != "undefined";
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    System.config({
        baseUrl: "/",
        paths: {
            // paths serve as alias
            'npm:': '/node_modules/'
        },
        // map tells the System loader where to look for things
        map: {

            // our app is within the client folder
            app: 'client',
            // angular bundles
            '@angular/core': '@angular/core/bundles/core.umd.js',
            '@angular/common': '@angular/common/bundles/common.umd.js',
            '@angular/compiler': '@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': '@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': '@angular/http/bundles/http.umd.js',
            '@angular/router': '@angular/router/bundles/router.umd.js',
            '@angular/forms': '@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'rxjs',
            //'angular2-in-memory-web-api': 'angular2-in-memory-web-api',
            'lodash': 'lodash/lodash.js',
        },

        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);