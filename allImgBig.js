// ==UserScript==
// @name         allImgBig
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       sword4869
// @match        https://boards.4chan.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let imgs = document.querySelector('.thread').querySelectorAll('img');

    // we want to replace link of small img to link of big img, but failed, because the width and height also need to accordingly change.
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].src = imgs[i].parentElement.href
        imgs[i].style = 'max-height: 100%; max-width: 100%';
    }

    // Your code here...
})();