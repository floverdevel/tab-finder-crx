(function (global, chrome) {
    "use strict";

    var appDetails = chrome.app.getDetails();
    var appName = appDetails.short_name;
    var getTabFavIcon = global[appName].tab.getFavIcon;
    var outputAppDetailsToConsole = global[appName].about.outputAppDetailsToConsole;

    outputAppDetailsToConsole(chrome.app, global.console);

    chrome.tabs.query({}, function (tabs) {
        var currentSelectedDisplayedTab = -1;
        var isShiftKeyIsPressed = false;
        var KEY_ENTER = 13;
        var KEY_SHIFT = 16;
        var KEY_ESC = 27;
        var KEY_UP = 38;
        var KEY_DOWN = 40;

        for (var i = 0; i < tabs.length; i += 1) {
            global.document.body.getElementsByTagName("ul")[0].appendChild(createListItemFromTab(tabs[i]));
        }
        global.document.body.getElementsByTagName("ul")[0].appendChild(createOmniboxListItem());
        global.document.body.appendChild(createAboutApplicationListItem(appDetails));

        var searchInput = global.document.getElementById("searchInput");
        searchInput.addEventListener("keyup", function (event) {
            isShiftKeyIsPressed = !!event.shiftKey;
            switch (event.which) {
                case KEY_SHIFT: {
                    highlightInCreateTabElement(this.value);
                    break;
                }
            }
        });

        searchInput.addEventListener("keydown", function (event) {
            var displayedTabs = global.document.getElementsByClassName("visible");
            isShiftKeyIsPressed = !!event.shiftKey;
            switch (event.which) {
                case KEY_ENTER : {
                    if (currentSelectedDisplayedTab !== -1) {
                        displayedTabs[currentSelectedDisplayedTab].click();
                    }
                    break;
                }
                case KEY_DOWN : {
                    currentSelectedDisplayedTab += 1;
                    break;
                }
                case KEY_UP : {
                    currentSelectedDisplayedTab -= 1;
                    break;
                }
                case KEY_SHIFT: {
                    highlightInCreateTabElement(this.value);
                    break;
                }
                case KEY_ESC: {
                    window.close();
                    break;
                }
            }

            if (currentSelectedDisplayedTab >= displayedTabs.length) {
                currentSelectedDisplayedTab = 0;
            }

            if (currentSelectedDisplayedTab < 0) {
                currentSelectedDisplayedTab = displayedTabs.length - 1;
            }
            selectTab(displayedTabs[currentSelectedDisplayedTab]);
        });

        searchInput.addEventListener("input", function (event) {
            var displayedTabs = global.document.getElementsByClassName("tab");
            for (var i = 0; i < displayedTabs.length; i += 1) {
                var displayedTab = displayedTabs[i];
                if (this.value == "") {
                    displayedTab.classList.add("visible");
                    displayedTab.getElementsByTagName("a")[0].innerHTML = displayedTab.getElementsByTagName("a")[0].textContent;
                    displayedTab.getElementsByTagName("em")[0].innerHTML = displayedTab.getElementsByTagName("em")[0].textContent;
                } else {
                    var textPosition = displayedTab.textContent.toLowerCase().indexOf(this.value.toLowerCase());
                    if (textPosition != -1) {
                        displayedTab.classList.add("visible");
                    } else {
                        displayedTab.classList.remove("visible");
                    }
                    highlightTextInElement(this.value, displayedTab.getElementsByTagName("a")[0]);
                    highlightTextInElement(this.value, displayedTab.getElementsByTagName("em")[0]);
                }
            }

            highlightInCreateTabElement(this.value);
        });

        function highlightTextInElement(text, element) {
            var textPosition = element.textContent.toLowerCase().indexOf(text.toLowerCase());
            if (textPosition != -1) {
                element.innerHTML = element.textContent.substr(0, textPosition) +
                    "<span class=\"highlight\">" +
                    element.textContent.substr(textPosition, text.length) +
                    "</span>" +
                    element.textContent.substr(textPosition + text.length);
            } else {
                element.innerHTML = element.textContent
            }

        }

        function highlightInCreateTabElement(text) {
            var createNewTab = global.document.getElementById("create_new_tab");
            createNewTab.title = text;
            if (text.length) {
                createNewTab.innerHTML = "\"<strong>" + text + "</strong>\"" + " " + getNewTabLabel();
            } else {
                createNewTab.innerText = getNewTabLabel();
            }
            createNewTab.setAttribute("search-text", text);

        }

        function unselectAllTabs() {
            var displayedTabs = global.document.getElementsByTagName("li");
            for (var i = 0; i < displayedTabs.length; i += 1) {
                var displayedTab = displayedTabs[i];
                displayedTab.classList.remove("selected");
            }
        }

        function selectTab(tab) {
            unselectAllTabs();
            tab.classList.add("selected");
        }

        function createListItemFromTab(tab) {
            var li = global.document.createElement("li");
            li.classList.add("visible");
            li.classList.add("tab");
            li.title = tab.title + "\n--------\n" + tab.url;
            li.setAttribute("data-tab-window-id", tab.windowId);
            li.setAttribute("data-tab-id", tab.id);
            li.addEventListener("click", function () {
                var tabWindowId = parseInt(this.attributes["data-tab-window-id"].value);
                var tabId = parseInt(this.attributes["data-tab-id"].value);

                chrome.tabs.update(tabId, {
                    "active": true
                }, function () {
                    chrome.windows.update(tabWindowId, {
                        "focused": true
                    });
                });
            });
            li.addEventListener("mousedown", function (event) {
                switch (event.button) {
                    case 1 : {
                        closeTab(this);
                        break;
                    }
                }
            });
            li.addEventListener("mouseover", function () {
                // todo adjust currentSelectedDisplayedTab value
                selectTab(this);
            });

            li.appendChild(createCloseButtonFromTab(tab));
            li.appendChild(createIncognitoIconFromTab(tab));
            li.appendChild(createAudibleIconFromTab(tab));
            li.appendChild(createMutedIconFromTab(tab));
            li.appendChild(createPinnedIconFromTab(tab));

            li.appendChild(createFavIconFromTab(tab));
            li.appendChild(createHyperLinkFromTab(tab));
            li.appendChild(global.document.createElement("br"));
            li.appendChild(createUrlFromTab(tab));

            return li;

            function closeTab(tab) {
                var tabId = parseInt(tab.attributes["data-tab-id"].value);
                chrome.tabs.remove(tabId, function () {
                    tab.classList.add("hidden");
                    tab.classList.remove("tab");
                    tab.remove();
                });

            }

            function createCloseButtonFromTab(tab) {
                var element = global.document.createElement("img");
                element.title = "Close this tab";
                element.classList.add("close");
                element.classList.add("right");
                element.classList.add("enabled");

                element.addEventListener("click", function (event) {
                    event.cancelBubble = true;
                    event.preventDefault();
                    closeTab(event.target.parentElement);
                });

                return element;
            }

            function createAudibleIconFromTab(tab) {
                var element = global.document.createElement("img");
                element.classList.add("audible");
                element.classList.add("small");
                element.classList.add("right");
                if (!tab.audible) {
                    element.classList.add("disabled");
                }

                return element;
            }

            function createMutedIconFromTab(tab) {
                var element = global.document.createElement("img");
                element.classList.add("muted");
                element.classList.add("small");
                element.classList.add("right");
                if (!tab.mutedInfo || !tab.mutedInfo.muted) {
                    element.classList.add("disabled");
                }

                return element;
            }

            function createIncognitoIconFromTab(tab) {
                var element = global.document.createElement("img");
                element.classList.add("incognito");
                element.classList.add("small");
                element.classList.add("right");
                if (!tab.incognito) {
                    element.classList.add("disabled");
                }

                return element;
            }

            function createPinnedIconFromTab(tab) {
                var element = global.document.createElement("img");
                element.classList.add("pinned");
                element.classList.add("small");
                element.classList.add("right");
                if (!tab.pinned) {
                    element.classList.add("disabled");
                }

                return element;
            }

            function createFavIconFromTab(tab) {
                var element = global.document.createElement("img");
                element.classList.add("small");
                element.onerror = function () {
                    this.src = getPlatformFavIcon();
                };

                element.src = getTabFavIcon(tab);

                return element;
            }

            function getPlatformFavIcon () {
                // chrome://theme/current-channel-logo@1x
                return "resources/chrome-32.png";
            }

            function createHyperLinkFromTab(tab) {
                var element = global.document.createElement("a");
                element.textContent = tab.title;
                element.href = tab.url;
                element.onclick = function (event) {
                    event.preventDefault();
                };

                return element;
            }

            function createUrlFromTab(tab) {
                var element = global.document.createElement("em");
                element.textContent = tab.url;

                return element;
            }
        }

        function createOmniboxListItem() {
            var li = global.document.createElement("li");
            li.classList.add("visible");
            li.id = "create_new_tab";
            li.innerText = getNewTabLabel();
            li.setAttribute("search-text", "");
            li.addEventListener("click", openNewTab);
            li.addEventListener("mouseover", function () {
                selectTab(this);
            });
            return li;

            function openNewTab() {
                var searchText = !!this.attributes["search-text"].value ? this.attributes["search-text"].value : "chrome://newtab";
                if (isLookingLikeAnUri(searchText)) {
                    if (searchText.indexOf("://") === -1) {
                        searchText = "http://" + searchText;
                    }
                } else {
                    searchText = "https://www.google.com/search?q=" + this.attributes["search-text"].value
                }
                var tabCreationOptions = {};
                if (!!searchText) {
                    tabCreationOptions.url = searchText;
                }

                if (isShiftKeyIsPressed) {
                    tabCreationOptions.focused = true;
                    chrome.windows.create(tabCreationOptions);
                } else {
                    chrome.tabs.create(tabCreationOptions);
                }
            }

            function isLookingLikeAnUri(text) {
                if (typeof text !== "string") {
                    return false;
                }

                if (!text.length) {
                    return false;
                }

                var parsedUrl = text.split("://");
                if (parsedUrl.length == 2) {
                    return true;
                }

                parsedUrl = text.split(".");
                if (parsedUrl.length > 1) {
                    var nonWordRegEx = new RegExp("^\w");
                    return parsedUrl.every(function (currentValue, index, completeArray) {
                        return !nonWordRegEx.test(currentValue);
                    });
                }

                return false;
            }
        }

        function createAboutApplicationListItem(appDetails) {
            var about = global.document.createElement("div");
            var name = global.document.createElement("p");
            var version = global.document.createElement("em");
            var logo = global.document.createElement("img");

            logo.classList.add("right");
            logo.classList.add("logo-32");

            about.classList.add("about");

            name.innerText = appDetails.name;
            version.innerText = appDetails.version;

            about.appendChild(logo);
            about.appendChild(name);
            about.appendChild(version);


            return about;
        }

        function getNewTabLabel() {
            return isShiftKeyIsPressed ? "(new window)" : "(new tab)";
        }
    });
})(window, chrome);