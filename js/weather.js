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
});