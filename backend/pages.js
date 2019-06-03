var url = "https://de.wikipedia.org";
var category = "Kategorie:";
var blackList = ["Vorlage:"];
function summary(page, callback) {
    wikiURL = url + '/w/api.php?' + $.param({
        'action': 'query',
        'titles': page,
        'prop': 'extracts',
        'format': 'json',
        "exintro": "",
        "explaintext": ""
    });
    $.ajax({
        url: wikiURL,
        dataType: 'jsonp',
        success: function (data) {
            for (var a in data.query.pages) {
                var subStr = data.query.pages[a].extract.split('\n');
                var summary = "";
                for(var string in subStr){
                    var allow = true;
                    for(var a in blackList){
                        if(string.includes(a)){
                            allow = false;
                        }
                    }
                    if(allow){
                        summary+=subStr;
                    }
                }
                callback(summary);
            }
        }
    });
}
function categories(page, callback) {
    wikiURL = url + '/w/api.php?' + $.param({
        'action': 'parse',
        'page': page,
        'format': 'json'
    });
    $.ajax({
        async: false,
        url: wikiURL,
        dataType: 'jsonp',
        async: false,
        success: function (data) {
            for (var a in data.parse.categories) {
                if (!data.parse.categories[a]["*"].startsWith("Wikipedia:") && data.parse.categories[a]["*"] != page) {
                    callback(data.parse.categories[a]["*"].replace(/_/g, " "));
                }
            }
        }
    });
}
function articleLinks(page, callback) {
    wikiURL = url + '/w/api.php?' + $.param({
        'action': 'parse',
        'page': page,
        'format': 'json'
    });
    $.ajax({
        async: false,
        url: wikiURL,
        dataType: 'jsonp',
        async: false,
        success: function (data) {
            for (var a in data.parse.links) {
                if (!data.parse.links[a]["*"].startsWith("Wikipedia:") && data.parse.links[a]["*"] != page) {
                    callback(data.parse.links[a]["*"].replace(/_/g, " "));
                }
            }
        }
    });
}
function articleLink(page, callback) {
    callback(url + "/wiki/" + page);
}
function categoryLink(page, callback) {
    callback(url + "/wiki/" + category + page);
}
function isArticle(page, yesCallback, noCallback) {
    wikiURL = url + '/w/api.php?' + $.param({
        'action': 'parse',
        'page': page,
        'format': 'json'
    });
    $.ajax({
        async: false,
        url: wikiURL,
        dataType: 'jsonp',
        async: false,
        success: function (data) {
            if ("error" in data) {
                noCallback();
            } else {
                yesCallback();
            }
        }
    });
}
function isCategory(page, yesCallback, noCallback) {
    wikiURL = url + '/w/api.php?' + $.param({
        'action': 'query',
        'titles': category + page,
        'format': 'json'
    });
    $.ajax({
        async: false,
        url: wikiURL,
        dataType: 'jsonp',
        async: false,
        success: function (data) {
            if ("-1" in data.query.pages) {
                noCallback();
            } else {
                yesCallback();
            }
        }
    });
}
function inCategory(page, callback) {
    wikiURL = url + '/w/api.php?' + $.param({
        'action': "query",
        'list': "categorymembers",
        'cmtitle': "Category:" + page,
        'format': 'json'
    });
    $.ajax({
        async: false,
        url: wikiURL,
        dataType: 'jsonp',
        async: false,
        success: function (data) {
            for (var a in data.query.categorymembers) {
                var member = data.query.categorymembers[a].title;
                if (member.startsWith(category)) {
                    callback(member, true);
                } else {
                    callback(member, false);
                }
            }
            callback()
        }
    });
}
function images(page, callback) {
    var index = 0;
    wikiURL = url + '/w/api.php?' + $.param({
        'action': 'parse',
        'page': page,
        'format': 'json'
    });
    $.ajax({
        async: false,
        url: wikiURL,
        dataType: 'jsonp',
        async: false,
        success: function (data) {
            for (var a in data.parse.images) {
                wikiURL = url + '/w/api.php?' + $.param({
                    'action': 'query',
                    'titles': "Image:" + data.parse.images[a],
                    'prop': 'imageinfo',
                    'iiprop': 'url',
                    'format': 'json'
                });
                $.ajax({
                    async: false,
                    url: wikiURL,
                    dataType: 'jsonp',
                    async: false,
                    success: function (data) {
                        if ("-1" in data.query.pages)
                            if ("imageinfo" in data.query.pages["-1"])
                                for (var a in data.query.pages["-1"].imageinfo){
                                    callback(data.query.pages["-1"].imageinfo[a].url, index);
                                    index++;
                                }
                    }
                });
            }
        }
    });
}
