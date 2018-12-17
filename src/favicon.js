(function (global, chrome) {
    "use strict";

    const moduleName = "favicon";

    var favIconUrls = [
        { "name": "chrome://apps", "url": "resources/IDR_APPS_FAVICON.png"},
        { "name": "chrome://bookmarks", "url": "resources/IDR_BOOKMARKS_FAVICON.png"},
        { "name": "chrome://components", "url": "resources/IDR_COMPONENTS_FAVICON.png"},
        { "name": "chrome://crashes", "url": "resources/IDR_CRASHES_FAVICON.png"},
        { "name": "chrome://downloads", "url": "resources/IDR_DOWNLOADS_FAVICON.png"},
        { "name": "chrome://extensions", "url": "resources/IDR_EXTENSIONS_FAVICON.png"},
        { "name": "chrome://flags", "url": "resources/IDR_FLAGS_FAVICON.png"},
        { "name": "chrome://history", "url": "resources/IDR_HISTORY_FAVICON.png"},
        { "name": "chrome://settings", "url": "resources/IDR_SETTINGS_FAVICON.png"},
        { "name": "chrome://", "url": "resources/IDR_DEFAULT_FAVICON.png"},
        { "name": "file://", "url": "resources/IDR_DEFAULT_FAVICON.png"}
    ];

    /**
     * @param {{url: {string}, favIconUrl: {string}}} tab
     *
     * @returns {string}
     */
    var getFavIconUrl = function (tab) {
        var systemFavIconUrl = favIconUrls.find(function (favIcon) {
            return tab.url.indexOf(favIcon.name) === 0;
        });

        if (!!systemFavIconUrl) {
            return systemFavIconUrl.url;
        }

        if (!!tab.favIconUrl) {
            return tab.favIconUrl;
        }
        return "resources/chrome-32.png";
    };

    const exp = {
        "getUrl": getFavIconUrl
    };

    if (typeof module != "undefined") {
        module.exports = exp;
    } else {
        // pollute the global scope
        global[chrome.app.getDetails().short_name] = global[chrome.app.getDetails().short_name] || {};
        global[chrome.app.getDetails().short_name][moduleName] = exp;
    }
}(function () {
    return this;
}(), typeof chrome != "undefined" ? chrome : {}));