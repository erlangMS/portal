/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
      'angular2-datatable': 'npm:angular2-datatable',
      'lodash': 'npm:lodash/lodash.js',
      'angular2-modal': 'npm:angular2-modal/bundles/angular2-modal.umd.js',
      'angular2-modal/plugins/bootstrap': 'npm:angular2-modal',
      'underscore': 'npm:underscore',
      
      // my libraries
      'dashboard':                 'app/dashboard/main.js',
        'seguranca':                 'npm:seguranca'
      
      
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'angular2-datatable': {
		  main: './index.js',
		  defaultExtension: 'js'
	  },
	  'angular2-modal': { 
		 defaultExtension: 'js', 
	  },
	  'angular2-modal/plugins/bootstrap': { 
		 defaultExtension: 'js', 
		 main: 'bundles/angular2-modal.bootstrap.umd.js' 
	  },
	  'underscore': { 
		 main: './underscore.js',
		 defaultExtension: 'js'
	  },
	  'dashboard': {
		 defaultExtension: 'js'
	  },
        seguranca: {
            main: './seguranca.js',
            defaultExtension: 'js'
        }
	  
    },
    
  
  
  });
})(this);
