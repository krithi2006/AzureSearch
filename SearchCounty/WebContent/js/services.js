angular.module('studentModule', [])
.factory('studentsService', ['$http', function($http) {
	 var serviceObj = {};
	 serviceObj.getStudents= function() {
		return $http(
				{
					method:'GET',
					url:'http://localhost:6080/Angular/rest/students'
				});
			};
	
			serviceObj.addStudent = function(name,city) {
		return $http(
				{
					method:'POST',
					url:'http://localhost:6080/Angular/rest/students/add?name='+name+'&city='+city
				});
	};
	
	serviceObj.getSolrExactResponse = function(searchField) {

		return $http(
				{
					method:'GET',
						  url:'http://cob1023042.cob.apac.bosch.com:8983/solr/usgs_demo/select?df=feature_country_name&indent=on&q='+searchField+'*&wt=json'

				});
	};
	
	serviceObj.getSolrDocsResponse = function(searchField) {
		var field=(searchField!=null || searchField != undefined )? searchField :'';
		field=field.name.split(" ")[0];
		console.log(field);

		return $http(
				{
					method:'GET',
					url:'http://cob1023042.cob.apac.bosch.com:8983/solr/usgs_test/select?indent=on&q=collector:*'+field+'*&wt=json'

				});
	}; 
	return serviceObj;
}]);



/*.factory('addService', ['$http', function($http) {

	return{ addStudent : function(name,city) {
		return $http(
				{
					method:'POST',
					url:'http://localhost:6080/Angular/rest/students/add?name='+name+'&city='+city
				});
	}
	}

	   return {
	      events: function(username) { return doRequest(username, 'events'); },
	    };
}]);*/