(function () {
    "use strict";

    describe("about", function () {
        var about = require("../src/about.js");

        describe("outputAppDetailsToConsole", function () {
            var console;

            beforeEach(function () {
                console = jasmine.createSpyObj("console", ["groupCollapsed", "groupEnd", "info"]);
            });

            afterEach(function () {
                console = null;
            });

            it("output application's name to console's collapsed group's title", function () {
                const appDetails = {
                    "name": "app name",
                    "description": "",
                    "version": "app version"
                };
                const chromeApplication = {
                    "isInstalled": true,
                    "getDetails": function () {
                        return appDetails;
                    }
                };

                about.outputAppDetailsToConsole(chromeApplication, console);

                expect(console.groupCollapsed).toHaveBeenCalledTimes(1);
                expect(console.groupCollapsed).toHaveBeenCalledWith("%s %s", appDetails.name, appDetails.version);
                expect(console.groupEnd).toHaveBeenCalledTimes(1);
            });

            it("output «fork me» message when app is installed", function () {
                const appDetails = {
                    "name": "",
                    "description": "app description",
                    "version": ""
                };
                const chromeApplication = {
                    "isInstalled": true,
                    "getDetails": function () {
                        return appDetails;
                    }
                };

                about.outputAppDetailsToConsole(chromeApplication, console);

                expect(console.info).toHaveBeenCalledWith("fork me at %o", "https://bitbucket.org/floverdevel/crx-tab-finder");
            });

            it("output «pull request» message when app is not installed", function () {
                const appDetails = {
                    "name": "",
                    "description": "app description",
                    "version": ""
                };
                const chromeApplication = {
                    "isInstalled": false,
                    "getDetails": function () {
                        return appDetails;
                    }
                };
                //console.warn = jasmine.createSpy("console.warn");

                about.outputAppDetailsToConsole(chromeApplication, console);

                expect(console.info).toHaveBeenCalledWith("loaded as an unpacked extension");
                expect(console.info).toHaveBeenCalledWith("send your pull request at %o", "https://bitbucket.org/floverdevel/crx-tab-finder");
            });
        });
    });
}());
