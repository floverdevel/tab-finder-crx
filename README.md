Tab Finder - by floverdevel
===========================
Google Chrome extension to find an opened tab

[![Unit tests](https://github.com/floverdevel/tab-finder-crx/workflows/Unit%20tests/badge.svg)](https://github.com/floverdevel/tab-finder-crx/actions)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg)](#contributors-)
[![License: MIT](https://img.shields.io/badge/License-MIT-informational.svg)](./LICENSE)


Goals
-----
- display the list of currently opened tabs, even those in others windows
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
node.js v12.18.3 or above

it will probably work just fine with node.js v14.* LTS, i just didn't test it on that platform


License
-------
Tab Finder - by floverdevel is licensed under the MIT License - see the [LICENSE](LICENSE) file for details


Contributors ✨
---------------
Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://nuglif.com"><img src="https://avatars2.githubusercontent.com/u/1007857?v=4" width="100px;" alt=""/><br /><sub><b>Ellis</b></sub></a><br /><a href="https://github.com/floverdevel/tab-finder-crx/commits?author=floverdevel" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/cdemers"><img src="https://avatars0.githubusercontent.com/u/595362?v=4" width="100px;" alt=""/><br /><sub><b>Charle Demers</b></sub></a><br /><a href="https://github.com/floverdevel/tab-finder-crx/commits?author=cdemers" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
