(function(){
	var myResume = angular.module('myResume', ['myResumeServices']);
		
	 
	
	myResume.controller('MyCtrl', function($scope, myResumeData  ){
		
		// Data mangement
		$scope.links = myResumeData.getLinks();
		$scope.nav = myResumeData.getNavigation();
		$scope.profile = myResumeData.getProfile();	
 
		 
	 
		$scope.fitnes = myResumeData.getFitnesInfo();	
 
		$scope.body = myResumeData.getBodyInfo();	
 
		
		 
	});
	
})();
