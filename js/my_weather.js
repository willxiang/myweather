var app = angular.module('myweather', []);
app.controller('listCtrl', function ($scope, $http) {
    // chrome.storage.sync.set({'items':"beijing"},function(){
    //     console.log("saved");
    // });

    var qiniu = 'http://7xnnc6.com1.z0.glb.clouddn.com/allchina.json';

    var citylist = [];

    if (!localStorage['citylist'] || localStorage['citylist'] === undefined) {
        $http({
            method: 'GET',
            url: qiniu
        }).then(function (response) {
            citylist = response.data.city_info;
            localStorage['citylist'] = angular.toJson(citylist);
        }, function (response) {
            console.log(response);
        });
    } else {
        citylist = angular.fromJson(localStorage['citylist']);
    }

    //加载天气数据
    function initWeatherData(url) {
        $http({
            method: 'GET',
            url: url
        }).then(function (response) {
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
        }, function (data) {
            console.log(data);
        });
    }

    var url = "https://api.heweather.com/x3/weather?cityid=CN101010200&key=6a7d5f6938da427fbb17219e1461e4e4";
    initWeatherData(url);
    $(".city_selected li").click(function () {
        var id = $(this).attr("id");
        var url = 'https://api.heweather.com/x3/weather?cityid=' + id + '&key=6a7d5f6938da427fbb17219e1461e4e4';
        initWeatherData(url);
    });
    var data = [{ province: "北京", citys: [{ id: "CN101010100", city: "北京市" }] }, { province: "天津", citys: [{ id: "CN101030100", city: "天津市" }] }, { province: "河北", citys: [{ id: "CN101090601", city: "廊坊市" }, { id: "CN101090501", city: "唐山市" }, { id: "CN101090701", city: "沧州市" }, { id: "CN101090301", city: "张家口市" }, { id: "CN101090101", city: "石家庄市" }, { id: "CN101091101", city: "秦皇岛市" }, { id: "CN101091001", city: "邯郸市" }, { id: "CN101090901", city: "邢台市" }, { id: "CN101090201", city: "保定市" }, { id: "CN101090402", city: "承德市" }, { id: "CN101090801", city: "衡水市" }] }, { province: "山西", citys: [{ id: "CN101100101", city: "太原市" }, { id: "CN101100201", city: "大同市" }, { id: "CN101100301", city: "阳泉市" }, { id: "CN101100501", city: "长治市" }, { id: "CN101100601", city: "晋城市" }, { id: "CN101100901", city: "朔州市" }, { id: "CN101100401", city: "晋中市" }, { id: "CN101100801", city: "运城市" }, { id: "CN101101001", city: "忻州市" }, { id: "CN101100701", city: "临汾市" }, { id: "CN101101100", city: "吕梁市" }] }, { province: "内蒙古", citys: [{ id: "CN101080101", city: "呼和浩特市" }, { id: "CN101080201", city: "包头市" }, { id: "CN101080301", city: "乌海市" }, { id: "CN101080601", city: "赤峰市" }, { id: "CN101080501", city: "通辽市" }, { id: "CN101080701", city: "鄂尔多斯市" }] }, { province: "辽宁", citys: [{ id: "CN101070101", city: "沈阳市" }, { id: "CN101070201", city: "大连市" }, { id: "CN101070301", city: "鞍山市" }, { id: "CN101070401", city: "抚顺市" }, { id: "CN101070501", city: "本溪市" }, { id: "CN101070601", city: "丹东市" }, { id: "CN101070701", city: "锦州市" }, { id: "CN101070801", city: "营口市" }, { id: "CN101070901", city: "阜新市" }, { id: "CN101071001", city: "辽阳市" }, { id: "CN101071301", city: "盘锦市" }, { id: "CN101071101", city: "铁岭市" }, { id: "CN101010300", city: "朝阳市" }, { id: "CN101071201", city: "朝阳市" }, { id: "CN101071401", city: "葫芦岛市" }] }, { province: "吉林", citys: [{ id: "CN101060101", city: "长春市" }, { id: "CN101060201", city: "吉林市" }, { id: "CN101060401", city: "四平市" }, { id: "CN101060701", city: "辽源市" }, { id: "CN101060501", city: "通化市" }, { id: "CN101060901", city: "白山市" }, { id: "CN101060801", city: "松原市" }, { id: "CN101060601", city: "白城市" }] }, { province: "黑龙江", citys: [{ id: "CN101050101", city: "哈尔滨市" }, { id: "CN101050201", city: "齐齐哈尔市" }, { id: "CN101051101", city: "鸡西市" }, { id: "CN101051201", city: "鹤岗市" }, { id: "CN101051301", city: "双鸭山市" }, { id: "CN101050901", city: "大庆市" }, { id: "CN101050801", city: "伊春市" }, { id: "CN101050401", city: "佳木斯市" }, { id: "CN101051002", city: "七台河市" }, { id: "CN101050301", city: "牡丹江市" }, { id: "CN101050601", city: "黑河市" }, { id: "CN101050501", city: "绥化市" }] }, { province: "上海", citys: [{ id: "CN101020100", city: "上海市" }] }, { province: "江苏", citys: [{ id: "CN101190101", city: "南京市" }, { id: "CN101190201", city: "无锡市" }, { id: "CN101190801", city: "徐州市" }, { id: "CN101191101", city: "常州市" }, { id: "CN101190401", city: "苏州市" }, { id: "CN101190501", city: "南通市" }, { id: "CN101191001", city: "连云港市" }, { id: "CN101190901", city: "淮安市" }, { id: "CN101190701", city: "盐城市" }, { id: "CN101190601", city: "扬州市" }, { id: "CN101190301", city: "镇江市" }, { id: "CN101191201", city: "泰州市" }, { id: "CN101191301", city: "宿迁市" }] }, { province: "浙江", citys: [{ id: "CN101210101", city: "杭州市" }, { id: "CN101210401", city: "宁波市" }, { id: "CN101210701", city: "温州市" }, { id: "CN101210301", city: "嘉兴市" }, { id: "CN101210201", city: "湖州市" }, { id: "CN101211001", city: "衢州市" }, { id: "CN101211101", city: "舟山市" }, { id: "CN101210601", city: "台州市" }, { id: "CN101210801", city: "丽水市" }, { id: "CN101210501", city: "绍兴市" }, { id: "CN101210901", city: "金华市" }] }, { province: "安徽", citys: [{ id: "CN101220101", city: "合肥市" }, { id: "CN101220301", city: "芜湖市" }, { id: "CN101220201", city: "蚌埠市" }, { id: "CN101220401", city: "淮南市" }, { id: "CN101220501", city: "马鞍山市" }, { id: "CN101221201", city: "淮北市" }, { id: "CN101221301", city: "铜陵市" }, { id: "CN101220601", city: "安庆市" }, { id: "CN101221001", city: "黄山市" }, { id: "CN101221101", city: "滁州市" }, { id: "CN101220801", city: "阜阳市" }, { id: "CN101220701", city: "宿州市" }, { id: "CN101220105", city: "巢湖市" }, { id: "CN101221501", city: "六安市" }, { id: "CN101220901", city: "亳州市" }, { id: "CN101221701", city: "池州市" }, { id: "CN101221401", city: "宣城市" }] }, { province: "福建", citys: [{ id: "CN101230101", city: "福州市" }, { id: "CN101230201", city: "厦门市" }, { id: "CN101230401", city: "莆田市" }, { id: "CN101230801", city: "三明市" }, { id: "CN101230501", city: "泉州市" }, { id: "CN101230601", city: "漳州市" }, { id: "CN101230901", city: "南平市" }, { id: "CN101230701", city: "龙岩市" }, { id: "CN101230301", city: "宁德市" }, { id: "CN101230111", city: "福清市" }, { id: "CN101230110", city: "长乐市" }] }, { province: "江西", citys: [{ id: "CN101240101", city: "南昌市" }, { id: "CN101240801", city: "景德镇市" }, { id: "CN101240901", city: "萍乡市" }, { id: "CN101240201", city: "九江市" }, { id: "CN101241001", city: "新余市" }, { id: "CN101241101", city: "鹰潭市" }, { id: "CN101240701", city: "赣州市" }, { id: "CN101240601", city: "吉安市" }, { id: "CN101240501", city: "宜春市" }, { id: "CN101240401", city: "抚州市" }, { id: "CN101240301", city: "上饶市" }] }, { province: "山东", citys: [{ id: "CN101120101", city: "济南市" }, { id: "CN101120201", city: "青岛市" }, { id: "CN101120301", city: "淄博市" }, { id: "CN101121401", city: "枣庄市" }, { id: "CN101121201", city: "东营市" }, { id: "CN101120501", city: "烟台市" }, { id: "CN101120601", city: "潍坊市" }, { id: "CN101120701", city: "济宁市" }, { id: "CN101120801", city: "泰安市" }, { id: "CN101121301", city: "威海市" }, { id: "CN101121501", city: "日照市" }, { id: "CN101121601", city: "莱芜市" }, { id: "CN101120901", city: "临沂市" }, { id: "CN101120401", city: "德州市" }, { id: "CN101121701", city: "聊城市" }, { id: "CN101121101", city: "滨州市" }, { id: "CN101121001", city: "菏泽市" }] }, { province: "河南", citys: [{ id: "CN101180101", city: "郑州市" }, { id: "CN101180801", city: "开封市" }, { id: "CN101180901", city: "洛阳市" }, { id: "CN101180501", city: "平顶山市" }, { id: "CN101180201", city: "安阳市" }, { id: "CN101181201", city: "鹤壁市" }, { id: "CN101180301", city: "新乡市" }, { id: "CN101181101", city: "焦作市" }, { id: "CN101181301", city: "濮阳市" }, { id: "CN101180401", city: "许昌市" }, { id: "CN101181501", city: "漯河市" }, { id: "CN101181701", city: "三门峡市" }, { id: "CN101180701", city: "南阳市" }, { id: "CN101181001", city: "商丘市" }, { id: "CN101180601", city: "信阳市" }, { id: "CN101181401", city: "周口市" }, { id: "CN101181601", city: "驻马店市" }] }, { province: "湖北", citys: [{ id: "CN101200101", city: "武汉市" }, { id: "CN101200601", city: "黄石市" }, { id: "CN101201101", city: "十堰市" }, { id: "CN101200901", city: "宜昌市" }, { id: "CN101200301", city: "鄂州市" }, { id: "CN101201401", city: "荆门市" }, { id: "CN101200401", city: "孝感市" }, { id: "CN101200801", city: "荆州市" }, { id: "CN101200501", city: "黄冈市" }, { id: "CN101200701", city: "咸宁市" }, { id: "CN101201301", city: "随州市" }] }, { province: "湖南", citys: [{ id: "CN101250101", city: "长沙市" }, { id: "CN101250301", city: "株洲市" }, { id: "CN101250201", city: "湘潭市" }, { id: "CN101250401", city: "衡阳市" }, { id: "CN101250901", city: "邵阳市" }, { id: "CN101251001", city: "岳阳市" }, { id: "CN101250601", city: "常德市" }, { id: "CN101251101", city: "张家界市" }, { id: "CN101250700", city: "益阳市" }, { id: "CN101250501", city: "郴州市" }, { id: "CN101251401", city: "永州市" }, { id: "CN101251201", city: "怀化市" }, { id: "CN101250801", city: "娄底市" }] }, { province: "广东", citys: [{ id: "CN101280101", city: "广州市" }, { id: "CN101280201", city: "韶关市" }, { id: "CN101280601", city: "深圳市" }, { id: "CN101280701", city: "珠海市" }, { id: "CN101280501", city: "汕头市" }, { id: "CN101280800", city: "佛山市" }, { id: "CN101281101", city: "江门市" }, { id: "CN101281001", city: "湛江市" }, { id: "CN101282001", city: "茂名市" }, { id: "CN101280901", city: "肇庆市" }, { id: "CN101280301", city: "惠州市" }, { id: "CN101280401", city: "梅州市" }, { id: "CN101282101", city: "汕尾市" }, { id: "CN101281201", city: "河源市" }, { id: "CN101281801", city: "阳江市" }, { id: "CN101281301", city: "清远市" }, { id: "CN101281601", city: "东莞市" }, { id: "CN101281701", city: "中山市" }, { id: "CN101281501", city: "潮州市" }, { id: "CN101281901", city: "揭阳市" }, { id: "CN101281401", city: "云浮市" }] }, { province: "广西", citys: [{ id: "CN101300101", city: "南宁市" }, { id: "CN101300301", city: "柳州市" }, { id: "CN101300501", city: "桂林市" }, { id: "CN101300601", city: "梧州市" }, { id: "CN101301301", city: "北海市" }, { id: "CN101301401", city: "防城港市" }, { id: "CN101301101", city: "钦州市" }, { id: "CN101300801", city: "贵港市" }, { id: "CN101300901", city: "玉林市" }, { id: "CN101301001", city: "百色市" }, { id: "CN101300701", city: "贺州市" }, { id: "CN101301201", city: "河池市" }, { id: "CN101300401", city: "来宾市" }, { id: "CN101300201", city: "崇左市" }] }, { province: "海南", citys: [{ id: "CN101310101", city: "海口市" }, { id: "CN101310201", city: "三亚市" }] }, { province: "重庆", citys: [{ id: "CN101040100", city: "重庆市" }] }, { province: "四川", citys: [{ id: "CN101270101", city: "成都市" }, { id: "CN101270301", city: "自贡市" }, { id: "CN101270201", city: "攀枝花市" }, { id: "CN101271001", city: "泸州市" }, { id: "CN101272001", city: "德阳市" }, { id: "CN101270401", city: "绵阳市" }, { id: "CN101272101", city: "广元市" }, { id: "CN101270701", city: "遂宁市" }, { id: "CN101271201", city: "内江市" }, { id: "CN101271401", city: "乐山市" }, { id: "CN101270501", city: "南充市" }, { id: "CN101271501", city: "眉山市" }, { id: "CN101271101", city: "宜宾市" }, { id: "CN101270801", city: "广安市" }, { id: "CN101270601", city: "达州市" }, { id: "CN101271701", city: "雅安市" }, { id: "CN101270901", city: "巴中市" }, { id: "CN101271301", city: "资阳市" }] }, { province: "贵州", citys: [{ id: "CN101260101", city: "贵阳市" }, { id: "CN101260201", city: "遵义市" }, { id: "CN101260301", city: "安顺市" }] }, { province: "云南", citys: [{ id: "CN101290101", city: "昆明市" }, { id: "CN101290401", city: "曲靖市" }, { id: "CN101290701", city: "玉溪市" }, { id: "CN101290501", city: "保山市" }, { id: "CN101291001", city: "昭通市" }, { id: "CN101291401", city: "丽江市" }, { id: "CN101291101", city: "临沧市" }] }, { province: "西藏", citys: [{ id: "CN101140101", city: "拉萨市" }] }, { province: "陕西", citys: [{ id: "CN101110101", city: "西安市" }, { id: "CN101111001", city: "铜川市" }, { id: "CN101110901", city: "宝鸡市" }, { id: "CN101110200", city: "咸阳市" }, { id: "CN101110501", city: "渭南市" }, { id: "CN101110300", city: "延安市" }, { id: "CN101110801", city: "汉中市" }, { id: "CN101110401", city: "榆林市" }, { id: "CN101110701", city: "安康市" }, { id: "CN101110601", city: "商洛市" }] }, { province: "甘肃", citys: [{ id: "CN101160101", city: "兰州市" }, { id: "CN101161401", city: "嘉峪关市" }, { id: "CN101160601", city: "金昌市" }, { id: "CN101161301", city: "白银市" }, { id: "CN101160901", city: "天水市" }, { id: "CN101160501", city: "武威市" }, { id: "CN101160701", city: "张掖市" }, { id: "CN101160301", city: "平凉市" }, { id: "CN101160801", city: "酒泉市" }, { id: "CN101160401", city: "庆阳市" }, { id: "CN101160201", city: "定西市" }] }, { province: "青海", citys: [{ id: "CN101150101", city: "西宁市" }] }, { province: "宁夏", citys: [{ id: "CN101170101", city: "银川市" }, { id: "CN101170201", city: "石嘴山市" }, { id: "CN101170301", city: "吴忠市" }, { id: "CN101170401", city: "固原市" }, { id: "CN101170501", city: "中卫市" }] }, { province: "新疆", citys: [{ id: "CN101130101", city: "乌鲁木齐市" }, { id: "CN101130201", city: "克拉玛依市" }, { id: "CN101130601", city: "库尔勒市" }] }];
    $scope.allcityinfo = data;
    console.log($scope.allcityinfo);
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