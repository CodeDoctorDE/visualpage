
function localize(file,errorCallback,successCallback,prefix) {
    if (prefix === undefined) {
        prefix = '#lang ';
    }
    $.ajax({
        url:file,
        type:'HEAD',
        error: function()
        {
            errorCallback();
        },
        success: function()
        {
            $.getJSON(file, function (data) {
                $(".lang").each(function () {
                    var currentData = data;
                    $.each(this.attributes, function () {
                        if (this.specified) {
                            if (this.value.startsWith(prefix)) {
                                this.value = this.value.slice(prefix.length);
                                this.value.split("/").forEach(function (index) {
                                    currentData = currentData[index];
                                });
                                this.value = currentData;
                            }
                        }
                    });
                    if ($(this).text().startsWith(prefix)) {
        
                        $(this).text($(this).text().slice(prefix.length));
                        $(this).text().split(" ").forEach(function (index) {
                            currentData = currentData[index];
                        });
                        $(this).text(currentData);
                    }
                });
            });
            successCallback();
        }
    });
}