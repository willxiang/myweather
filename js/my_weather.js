var app = angular.module('myweather', []);
app.controller('listCtrl', function($scope, $http) {
    // $scope.items = [
    //     { "username": "willxiang1", "age": 21, "gender": "male" },
    //     { "username": "willxiang1", "age": 21, "gender": "male" },
    //     { "username": "willxiang1", "age": 21, "gender": "male" },
    //     { "username": "willxiang1", "age": 21, "gender": "male" },
    //     { "username": "willxiang1", "age": 21, "gender": "male" },
    //     { "username": "willxiang1", "age": 21, "gender": "male" },
    //     { "username": "willxiang1", "age": 21, "gender": "male" },
    //     { "username": "willxiang1", "age": 21, "gender": "male" },
    //     { "username": "willxiang1", "age": 21, "gender": "male" },
    //     { "username": "willxiang1", "age": 21, "gender": "male" }
    // ];

    // var data = $scope.items[0];

    // chrome.storage.sync.set({'items':"beijing"},function(){
    //     console.log("saved");
    // });


    var qiniu = 'http://7xnnc6.com1.z0.glb.clouddn.com/allchina.json';

    if (!$scope.items || $scope.items.length == 0) {
        $http({
            method: 'GET',
            url: qiniu
        }).then(function(response) {
            console.log(response.data.city_info); //把数据按照键值对处理后放到本地
            $scope.items = response.data.city_info;
        }, function(response) {
            console.log(response);
        });
    }




    // var url = "https://api.heweather.com/x3/weather?cityid=CN101010100&key=6a7d5f6938da427fbb17219e1461e4e4";
    // $http({
    //     method: 'GET',
    //     url: url
    // }).then(function(response) {
    //     var weather = response.data;
    //     console.log(weather['HeWeather data service 3.0'][0]);
    // }, function(data) {
    //     console.log(data);
    // });




});
