(function(){
	'use strict';
	
	angular
		.module('demo', ['ngMaterial'])
		.controller('AppController', AppController);
		
	function AppController() {
		var vm = this;
		
		vm.title = "This Title";
	}
})();