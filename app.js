(function(){
	'use strict';
	
	angular
		.module('demo', ['ngMaterial'])
		.controller('AppController', AppController)
		.config(ThemingProvider);
			
	function ThemingProvider($mdThemingProvider) {
    	// Configure a dark theme with primary foreground yellow
    	$mdThemingProvider.theme('docs-dark', 'default')
      		.primaryPalette('yellow')
      		.dark();
  	}
		
	function AppController() {
		var vm = this;
		
		vm.title = "This Title";
	}
})();