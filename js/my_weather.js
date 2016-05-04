var app = angular.module('myweather', []);
app.controller('listCtrl', function($scope, $http) {


    // chrome.storage.sync.set({'items':"beijing"},function(){
    //     console.log("saved");
    // });


    var qiniu = 'http://7xnnc6.com1.z0.glb.clouddn.com/allchina.json';

    var citylist = [];

    if (!localStorage['citylist']) {
        $http({
            method: 'GET',
            url: qiniu
        }).then(function(response) {
            citylist = response.data.city_info;
            localStorage['citylist'] = angular.toJson($scope.items);
        }, function(response) {
            console.log(response);
        });
    } else {
        citylist = angular.fromJson(localStorage['citylist']);
    }

    var url = "https://api.heweather.com/x3/weather?cityid=CN101280101&key=6a7d5f6938da427fbb17219e1461e4e4";
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
        console.log(weather);
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


function filterCity(citylist) {
    for (var i = 0; i < citylist.length; i++) {
        // source.push(citylist[i].city + "-" + citylist[i].prov + "-"+citylist[i].id);
        citylist[i].value = citylist[i].city;
        citylist[i].label = citylist[i].city;
        citylist[i].desc = citylist[i].city + " - " + citylist[i].prov;
    }
}

function getDayOfWeek(dayValue) {
    var day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); // 将日期值格式化
    var today = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    return today[day.getDay()] //day.getDay(); 根据 Date 返一个星期中的某一天，其中 0 为星期日
}

function convertDate(weather) {
    for (var i = 0; i < weather.daily_forecast.length; i++) {
        weather.daily_forecast[i].weekday = getDayOfWeek(weather.daily_forecast[i].date);
    }
    return weather;
}

function getDate() {
    var date = new Date();
    var min = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
    return date.getHours() + ":" + min;
}