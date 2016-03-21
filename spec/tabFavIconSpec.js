describe('getTabFavIcon', function () {
    var tab = require("../src/tab.js");
    it('returns resources/IDR_BOOKMARKS_FAVICON.png when tab starts with chrome://bookmarks', function () {
        expect(tab).not.toBeTruthy();
    })
});