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
    // for (let i = 0; i < imgs.length; i++) {
    // for (let i = 0; i < 8; i++) {
    //     let src_splits = imgs[i].src.split('.');
    //     let big_src = "";
    //     for (let j = 0 ; j < src_splits.length - 1; j++){
    //         big_src += src_splits[j];
    //         big_src += '.';
    //     }
    //     big_src = big_src.substring(0, big_src.length-2);
    //     big_src += '.';
    //     big_src += src_splits[src_splits.length - 1];
    //     imgs[i].src = big_src;
    //     console.log(big_src)
    // }

    for (let i = 0; i < imgs.length; i++) {
        imgs[i].click();
    }

    // Your code here...
})();