/**
 * Created by eantaya on 2015-08-21.
 */
(function (global, chrome) {
    'use strict';

    var appDetails = chrome.app.getDetails();
    console.group('About ' + appDetails.name);
    if (!chrome.app.isInstalled) {
        console.warn('loaded as an unpacked extension');
        console.warn('developer mode');
        console.warn('extension is not installed');
    }
    console.info('description %o', appDetails.description);
    console.info('version %o', appDetails.version);
    console.info('fork me at %o', 'https://bitbucket.org/floverdevel/crx-tab-finder');
    console.groupEnd();

    chrome.tabs.query({}, function (tabs) {
        console.table(tabs);

        var currentSelectedDisplayedTab = -1;
        var isShiftKeyIsPressed = false;
        const KEY_ENTER = 13;
        const KEY_SHIFT = 16;
        const KEY_UP = 38;
        const KEY_DOWN = 40;

        for (let i = 0; i < tabs.length; i += 1) {
            global.document.body.getElementsByTagName('ul')[0].appendChild(createListItemFromTab(tabs[i]));
        }
        global.document.body.getElementsByTagName('ul')[0].appendChild(createOmniboxListItem());

        var searchInput = global.document.getElementById('searchInput');
        searchInput.addEventListener('keyup', function (event) {
            isShiftKeyIsPressed = !!event.shiftKey;
            switch (event.which) {
                case KEY_SHIFT: {
                    highlightInCreateTabElement(this.value);
                    break;
                }
            }
        });

        searchInput.addEventListener('keydown', function (event) {
            isShiftKeyIsPressed = !!event.shiftKey;
            switch (event.which) {
                case KEY_ENTER : {
                    if (currentSelectedDisplayedTab !== -1) {
                        let displayedTabs = global.document.getElementsByClassName('visible');
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
            }

            let displayedTabs = global.document.getElementsByClassName('visible');
            if (currentSelectedDisplayedTab >= displayedTabs.length) {
                currentSelectedDisplayedTab = 0;
            }

            if (currentSelectedDisplayedTab < 0) {
                currentSelectedDisplayedTab = displayedTabs.length - 1;
            }
            selectTab(displayedTabs[currentSelectedDisplayedTab]);
        });

        searchInput.addEventListener('input', function (event) {
            let displayedTabs = global.document.getElementsByClassName('tab');
            for (let i = 0; i < displayedTabs.length; i += 1) {
                let displayedTab = displayedTabs[i];
                if (this.value == '') {
                    displayedTab.classList.add('visible');
                    displayedTab.getElementsByTagName('a')[0].innerHTML = displayedTab.getElementsByTagName('a')[0].textContent;
                    displayedTab.getElementsByTagName('em')[0].innerHTML = displayedTab.getElementsByTagName('em')[0].textContent;
                } else {
                    let textPosition = displayedTab.textContent.toLowerCase().indexOf(this.value.toLowerCase());
                    if (textPosition != -1) {
                        displayedTab.classList.add('visible');
                    } else {
                        displayedTab.classList.remove('visible');
                    }
                    highlightTextInElement(this.value, displayedTab.getElementsByTagName('a')[0]);
                    highlightTextInElement(this.value, displayedTab.getElementsByTagName('em')[0]);
                }
            }

            highlightInCreateTabElement(this.value);
        });

        function highlightTextInElement(text, element) {
            let textPosition = element.textContent.toLowerCase().indexOf(text.toLowerCase());
            if (textPosition != -1) {
                element.innerHTML = element.textContent.substr(0, textPosition) +
                    '<span class="highlight">' +
                    element.textContent.substr(textPosition, text.length) +
                    '</span>' +
                    element.textContent.substr(textPosition + text.length);
            } else {
                element.innerHTML = element.textContent
            }

        }

        function highlightInCreateTabElement(text) {
            let createNewTab = global.document.getElementById('create_new_tab');
            createNewTab.title = text;
            if (text.length) {
                createNewTab.innerHTML = '"<strong>' + text + '</strong>"' + ' ' + getNewTabLabel();
            } else {
                createNewTab.innerText = getNewTabLabel();
            }
            createNewTab.setAttribute('search-text', text);

        }

        function unselectAllTabs() {
            let displayedTabs = global.document.getElementsByTagName('li');
            for (let i = 0; i < displayedTabs.length; i += 1) {
                let displayedTab = displayedTabs[i];
                displayedTab.classList.remove('selected');
            }
        }

        function selectTab(tab) {
            unselectAllTabs();
            tab.classList.add('selected');
        }

        function createListItemFromTab(tab) {
            var li = global.document.createElement('li');
            li.classList.add('visible');
            li.classList.add('tab');
            li.title = tab.url;
            li.setAttribute('data-tab-window-id', tab.windowId);
            li.setAttribute('data-tab-id', tab.id);
            li.addEventListener('click', function () {
                let tabWindowId = parseInt(this.attributes['data-tab-window-id'].value);
                let tabId = parseInt(this.attributes['data-tab-id'].value);

                chrome.tabs.update(tabId, {
                    'active': true
                }, function () {
                    chrome.windows.update(tabWindowId, {
                        'focused': true
                    });
                });
            });
            li.addEventListener('mouseover', function () {
                selectTab(this);
            });

            if (tab.incognito) {
                li.appendChild(createIncognitoIcon());
            }
            if (tab.audible) {
                //li.appendChild(createIncognitoIcon());
            }
            if (tab.pinned) {
                //li.appendChild(createIncognitoIcon());
            }
            if (tab.mutedInfo.muted) {
                //li.appendChild(createIncognitoIcon());
            }
            li.appendChild(createFavIconFromTab(tab));
            li.appendChild(createHyperLinkFromTab(tab));
            li.appendChild(global.document.createElement('br'));
            li.appendChild(createUrlFromTab(tab));

            return li;

            function createIncognitoIcon(tab) {
                var element = global.document.createElement('img');
                element.classList.add('incognito');
                element.classList.add('big');
                element.classList.add('right');

                return element;
            }

            function createFavIconFromTab(tab) {
                var element = global.document.createElement('img');
                element.classList.add('small');
                element.onerror = function () {
                    this.src = getPlatformFavIcon();
                };

                element.src = getTabFavIcon(tab);

                return element;
            }

            function getPlatformFavIcon () {
                return 'resources/chrome-32.png';
            }

            function createHyperLinkFromTab(tab) {
                var element = global.document.createElement('a');
                element.textContent = tab.title;
                element.title = tab.url;
                element.href = tab.url;
                element.onclick = function (event) {
                    event.preventDefault();
                };

                return element;
            }

            function createUrlFromTab(tab) {
                var element = global.document.createElement('em');
                element.textContent = tab.url;

                return element;
            }
        }

        function createOmniboxListItem() {
            var li = global.document.createElement('li');
            li.classList.add('visible');
            li.id = 'create_new_tab';
            li.innerText = getNewTabLabel();
            li.setAttribute('search-text', 'chrome://newtab');
            li.addEventListener('click', function () {
                var searchText = this.attributes['search-text'].value;
                if (!isLookingLikeAnUri(searchText)) {
                    searchText = 'https://www.google.com/search?q=' + this.attributes['search-text'].value
                } else {
                    if (searchText.indexOf('http://') === -1) {
                        searchText = 'http://' + searchText;
                    }

                }

                if (isShiftKeyIsPressed) {
                    chrome.windows.create({
                        'url': searchText,
                        'focused' : true
                    });
                } else {
                    chrome.tabs.create({
                        'url': searchText
                    });
                }
            });
            li.addEventListener('mouseover', function () {
                selectTab(this);
            });
            return li;

            function isLookingLikeAnUri(text) {
                if (typeof text !== 'string') {
                    return false;
                }

                if (!text.length) {
                    return false;
                }

                let parsedUrl = text.split('://');
                if (parsedUrl.length == 2) {
                    return true;
                }

                parsedUrl = text.split('.');
                if (parsedUrl.length > 1) {
                    var nonWordRegEx = new RegExp('^\w');
                    return parsedUrl.every(function (currentValue, index, completeArray) {
                        return !nonWordRegEx.test(currentValue);
                    });
                }

                return false;
            }
        }

        function getNewTabLabel() {
            return isShiftKeyIsPressed ? '(new window)' : '(new tab)';
        }
    });
})(window, chrome);

function getTabFavIcon(tab) {
    var favIconUrls = [
        { 'name': 'chrome://bookmarks', 'url': 'resources/IDR_BOOKMARKS_FAVICON.png' },
        { 'name': 'chrome://history', 'url': 'resources/IDR_HISTORY_FAVICON.png' },
        { 'name': 'chrome://', 'url': 'resources/IDR_EXTENSIONS_FAVICON.png' },
        { 'name': 'file://', 'url': 'resources/file.png' }
    ];

    var systemFavIconUrl = favIconUrls.find(function (favIcon) {
        return tab.url.indexOf(favIcon.name) == 0;
    });

    return systemFavIconUrl || tab.favIconUrl;
}