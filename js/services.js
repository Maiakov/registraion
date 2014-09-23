(function(){
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
				var age = utility.getDurationInYears(false, profileData.birthDate);
				var workExperience = utility.getDurationInYears(true, profileData.startWorkingDate);
				var experience = utility.replaceParameters(profileData.experience, [age, workExperience]);
				var profile = {
					title      : profileData.title,
					name  	   : profileData.name,
					experience : experience
				};
				return profile;
			},
			getTagCloud : function() {
				var tagCloud = [
					{label:'Шаг 1 из 4', level:0} 
				];
				return tagCloud;
			},
			 
			getHobbies : function() {
				var hobbies = {
					hobby1 : {
						title : 'Sport',
						desc1 : 'Adepte du sport et plus particulièrement du football, je pratique cette discipline en club depuis mon plus jeune âge.',
						desc2 : 'J\'ai également entrainé une équipe de jeunes ainsi que l\'équipe de mon école Polytech\' qui a remporté cette année là le tournoi inter Polytech.'
					},
					hobby2 : {
						title : 'Voyage',
						desc1 : 'De nature curieux, je voyage régulièrement dans le but de découvrir de nouvelles cultures.',
						desc2 : 'J\'ai notamment été fasciné par mes séjours en Asie du Sud (Hong-Kong, Malaisie, Singapour, Thailande, Sri-Lanka).'
					},
					hobby3 : {
						title : 'Art',
						desc1 : 'Je me passionne pour les arts modernes et les arts urbains. Je vais régulièrement voir des expositions (Warhol, Dali, Keith Haring, Banksy ...).',
						desc2 : 'De plus j\'assiste à des représentations théâtrales, les comédies de boulevard me plaisent particulièrement.'
					}
				};
				return hobbies;
			},
			getContact : function() {
				var contact = {
					form : {
						error   : 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.',
						name    : 'Nom',
						email   : 'Email',
						message : 'Message',
						send    : 'Envoyer',
						confirm : {
							part1 : 'Merci pour votre message !',
							part2 : 'A bientôt',
							back  : 'Retour au formulaire »'
						}
					},
					address : {
						city    : 'Paris',
						zipCode : '75005',
						email   : 'nicolas.huguet34[@]gmail.com'
					}
				};
				return contact;
			},
			getNavigation : function(){
				var nav = {
					profile : 'Профиль',
					skills  : 'Зал',
					career  : 'Сила',
					hobbies : 'Тело',
					contact : 'Contact'
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
			getDurationInYears : function(greater, startDate, endDate){
				return MY_RESUME.getDurationInYears(greater, startDate, endDate);
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
