(function(){
	var myResume = angular.module('myResume', ['myResumeServices','ngResource','ngRoute']);
		
	 
	
	myResume.controller('MyCtrl', function($scope, myResumeData, REST){
		
		// Data mangement
		$scope.links = myResumeData.getLinks();
		$scope.nav = myResumeData.getNavigation();
		$scope.profile = myResumeData.getProfile();	
	 	
	 
	 
	  
	 	$scope.rest = function(model){
	  
			 return REST.save(model);
		 };
		 
		
		 
	});
	
})();
