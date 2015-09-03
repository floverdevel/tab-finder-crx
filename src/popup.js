/**
 * Created by eantaya on 2015-08-21.
 */
(function (window, chrome) {
    'use strict';

    var currentSelectedDisplayedTab = -1;
    const KEY_ENTER = 13;
    const KEY_UP = 38;
    const KEY_DOWN = 40;

    chrome.tabs.query({}, function (tabs) {

        for (let i = 0; i < tabs.length; i += 1) {
            let tab = tabs[i];
            let p = window.document.createElement('p');
            let a = window.document.createElement('a');

            p.classList.add('visible');
            a.textContent = tab.title;
            a.title = p.title = tab.url;
            a.href = tab.url;
            p.setAttribute('data-tab-window-id', tab.windowId);
            p.setAttribute('data-tab-id', tab.id);
            p.onclick = function () {
                let tabWindowId = parseInt(this.attributes['data-tab-window-id'].value);
                let tabId = parseInt(this.attributes['data-tab-id'].value);

                chrome.tabs.update(tabId, {
                    'active': true
                }, function () {
                    chrome.windows.update(tabWindowId, {
                        'focused': true
                    });
                });
            };
            p.onmouseover = function () {
                selectTab(this);
            };

            window.document.body.appendChild(p);
            p.appendChild(a);
        }

        var searchInput = window.document.getElementById('searchInput');
        searchInput.addEventListener('keydown', function (event) {

            switch (event.which) {
                case KEY_ENTER : {
                    if (currentSelectedDisplayedTab !== -1) {
                        window.document.getElementsByTagName('a')[currentSelectedDisplayedTab].click();
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
            let displayedTabs = window.document.getElementsByTagName('p');
            for (let i = 0; i < displayedTabs.length; i += 1) {
                let displayedTab = displayedTabs[i];
                if (this.value == '') {
                    displayedTab.classList.add('visible');
                } else {
                    if (displayedTab.textContent.toLowerCase().indexOf(this.value.toLowerCase()) != -1) {
                        displayedTab.classList.add('visible');
                        displayedTab.classList.remove('hidden');
                    } else {
                        displayedTab.classList.remove('visible');
                        displayedTab.classList.add('hidden');
                    }
                }
            }
        });
    });

    function unselectAllTabs() {
        let displayedTabs = window.document.getElementsByTagName('p');
        for (let i = 0; i < displayedTabs.length; i += 1) {
            let displayedTab = displayedTabs[i];
            displayedTab.classList.remove('selected');
        }
    }

    function selectTab(tab) {
        unselectAllTabs();
        tab.classList.add('selected');
    }


})(window, chrome);
