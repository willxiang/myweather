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


function extractProv(citylist) {
    var prov = [];
    for (var i = 0; i < citylist.length; i++) {
        if (!isExistInArray(prov, citylist[i].prov)) {
            prov.push(citylist[i].prov);
        }
    }
    return prov;
}

function extractCity(prov, citylist) {
    var city = [];
    for (var i = 0; i < citylist.length; i++) {
        if (!isExistInArray(citylist, citylist[i].city) && citylist[i].prov === prov) {
            city.push(citylist[i]);
        }
    }
    return city;
}

function isExistInArray(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}