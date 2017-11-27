# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## coming soon
- display pinned tabs on top of list

## 0.5.1
_2017-11-27_
- fix text overlapping when title or url are too long
- fix search input placeholder text

## 0.5.0
_2017-11-23_
- close a tab _(pro tip : you can do it with middle-click too)_
- about version is displayed at the bottom of popup

## 0.4.0
_2017-10-26_
- ESC key closes the popup
- minor bugfix and optimization

## 0.3.9.2
_2016-02-17_
- set the manifest's minimum_chrome_version to 27.0.1453.110 so the extension can be install on older browser via the google chrome webstore

## 0.3.9.1
_2016-02-17_
- fix a crash on older chrome version (tested on my chrome version 27.0.1453.110).  Google Chrome webstore will not let you install but if install from source, this will help you :)

## 0.3.9
_2016-02-15_
- fix a crash when trying to render muted state on chrome version 45 or less

## 0.3.8
_2016-01-25_
- fix the behavior of the (new tab) when an empty string was supplied

## 0.3.7
_2015-11-25_
- fix rendering of google chrome internals urls's favicon (chrome://*)

## 0.3.6
_2015-11-16_
- adjust manifest file to enable packaging into chrome webstore

## 0.3.5
_2015-11-16_
- move README file into src folder to enable packaging into chrome webstore

## 0.3.4
_2015-11-16_
- added tooltip text

## 0.3.3
_2015-11-02_
- incognito, audible, muted and pinned icons are always display

## 0.3.2
_2015-10-30_
- add more icons for audible, muted, pinned

## 0.3.1
_2015-10-30_
- remove specials chars (thanks to @pascal_laporte)

## 0.3
_2015-10-30_
- icon to show if a tab is incognito
- more icons for chrome urls

## 0.2
_2015-10-06_
- hold the shift key to open in new window instead of a new tab

## 0.1
### initial version
_2015-09-28_
- do not search for text that looks like an uri, open them directly
- trigger a google search when no tab are found
- option to create a new tab
- highlight text in element
- favicon for special google chrome internals urls
- display favicon and url