(function () {
    "use strict";

    describe("tab.getUrl", function () {
        const favicon = require("../src/favicon.js");

        it("returns resources/IDR_APPS_FAVICON.png when tab url is chrome://apps", function () {
            const favIcon = favicon.getUrl({
                "url": "chrome://apps"
            });
            expect(favIcon).toBe("resources/IDR_APPS_FAVICON.png");
        });

        it("returns resources/IDR_BOOKMARKS_FAVICON.png when tab url is chrome://bookmarks", function () {
            const favIcon = favicon.getUrl({
                "url": "chrome://bookmarks"
            });
            expect(favIcon).toBe("resources/IDR_BOOKMARKS_FAVICON.png");
        });

        it("returns resources/IDR_COMPONENTS_FAVICON.png when tab url is chrome://components", function () {
            const favIcon = favicon.getUrl({
                "url": "chrome://components"
            });
            expect(favIcon).toBe("resources/IDR_COMPONENTS_FAVICON.png");
        });

        it("returns resources/IDR_CRASHES_FAVICON.png when tab url is chrome://crashes", function () {
            const favIcon = favicon.getUrl({
                "url": "chrome://crashes"
            });
            expect(favIcon).toBe("resources/IDR_CRASHES_FAVICON.png");
        });

        it("returns resources/IDR_DOWNLOADS_FAVICON.png when tab url is chrome://downloads", function () {
            const favIcon = favicon.getUrl({
                "url": "chrome://downloads"
            });
            expect(favIcon).toBe("resources/IDR_DOWNLOADS_FAVICON.png");
        });

        it("returns resources/IDR_EXTENSIONS_FAVICON.png when tab url is chrome://extensions", function () {
            const favIcon = favicon.getUrl({
                "url": "chrome://extensions"
            });
            expect(favIcon).toBe("resources/IDR_EXTENSIONS_FAVICON.png");
        });

        it("returns resources/IDR_FLAGS_FAVICON.png when tab url is chrome://flags", function () {
            const favIcon = favicon.getUrl({
                "url": "chrome://flags"
            });
            expect(favIcon).toBe("resources/IDR_FLAGS_FAVICON.png");
        });

        it("returns resources/IDR_HISTORY_FAVICON.png when tab url is chrome://history", function () {
            const favIcon = favicon.getUrl({
                "url": "chrome://history"
            });
            expect(favIcon).toBe("resources/IDR_HISTORY_FAVICON.png");
        });

        it("returns resources/IDR_SETTINGS_FAVICON.png when tab url is chrome://settings", function () {
            const favIcon = favicon.getUrl({
                "url": "chrome://settings"
            });
            expect(favIcon).toBe("resources/IDR_SETTINGS_FAVICON.png");
        });

        it("returns resources/IDR_DEFAULT_FAVICON.png when tab url starts with chrome://", function () {
            const favIcon = favicon.getUrl({
                "url": "chrome://"
            });
            expect(favIcon).toBe("resources/IDR_DEFAULT_FAVICON.png");
        });

        it("returns resources/IDR_DEFAULT_FAVICON.png when tab url starts with file://", function () {
            const favIcon = favicon.getUrl({
                "url": "file://"
            });
            expect(favIcon).toBe("resources/IDR_DEFAULT_FAVICON.png");
        });

        it("returns tab's favIconUrl when tab have a favIconUrl", function () {
            const favIcon = favicon.getUrl({
                "url": "iddqd://",
                "favIconUrl": "idkfa"
            });
            expect(favIcon).toBe("idkfa");
        });

        it("returns resources/chrome-32.png when tab favIconUrl is empty", function () {
            const favIcon = favicon.getUrl({
                "url": "idk://",
                "favIconUrl": ""
            });
            expect(favIcon).toBe("resources/chrome-32.png");
        });
    });
}());
