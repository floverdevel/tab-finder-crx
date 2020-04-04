Tab Finder - by floverdevel
==============
Google Chrome extension to find an opened tab

![Unit tests](https://github.com/floverdevel/tab-finder-crx/workflows/Unit%20tests/badge.svg)


Goals
-----
- display the list of currently opened tabs, even spread across multiple windows
- filter the list by searching by tabs's title and/or tab's URL
- navigate to the selected tab, and bring its containing window to the foreground
- possibility to create a new tab (inside actual window or in a new window) with the pre-filled omnibox
- close a tab

Install
-------
The directory holding the manifest file can be added as an extension in developer mode in its current state.

- Open the Extension Management page by navigating to [chrome://extensions](chrome://extensions).
  - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
- Enable Developer Mode by clicking the toggle switch next to Developer mode.
- Click the LOAD UNPACKED button and select the extension directory.

Ta-da! The extension has been successfully installed.

See [instructions from Google Chrome's Getting Started Tutorial](https://developer.chrome.com/extensions/getstarted) for more information.

Requirements
------------
node.js v13.3.0 or above
it will probably work just fine with node.js v12.* LTS, i just didn't test it on that platform

License
-------
tab-finder-crx is licensed under the MIT License - see the [LICENSE](LICENSE) file for details