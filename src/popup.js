/**
 * Created by eantaya on 2015-08-21.
 */
(function (window, chrome) {
    'use strict';

    let currentSelectedDisplayedTab = -1;
    const KEY_ENTER = 13;
    const KEY_UP = 38;
    const KEY_DOWN = 40;

    chrome.tabs.query({}, function (tabs) {

        for (let i = 0; i < tabs.length; i += 1) {
            let tab = tabs[i];
            let a = window.document.createElement('a');
            let p = window.document.createElement('p');
            let img = window.document.createElement('img');
            let em = window.document.createElement('em');
            let br = window.document.createElement('br');


            a.textContent = tab.title;
            a.title = tab.url;
            a.href = tab.url;
            a.onclick = function () {
                return false;
            };

            if (tab.url.indexOf('chrome://') == 0) {
                img.src = 'resources/crx-favicon.png';
            } else if (tab.url.indexOf('file://') == 0) {
                img.src = 'resources/file.png';
            } else {
                img.src = tab.favIconUrl;
            }
            img.onerror = function () {
                this.src = 'resources/chrome-32.png';
            };

            em.textContent = tab.url;

            p.classList.add('visible');
            p.title = tab.url;
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
            p.onmouseout = function () {
                // unselectAllTabs();
            };

            p.appendChild(img);
            p.appendChild(a);
            p.appendChild(br);
            p.appendChild(em);
            window.document.body.appendChild(p);
        }

        window.addEventListener('keydown', function (event) {

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

        var searchInput = window.document.getElementById('searchInput');
        searchInput.addEventListener('input', function (event) {
            let displayedTabs = window.document.getElementsByTagName('p');
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
                        displayedTab.classList.remove('hidden');
                    } else {
                        displayedTab.classList.remove('visible');
                        displayedTab.classList.add('hidden');
                    }
                    highlightTextInElement(this.value, displayedTab.getElementsByTagName('a')[0]);
                    highlightTextInElement(this.value, displayedTab.getElementsByTagName('em')[0]);
                }
            }
        });
    });

    function highlightTextInElement(text, element) {
        let textPosition = element.textContent.toLowerCase().indexOf(text.toLowerCase());
        if (textPosition != -1) {
            let title = element.textContent;
            let highlightedContent =
                element.textContent.substr(0, textPosition) +
                '<span class="highlight">' +
                element.textContent.substr(textPosition, text.length) +
                '</span>' +
                element.textContent.substr(textPosition + text.length);
            element.innerHTML = highlightedContent;
        } else {
            element.innerHTML = element.textContent
        }

    }

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
