var mainApp = angular.module("mainApp", ['ngRoute','studentModule','directivesModule','clear-input','ui.bootstrap']);

mainApp.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider) {
	$routeProvider
	.when('/home', {
		templateUrl: 'partial/home.html',
		controller: 'StudentController'
	})
	.when('/viewStudents', {
		templateUrl: 'partial/viewstudents.html',
		controller: 'StudentViewController'
	})
	.when('/AddStudents', {
		templateUrl: 'partial/addstudent.html',
		controller: 'StudentAddController'
	})


	.otherwise({
		redirectTo: '/home'
	})
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.headers.get = { 'Access-Control-Allow-Origin' : '*' };
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);
/*mainApp.config(function($httpProvider) {
	  $httpProvider.defaults.useXDomain = true;
	  delete $httpProvider.defaults.headers.common['X-Requested-With'];
	});
 */
mainApp.controller('StudentController', function($scope) {
	$scope.message = "Click on the hyper link to view the students list.";

});


mainApp.controller('StudentAddController',['$scope','studentsService', function($scope,studentsService) {
	alert("Add Controller...");
	$scope.add=function(){
		var name=$scope.newstudent;
		var city=$scope.newcity;	          
		studentsService.addStudent(name, city).success(function(data, status, headers) {
			//console.log(data.students);
			$scope.message="Records Added sucessfully";

		}).error(function(data, status) {
			console.log(status);
		});							
	}



}]);


mainApp.controller('StudentViewController',['$scope','studentsService', function($scope,studentsService) {

	studentsService.getStudents().success(function(data, status, headers) {
		console.log(data.students);
		$scope.studentsapp=data.students;
	}).error(function(data, status) {
		console.log(status);
	});



}]);

mainApp.controller('autocompleteController', ['$scope','$http','studentsService',function($scope, $http,studentsService) {

	//alert($scope.selectedCountries);
	//getCourses(); // Load all countries with capitals
	$scope.docs=[];
	$scope.firstsearch=function getCourses(searchString){
		var searchField=$scope.selectedCountries
		console.log(searchString);

		if(searchField!=null || searchField != undefined || searchField !="" ){

			studentsService.getSolrExactResponse(searchString).success(function(data, status, headers) {
				console.log(data.response.docs);
				$scope.courses = data.response.docs;
				var dataset=new Array();

				for(var i=0;i<data.response.docs.length;i++){
					
					if(i%2!=0){
						dataset[i]={"name":data.response.docs[i].FEATURE_NAME+","+data.response.docs[i].COUNTY_NAME,"Match":"EXACT"};		  
					}
					if(i%2==0){
						dataset[i]={"name":data.response.docs[i].FEATURE_NAME+","+data.response.docs[i].COUNTY_NAME,"Match":"SUGGESTED"};		  
					}
				} 
				$scope.countries= _(dataset)
				.groupBy('Match')
				.map(function (g) {
					g[0].firstInGroup = true;  // the first item in each group
					return g;
				})
				.flatten()
				.value();
				//$scope.countries=dataset;

			}).error(function(data, status) {
				console.log(status);
			});
		}	  


	};



	$scope.search=function getDocs(){	
		$scope.docs=[];
		var searchField=$scope.selectedCountries
		console.log(searchField);
		studentsService.getSolrDocsResponse(searchField).success(function(data, status, headers) {
			console.log(data.response.docs.length);			
			$scope.docs = data.response.docs;	

		}).error(function(data, status) {
			console.log(status);
		});

	};

}]);
/*
mainApp.controller('searchController',['$scope','studentsService', function($scope,studentsService) {

}]);*/


