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

    citylist = [{ 'city': '南子岛', 'cnty': '中国', 'id': 'CN101310230', 'lat': '11.26', 'lon': '114.20', 'prov': '海南', 'desc': '南子岛 - 海南' }, { 'city': '北京', 'cnty': '中国', 'id': 'CN101010100', 'lat': '39.904000', 'lon': '116.391000', 'prov': '直辖市', 'desc': '北京 - 直辖市' }, { 'city': '海淀', 'cnty': '中国', 'id': 'CN101010200', 'lat': '39.590000', 'lon': '116.170000', 'prov': '直辖市', 'desc': '海淀 - 直辖市' }, { 'city': '朝阳', 'cnty': '中国', 'id': 'CN101010300', 'lat': '39.570000', 'lon': '116.290000', 'prov': '直辖市', 'desc': '朝阳 - 直辖市' }, { 'city': '顺义', 'cnty': '中国', 'id': 'CN101010400', 'lat': '40.147000', 'lon': '116.716000', 'prov': '直辖市', 'desc': '顺义 - 直辖市' }, { 'city': '怀柔', 'cnty': '中国', 'id': 'CN101010500', 'lat': '40.643000', 'lon': '116.581000', 'prov': '直辖市', 'desc': '怀柔 - 直辖市' }, { 'city': '通州', 'cnty': '中国', 'id': 'CN101010600', 'lat': '39.550000', 'lon': '116.380000', 'prov': '直辖市', 'desc': '通州 - 直辖市' }, { 'city': '昌平', 'cnty': '中国', 'id': 'CN101010700', 'lat': '40.206000', 'lon': '116.165000', 'prov': '直辖市', 'desc': '昌平 - 直辖市' }, { 'city': '延庆', 'cnty': '中国', 'id': 'CN101010800', 'lat': '40.525000', 'lon': '116.148000', 'prov': '直辖市', 'desc': '延庆 - 直辖市' }, { 'city': '丰台', 'cnty': '中国', 'id': 'CN101010900', 'lat': '39.859000', 'lon': '116.286000', 'prov': '直辖市', 'desc': '丰台 - 直辖市' }, { 'city': '石景山', 'cnty': '中国', 'id': 'CN101011000', 'lat': '39.560000', 'lon': '116.110000', 'prov': '直辖市', 'desc': '石景山 - 直辖市' }];

    console.log(citylist);

    // filterCity(citylist);
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


    $("#autocomplete").autocomplete({
        minLength: 1,
        source: citylist,
        focus: function(event, ui) {
            $("#autocomplete").val(ui.item.city);
            return false;
        },
        select: function(event, ui) {
            $("#autocomplete").val(ui.item.desc);
            $("#cityid").val(ui.item.id);
            console.log(ui.item.desc + "," + ui.item.id);
            // $("#description").html(ui.item.desc);
            return false;
        }
    }).data("ui-autocomplete")._renderItem = function(ul, item) {
        return $("<li>")
            .append("<a>" + item.desc + "</a>")
            .appendTo(ul);
    };;

});


function filterCity(citylist) {
    for (var i = 0; i < citylist.length; i++) {
        citylist[i].desc = citylist[i].city + " - " + citylist[i].prov;
    }
    console.log(angular.toJson(citylist));
}
