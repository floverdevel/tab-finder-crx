/**
 * Created by eantaya on 2015-08-21.
 */
(function (window) {
    'use strict';

    var currentSelectedDisplayedTab = -1;
    const KEY_UP = 38;
    const KEY_DOWN = 40;

    chrome.tabs.query({}, function (tabs) {

        for (let i = 0; i < tabs.length; i += 1) {
            let tab = tabs[i];
            let p = window.document.createElement('p');
            let a = window.document.createElement('a');
            a.textContent = tab.title;
            a.title = tab.url;
            a.href = tab.url;
            a.onclick = function () {
                console.log('clicked on this %o, %o', this, arguments);
            };

            window.document.body.appendChild(p);
            p.appendChild(a);
        }

        var searchInput = window.document.getElementById('searchInput');
        searchInput.addEventListener('keydown', function (event) {
            let displayedTabs = window.document.getElementsByTagName('p');
            if (currentSelectedDisplayedTab !== -1) {
                displayedTabs[currentSelectedDisplayedTab].classList.remove('selected');
            }

            switch (event.which) {
                case KEY_DOWN : {
                    currentSelectedDisplayedTab += 1;
                    break;
                }
                case KEY_UP : {
                    currentSelectedDisplayedTab -= 1;
                    break;
                }
            }

            if (currentSelectedDisplayedTab == tabs.length) {
                currentSelectedDisplayedTab = 0;
            }

            if (currentSelectedDisplayedTab < 0) {
                currentSelectedDisplayedTab = tabs.length - 1;
            }
            displayedTabs[currentSelectedDisplayedTab].classList.add('selected');
        });

        searchInput.addEventListener('keyup', function (event) {
            let displayedTabs = window.document.getElementsByTagName('p');
            for (let i = 0; i < displayedTabs.length; i += 1) {
                let displayedTab = displayedTabs[i];
                if (this.value == '') {
                    displayedTab.style.display = 'block';
                } else {
                    if (displayedTab.textContent.toLowerCase().indexOf(this.value.toLowerCase()) != -1) {
                        displayedTab.style.display = 'block';
                    } else {
                        displayedTab.style.display = 'none';
                    }
                }
            }
        });
    });

})(window);
