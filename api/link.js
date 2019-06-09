function ajaxLink(errorCallback,successCallback){
    $(".ajax-link").each(function(index,element){
        $(element).click(function(event){
            $.ajax({
                url: event.attr("href"),
                type: "POST",
                error: function()
                {
                    errorCallback();
                },
                success: function()
                {
                    successCallback();
                }
            });
            event.preventDefault();
            return false;
        });
    });
}