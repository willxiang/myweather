var app = angular.module('myweather', []);
app.controller('listCtrl', function($scope, $http, httpService) {

    //加载天气数据
    function getWeather(url) {
        $http({
            method: 'GET',
            url: url
        }).then(function(response) {
            var weather = response.data['HeWeather data service 3.0'][0];

            //去掉第一天
            weather.daily_forecast.shift();

            //留下前三天
            var threedays = [];
            for (var i = 0; i < 3; i++) {
                threedays.push(weather.daily_forecast[i]);
            }
            weather.daily_forecast = threedays;

            //处理星期几
            weather = convertDate(weather);
            weather.nowtime = getDate();
            $scope.weather = weather;
        }, function(data) {
            console.log(data);
        });
    }


    if (!localStorage['citylist'] || localStorage['citylist'] === undefined) {
        $http({
            method: 'GET',
            url: 'http://7xnnc6.com1.z0.glb.clouddn.com/citys1.json'
        }).then(function(response) {
            $scope.allcityinfo = response.data;
            localStorage['citylist'] = angular.toJson(response.data);
        }, function(data) {
            console.log(data);
        });
    } else {
        $scope.allcityinfo = angular.fromJson(localStorage['citylist']);
    }

    //判断是否有添加默认显示的城市，如果没有，则显示北京
    //所选择的城市可以是多个，然后可切换，所以这里用一个 selectedCitys 数组表示，这个数组存在本地浏览器中。
    $scope.selectedCitys = [];
    if (!localStorage['selectedCitys'] || localStorage['selectedCitys'] === undefined) {
        $scope.selectedCitys.push({
            id: 'CN101010100',
            city: '北京'
        }, {
            id: 'CN101280101',
            city: '广州'
        }, {
            id: 'CN101250401',
            city: '衡阳'
        }, {
            id: 'CN101250601',
            city: '常德'
        });
        localStorage['selectedCitys'] = angular.toJson($scope.selectedCitys);
    } else {
        $scope.selectedCitys = angular.fromJson(localStorage['selectedCitys']);
    }

    //默认取第一个城市
    getWeather(weatherUrl($scope.selectedCitys[0].id));


    //切换城市
    $scope.switchCity = function(item) {
        var list = $scope.selectedCitys;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == item.id) {
                list.splice(i, 1);
                break;
            }
        }
        list.unshift(item);
        $scope.selectedCitys = list;
        localStorage['selectedCitys'] = angular.toJson(list);
        getWeather(weatherUrl(item.id));
    }


});
