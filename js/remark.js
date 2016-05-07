//这段代码暂时别删。留作记录。
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