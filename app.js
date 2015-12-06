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
		
		vm.roiYears = 3;
		vm.weeksPerYear = 47;
		vm.daysPerWeek = 5;
		vm.hoursPerDay = 8;
		vm.tiles = [];
		vm.colCount = 6;
		vm.setXkcd = setXkcdValues;
		vm.setAu = setAuValues;
		vm.setUs = setUsValues;
		vm.setUk = setUkValues;
		vm.update = updateTiles;
		
		updateTiles();
		
		function setXkcdValues() {
			vm.roiYears = 5;
			vm.weeksPerYear = 52;
			vm.daysPerWeek = 7;
			vm.hoursPerDay = 24;
			
			updateTiles();
		}

		function setAuValues() {
			vm.roiYears = 3;
			vm.weeksPerYear = 46;
			vm.daysPerWeek = 5;
			vm.hoursPerDay = 7.6;
			
			updateTiles();
		}

		function setUsValues() {
			vm.roiYears = 3;
			vm.weeksPerYear = 50;
			vm.daysPerWeek = 5;
			vm.hoursPerDay = 8;
			
			updateTiles();
		}

		function setUkValues() {
			vm.roiYears = 3;
			vm.weeksPerYear = 46;
			vm.daysPerWeek = 5;
			vm.hoursPerDay = 8;
			
			updateTiles();
		}
		
		function updateTiles() {
			var savings = [
				{qty: 1, unit: 's', label: '1 Second'},
				{qty: 5, unit: 's', label: '5 Seconds'},
				{qty: 30, unit: 's', label: '30 Seconds'},
				{qty: 1, unit: 'm', label: '1 Minute'},
				{qty: 5, unit: 'm', label: '5 Minutes'},
				{qty: 30, unit: 'm', label: '30 Minutes'},
				{qty: 1, unit: 'h', label: '1 Hour'},
				{qty: 6, unit: 'h', label: '6 Hours'},
				{qty: 1, unit: 'd', label: '1 Day'}];
			var frequencies = [
				{qty: 50, res: 'd', label: '50x Daily'},
				{qty: 5, res: 'd', label: '5x Daily'},
				{qty: 1, res: 'd', label: '1x Daily'},
				{qty: 1, res: 'w', label: '1x Weekly'},
				{qty: 1, res: 'm', label: '1x Monthly'},
				{qty: 1, res: 'y', label: '1x Yearly'}];
			var valueCeiling = vm.roiYears * vm.weeksPerYear * vm.daysPerWeek * vm.hoursPerDay * 60 * 60;
			var result = [];
			
			savings.forEach(function(savingsItem) {
				frequencies.forEach(function(frequencyItem){
					var effortInSeconds = savingsItem.qty;
					switch (savingsItem.unit)
					{
						case 'd':
							effortInSeconds *= vm.hoursPerDay;
						case 'h':
							effortInSeconds *= 60;
						case 'm':
							effortInSeconds *= 60;
							break;
					}
					
					var yearlyFrequency = frequencyItem.qty;
					switch (frequencyItem.res)
					{
						case 'd':
							yearlyFrequency *= vm.daysPerWeek * vm.weeksPerYear;
							break;
						case 'w':
							yearlyFrequency *= vm.weeksPerYear;
							break;
						case 'm':
							yearlyFrequency *= 12;
							break;
					}
					
					var tile;
					var totalSecondsSaved = effortInSeconds * yearlyFrequency * vm.roiYears;
					if (totalSecondsSaved > valueCeiling)
					{
						tile = {
							maxEffort: 'Impossible',
							timeSaved: savingsItem.label,
							frequency: frequencyItem.label,
							background: {'background-color': '#CC0000'}};
					}
					else
					{
						var savings = totalSecondsSaved;
						var unit = 'second';
						var max = 60;
						while (savings > max)
						{
							savings /= max;
							switch (unit)
							{
								case 'second':
									unit = 'minute';
									break;
								case 'minute':
									unit = 'hour';
									max = vm.hoursPerDay;
									break;
								case 'hour':
									unit = 'day';
									max = vm.daysPerWeek;
									break;
								case 'day':
									unit = 'week';
									max = vm.weeksPerYear;
									break;
								case 'week':
									unit = 'year';
									max = 1000000;
									break;
							}
						}
						savings = Math.floor(savings);
						if (savings > 1)
							unit = unit + 's';
						
						var fraction = 1;
						var lower = 60*60;
						var upper = 60*60*vm.hoursPerDay*vm.daysPerWeek*8;
						if (totalSecondsSaved < lower)
						{
							fraction = totalSecondsSaved / lower;
						}
						else if (totalSecondsSaved > upper)
						{
							fraction = 1 - ((totalSecondsSaved - upper) / (valueCeiling - upper));
							fraction *= fraction * fraction;
						}
						var r = Math.floor(255 - (fraction * 51.0));
						var g = Math.floor(204 + (fraction * 51.0));
						
						tile = {
							maxEffort: savings + " " + unit,
							timeSaved: savingsItem.label,
							frequency: frequencyItem.label,
							background: {'background-color': 'rgb('+r+','+g+',204)'}};						
					}
					
					result.push(tile);
				});
			});
			
			vm.tiles = result;
		}
	}
})();