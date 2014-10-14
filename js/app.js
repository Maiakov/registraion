(function(){
	var myResume = angular.module('myResume', ['myResumeServices','ngRoute','ngResource']);
		
	 
	
	myResume.controller('MyCtrl', function($scope, myResumeData  ){
		
		// Data mangement
		$scope.links = myResumeData.getLinks();
		$scope.nav = myResumeData.getNavigation();
		$scope.profile = myResumeData.getProfile();	
 
		 
		$scope.stepDescription = myResumeData.getStepDescription();
		 
		 
		
		// Style management
		var labelClassName = ['', 'label-success', 'label-warning', 'label-inverse', 'label-info', 'label-important'];
		var textColorClassName = ['muted', 'text-warning', 'text-info', 'text-success', 'text-error'];
		var tagSizeClassName = ['small-tag', 'medium-tag', 'big-tag'];
		
		$scope.labelClass = function(index){
			var labelClass = 'label';
			if(typeof labelClassName[index] !== undefined){
				labelClass += ' ' + labelClassName[index];
			}
			return labelClass;
		};
		
		$scope.tagClass = function(index, level){
			var tagClass;
			var colorClassNameId = index % 5;
			
			if(typeof textColorClassName[colorClassNameId] === undefined){
				colorClassNameId = 0;
			}
			tagClass = textColorClassName[colorClassNameId];

			if(typeof tagSizeClassName[level] === undefined){
				level = 0;
			}
			tagClass += ' ' + tagSizeClassName[level];

			return tagClass;			
		};
		
 
		
		 
	});
	
})();
