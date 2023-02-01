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

    let status_txt = document.createElement('div');
    status_txt.innerText = 10;


    function getTop(e) {
        let T = e.offsetTop;
        while (e = e.offsetParent) {
            T += e.offsetTop;
        }
        return T;
    }

    function exemplify(){
        let my_imgs = document.querySelector('.thread').querySelectorAll('img');

        let H = document.documentElement.clientHeight;//获取可视区域高度
        let S = document.documentElement.scrollTop || document.body.scrollTop;

        let debug_max = 0

        // we want to replace link of small img to link of big img, but failed, because the width and height also need to accordingly change.
        for (let i = 0; i < my_imgs.length; i++) {
            const pre_load = H * parseInt(status_txt.innerText) + S
            if (pre_load > getTop(my_imgs[i])) {
                my_imgs[i].src = my_imgs[i].parentElement.href
                my_imgs[i].style = 'max-height: 100%; max-width: 100%';
                if(i > debug_max){
                    debug_max = i;
                }
            }
        }
        console.log(debug_max);
    }

    function addElement() {
        let newElement = document.createElement('div');

        newElement.style.position = 'fixed';
        newElement.style.top = '10px';
        newElement.style.left = '10px';
        newElement.style.border = '1px solid #DDD';
        newElement.style.backgroundColor = '#FFF';
        newElement.style.zIndex = 9999;

        // button
        let btn_lower = document.createElement('button');
        btn_lower.innerText = '-';
        btn_lower.style.backgroundColor = '#FFF';
        btn_lower.addEventListener('click',
            function () {
                status_txt.innerText = parseInt(status_txt.innerText) - 1;
            }
        );

        let btn_upper = document.createElement('button');
        btn_upper.innerText = '+';
        btn_upper.style.backgroundColor = '#FFF';
        btn_upper.addEventListener('click',
            function () {
                status_txt.innerText = parseInt(status_txt.innerText) + 1;
            }
        );

        newElement.appendChild(btn_lower);
        newElement.appendChild(btn_upper);

        // status_txt
        newElement.appendChild(status_txt);

        // 将这个新的元素和它的文本添加到 DOM 中
        document.body.appendChild(newElement);
    }

    addElement();

    window.onload = window.onscroll = exemplify;
    
})();