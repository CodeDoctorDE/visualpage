function localize(file,errorCallback,successCallback) {
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
                            if (this.value.startsWith("#lang ")) {
                                this.value = this.value.slice(6);
                                this.value.split("/").forEach(function (index) {
                                    currentData = currentData[index];
                                });
                                this.value = currentData;
                            }
                        }
                    });
                    if ($(this).text().startsWith("#lang ")) {
        
                        $(this).text($(this).text().slice(6));
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
function localize(prefix,file,errorCallback,successCallback) {
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