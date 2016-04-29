(function () {
    "use strict";

    describe("tab.getFavIcon", function () {
        var tab = require("../src/tab.js");

        it("returns resources/IDR_BOOKMARKS_FAVICON.png when tab url is chrome://bookmarks", function () {
            var favIcon = tab.getFavIcon({
                "url": "chrome://bookmarks"
            });
            expect(favIcon).toBe("resources/IDR_BOOKMARKS_FAVICON.png");
        });

        it("returns resources/IDR_HISTORY_FAVICON.png when tab url is chrome://history", function () {
            var favIcon = tab.getFavIcon({
                "url": "chrome://history"
            });
            expect(favIcon).toBe("resources/IDR_HISTORY_FAVICON.png");
        });

        it("returns resources/IDR_EXTENSIONS_FAVICON.png when tab url starts with chrome://", function () {
            var favIcon = tab.getFavIcon({
                "url": "chrome://"
            });
            expect(favIcon).toBe("resources/IDR_EXTENSIONS_FAVICON.png");
        });

        it("returns resources/file.png when tab url starts with file://", function () {
            var favIcon = tab.getFavIcon({
                "url": "file://"
            });
            expect(favIcon).toBe("resources/file.png");
        });

        it("returns resources/chrome-32.png when tab url starts with file://", function () {
            var favIcon = tab.getFavIcon({
                "url": "idk://",
                "favIconUrl": ""
            });
            expect(favIcon).toBe("resources/chrome-32.png");
        });

        it("returns tab's favIconUrl when tab have a favIconUrl", function () {
            var favIcon = tab.getFavIcon({
                "url": "iddqd://",
                "favIconUrl": "idkfa"
            });
            expect(favIcon).toBe("idkfa");
        });
    });
}());
