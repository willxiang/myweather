var app = angular.module('myweather', []);
app.controller('listCtrl', function($scope, $http) {


    // chrome.storage.sync.set({'items':"beijing"},function(){
    //     console.log("saved");
    // });


    var qiniu = 'http://7xnnc6.com1.z0.glb.clouddn.com/allchina.json';

    var citylist = [];

    if (!localStorage['citylist'] || localStorage['citylist'] === undefined) {
        $http({
            method: 'GET',
            url: qiniu
        }).then(function(response) {
            citylist = response.data.city_info;
            localStorage['citylist'] = angular.toJson(citylist);
        }, function(response) {
            console.log(response);
        });
    } else {
        citylist = angular.fromJson(localStorage['citylist']);
    }

    console.log(extractProv(citylist));

    console.log(extractCity("湖南",citylist));

    var url = "https://api.heweather.com/x3/weather?cityid=CN101010200&key=6a7d5f6938da427fbb17219e1461e4e4";
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
        // console.log(weather);
    }, function(data) {
        console.log(data);
    });

    // filterCity(citylist);

    // $("#citylist").autocomplete({
    //         minLength: 1,
    //         source: citylist,
    //         //     focus: function(event, ui) {
    //         //         $("#citylist").val(ui.item.city);
    //         //         return false;
    //         //     },
    //         select: function(event, ui) {
    //             $("#citylist").val(ui.item.desc);
    //             $("#cityid").val(ui.item.id);
    //             localStorage['selectedCityId'] = ui.item.id;
    //             return false;
    //         }
    //     })
    //     .data("ui-autocomplete")._renderItem = function(ul, item) {
    //         return $("<li>")
    //             .append("<a>" + item.desc + " - " + item.id + "</a>")
    //             .appendTo(ul);
    //     };

});



