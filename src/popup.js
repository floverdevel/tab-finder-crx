/**
 * Created by eantaya on 2015-08-21.
 */
(function (window, chrome) {
    'use strict';

    console.log('User agent is %o', window.navigator.userAgent);

    chrome.tabs.query({}, function (tabs) {

        var currentSelectedDisplayedTab = -1;
        const KEY_ENTER = 13;
        const KEY_UP = 38;
        const KEY_DOWN = 40;

        for (let i = 0; i < tabs.length; i += 1) {
            window.document.body.getElementsByTagName('ul')[0].appendChild(createMenuItemFromTab(tabs[i]));
        }

        var searchInput = window.document.getElementById('searchInput');
        searchInput.addEventListener('keydown', function (event) {

            switch (event.which) {
                case KEY_ENTER : {
                    if (currentSelectedDisplayedTab !== -1) {
                        let displayedTabs = window.document.getElementsByClassName('visible');
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
            }

            let displayedTabs = window.document.getElementsByClassName('visible');
            if (currentSelectedDisplayedTab >= displayedTabs.length) {
                currentSelectedDisplayedTab = 0;
            }

            if (currentSelectedDisplayedTab < 0) {
                currentSelectedDisplayedTab = displayedTabs.length - 1;
            }
            selectTab(displayedTabs[currentSelectedDisplayedTab]);
        });

        searchInput.addEventListener('input', function (event) {
            let displayedTabs = window.document.getElementsByTagName('li');
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

        function unselectAllTabs() {
            let displayedTabs = window.document.getElementsByTagName('li');
            for (let i = 0; i < displayedTabs.length; i += 1) {
                let displayedTab = displayedTabs[i];
                displayedTab.classList.remove('selected');
            }
        }

        function selectTab(tab) {
            unselectAllTabs();
            tab.classList.add('selected');
            //currentSelectedDisplayedTab = tab;
        }

        function createMenuItemFromTab(tab) {
            var li = window.document.createElement('li');
            li.classList.add('visible');
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

            li.appendChild(createFavIconFromTab(tab));
            li.appendChild(createHyperLinkFromTab(tab));
            li.appendChild(window.document.createElement('br'));
            li.appendChild(createUrlFromTab(tab));
            return li;

            function createFavIconFromTab(tab) {
                var element = window.document.createElement('img');
                element.classList.add('small');
                if (tab.url.indexOf('chrome://') == 0) {
                    element.src = 'resources/crx-favicon.png';
                } else if (tab.url.indexOf('file://') == 0) {
                    element.src = 'resources/file.png';
                } else {
                    element.src = tab.favIconUrl;
                }
                element.onerror = function () {
                    this.src = getFavIconBasedOnPlatform();
                };

                return element;
            }

            function getFavIconBasedOnPlatform () {
                return 'resources/chrome-32.png';
            }

            function createHyperLinkFromTab(tab) {
                var element = window.document.createElement('a');
                element.textContent = tab.title;
                element.title = tab.url;
                element.href = tab.url;
                element.onclick = function (event) {
                    event.preventDefault();
                };

                return element;
            }

            function createUrlFromTab(tab) {
                var element = window.document.createElement('em');
                element.textContent = tab.url;

                return element;
            }
        }
    });

})(window, chrome);
