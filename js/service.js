app.factory('httpService', function($http, $q) {

    var service = {};

    var _cityId = '';
    var weatherUrl = '';

    this.setCityId = function(cityid) {
        _cityId = cityid;
    }

    var makeUrl = function() {
        weatherUrl = "https://api.heweather.com/x3/weather?cityid=" + _cityId + "&key=6a7d5f6938da427fbb17219e1461e4e4";
    }

    service.getWeather = function() {
        makeUrl();
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: weatherUrl
        }).success(function(data) {
            defer.resolve(data);
        }).error(function(data) {
            defer.reject('There was an error');
        });
        return defer.promise;
    }


    return service;

});
