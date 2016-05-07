function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

function weatherUrl(cityid) {
    return "https://api.heweather.com/x3/weather?cityid=" + cityid + "&key=6a7d5f6938da427fbb17219e1461e4e4";
}
