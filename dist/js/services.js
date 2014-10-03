(function(){
	var myResumeServices = angular.module('myResumeServices', []);
	
	/**************************************
	* Data service
	***************************************/
	
	myResumeServices.factory('myResumeData', function(utility){
		return {
			getProfile : function() {
				var profileData = {
					sername: '',
					name: '',
					birthDate: '',
					password: '',
					password2: '',
					email: '',
					sex:'',
				};
		 
				return profileData;
			},
			getFitnesInfo : function() {
				var fitness = {
				 
					height: '',
					weight:'',
					fat:'',
					neck:'',
					chest:'',
					waist:'',
					hip:'',
					biceps:'',
					forearm:'',
					wrist:'',
					thigh:'',
					ikra:'',
					ankle:'',
					
					
				};
		 
				return fitness;
			},
		 
		 	getBodyInfo : function() {
				var bodyData = {
					sername: '',
					name: '',
					birthDate: '',
					password: '',
					password2: '',
					email: '',
					sex:'',
				};
		 
				return bodyData;
			},	
			getStrength : function() {
				var strength = {
					benchPress: '',
					deadlift: '',
					tightening: '',
					squat: '',
					pressstanding: '', 
					 
				};
		 
				return strength;
			},
			
			getNavigation : function(){
				var nav = {
					profile : 'Профиль',
					skills  : 'Зал',
					career  : 'Сила',
					hobbies : 'Тело',
					
				};
				return nav;
			},
			 
			getLinks : function(){
				var links = {
					 
					linkedin : 'https://www.linkedin.com/profile/view?id=170491973&trk=nav_responsive_tab_profile',
					twitter  : 'https://twitter.com/SergMayakov',
	 
				}
				return links;
			},
			 
		};
	});
	
	 
	 
	myResumeServices.factory('REST', ['$resource', function($resource) {
		var res = $resource('http://www.htmlcodetutorial.com/cgi-bin/mycgi.pl');
	
		return res;
	}]);
	/**************************************
	* Utility service
	***************************************/
	
	myResumeServices.factory('utility', function(){
		return {
			contains : function(value1, value2){
				return MY_RESUME.contains(value1, value2);
			},
		 
			replaceParameters : function(string, values){
				return MY_RESUME.replaceParameters(string, values);
			}
		};
	});
	
	/**************************************
	* Loader management
	***************************************/
	
	// http method for which we want to display a spinner 
	var httpMethodWithSpinner = 'POST';
	// intercept http methods to add treatment
	myResumeServices.factory('myHttpInterceptor', function($q, $rootScope){
		return {
			'request': function(config) {
				if(config.method == httpMethodWithSpinner){
					// show loader
					$rootScope.$broadcast("show_loader");
				}
				return config || $q.when(config);
			},
			'response': function(response) {
				if(response.config.method == httpMethodWithSpinner){
					$rootScope.$broadcast("hide_loader");
				}
				return response || $q.when(response);
			},
			'responseError': function (rejection) {
				if(rejection.config.method == httpMethodWithSpinner){
					$rootScope.$broadcast("hide_loader");
				}
				return $q.reject(rejection);
			}
		};
	});
	myResumeServices.config(function($httpProvider){
		$httpProvider.interceptors.push('myHttpInterceptor');
	});
	myResumeServices.directive("loader", function(){
		return {
			link : function($scope, element){
				// hide the element initially
				element.hide();
				$scope.$on("show_loader", function () {
					element.show();
				});
				$scope.$on("hide_loader", function () {
					element.hide();
				});
			}
		};
	});
	
})();
