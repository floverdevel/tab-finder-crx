(function (global, chrome) {
    "use strict";

    var favIconUrls = [
        { "name": "chrome://bookmarks", "url": "resources/IDR_BOOKMARKS_FAVICON.png"},
        { "name": "chrome://history", "url": "resources/IDR_HISTORY_FAVICON.png"},
        { "name": "chrome://", "url": "resources/IDR_EXTENSIONS_FAVICON.png"},
        { "name": "file://", "url": "resources/file.png"}
    ];

    /**
     * @param {{url: {string}, favIconUrl: {string}}} tab
     *
     * @returns {string}
     */
    var getFavIcon = function (tab) {
        var systemFavIconUrl = favIconUrls.find(function (favIcon) {
            return tab.url.indexOf(favIcon.name) == 0;
        });

        if (!!systemFavIconUrl) {
            return systemFavIconUrl.url;
        }

        if (!!tab.favIconUrl) {
            return tab.favIconUrl;
        }
        return "resources/chrome-32.png";
    };

    if (typeof module != "undefined") {
        module.exports = {
            getFavIcon: getFavIcon
        };
    } else {
        // pollute the global scope
        global[chrome.app.getDetails().short_name] = {
            "tab": {
                "getFavIcon": getFavIcon
            }
        };
    }
}(function () {
    return this;
}(), typeof chrome != "undefined" ? chrome : {}));