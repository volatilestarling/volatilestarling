angular.module('where-to.info', [])
  .controller('InfoController', ['$scope', 'Detail', function($scope, Detail) {
    
    $scope.info = Detail.info;
    console.log('scope info', $scope.info)
    //$scope.info = {
    //    "PASSPORT VALIDITY": "Six months from date of entry",
    //    "VACCINATIONS": "Yellow fever may be required if arriving from certain countries with yellow fever.",
    //    "BLANK PASSPORT PAGES": "One page required for entry stamp",
    //    "TOURIST VISA REQUIRED": "Not required for stays under 30 days",
    //    "CURRENCY RESTRICTIONS FOR ENTRY": "None",
    //    "CURRENCY RESTRICTIONS FOR EXIT": "None",
    //    "MORE INFO": "http://travel.state.gov/content/passports/en/country/thailand.html"
    //  }
  }]);
