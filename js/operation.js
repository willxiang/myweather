$(function () {
        $(".loading_mask").hide();
        $(".current_city").click(function () {
            $(".city_mask").show();
        });
        $(".city_close").click(function () {
            $(".city_mask").fadeOut(100);
        });
        $("#tab1 li").click(function () {
            $(this).addClass("active").siblings("li").removeClass("active");
            var id = $(this).children("a").attr("href").split("#")[1];
            $("#" + id).addClass("active").siblings().removeClass("active");
        });
        $("#province a").click(function (e) {
            if ($(this).hasClass("hover")) return false;
            $("#province a,#city a").removeClass("hover");
            $(this).addClass("hover");
            var tabli = $("#tab1 li[class='active']");
            tabli.children("a").text($(this).text());
            tabli.siblings().children("a").text("选择城市");
        });
        $("#city a").click(function () {
            if ($(this).hasClass("hover")) return false;
            $("#city a").removeClass("hover");
            $(this).addClass("hover");
            $("#tab1 li[class='active']").children("a").text($(this).text());
        });
});