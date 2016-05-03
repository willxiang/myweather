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

    filterCity(citylist);

    $("#citylist").autocomplete({
            minLength: 1,
            source: citylist,
            //     focus: function(event, ui) {
            //         $("#citylist").val(ui.item.city);
            //         return false;
            //     },
            select: function(event, ui) {
                $("#citylist").val(ui.item.desc);
                $("#cityid").val(ui.item.id);
                return false;
            }
        })
        .data("ui-autocomplete")._renderItem = function(ul, item) {
            return $("<li>")
                .append("<a>" + item.desc + " - " + item.id + "</a>")
                .appendTo(ul);
        };
});


function filterCity(citylist) {
    for (var i = 0; i < citylist.length; i++) {
        // source.push(citylist[i].city + "-" + citylist[i].prov + "-"+citylist[i].id);
        citylist[i].value = citylist[i].city;
        citylist[i].label = citylist[i].city;
        citylist[i].desc = citylist[i].city + " - " + citylist[i].prov;
    }
}
