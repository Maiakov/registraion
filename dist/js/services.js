﻿(function(){
	var myResumeServices = angular.module('myResumeServices', []);
	
	/**************************************
	* Data service
	***************************************/
	
	myResumeServices.factory('myResumeData', function(utility){
		return {
			getProfile : function() {
				var profileData = {
					title            : 'Ingénieur développement web Java J2EE !',
					name             : 'Vital Sport - с нами уже 997 234 спортменов',
					birthDate        : '01/01/1986',
					startWorkingDate : '01/01/2009',
					experience       : "$1 ans, $2 ans d'expérience"
				};
		 
				return profileData;
			},
		 
			 
			getStepDescription : function() {
				var stepDescription = {
					step1 : 'Ваше имя и фамилия будут отображаться в поиске',
					step2 : 'Указов фитнес клуб, Вы сможете найти своих знакомых',
					step3 : 'Указав данные по основным упражнениям, Вы сможете сравнить свою силу с силой других участников, а также узнать рейтинг силы',
				    step4 : 'Потратив пару миниут на заполенение параметров тела, Вы сможете сравнить свое тело с другими участниками, а также узнать рейтинг тела!'

				};
				return stepDescription;
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
