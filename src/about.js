(function (global, chrome) {
    "use strict";

    const moduleName = "about";

    /**
     * @param {object} chromeApplication
     * @param {object} console
     */
    var outputAppDetailsToConsole = function (chromeApplication, console) {
        const appDetails = chromeApplication.getManifest();

        console.groupCollapsed("%s %s", appDetails.name, appDetails.version);
        if (chromeApplication.isInstalled) {
            console.info("fork me at %o", "https://github.com/floverdevel/tab-finder-crx");
        } else {
            console.info("loaded as an unpacked extension");
            console.info("send your pull request at %o", "https://github.com/floverdevel/tab-finder-crx");
        }
        console.groupEnd();
    };

    const exp = {
        "outputAppDetailsToConsole": outputAppDetailsToConsole
    };

    if (typeof module != "undefined") {
        module.exports = exp;
    } else {
        // pollute the global scope
        global[chrome.runtime.getManifest().short_name] = global[chrome.runtime.getManifest().short_name] || {};
        global[chrome.runtime.getManifest().short_name][moduleName] = exp;
    }
}(function () {
    return this;
}(), typeof chrome != "undefined" ? chrome : {}));