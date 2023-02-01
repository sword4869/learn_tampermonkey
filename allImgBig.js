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


    // 判断浏览器
    // msie：是否是ie，若不是返回false
    // gecko：是否是gecko，若是返回true
    // edge等一般都是 Browser.ie = false, Browser.Moz = true
    let Browser = new Object();
    Browser.userAgent = window.navigator.userAgent.toLowerCase();
    Browser.ie = /msie/.test(Browser.userAgent);
    Browser.Moz = /gecko/.test(Browser.userAgent);

    //判断是否加载完成
    function Imagess (url, callback, error) {
        // 临时对象
        let tmp_img = new Image();
        if (Browser.ie) {
            tmp_img.onreadystatechange = function () {
                if (tmp_img.readyState == "complete" || tmp_img.readyState == "loaded") {
                    callback(tmp_img);
                }
            }
        } else {
            tmp_img.onload = function () {
                if (tmp_img.complete == true) {
                    callback(tmp_img);
                }
            }
        }
        //如果因为网络或图片的原因发生异常，则显示该图片
        if (error) {
            tmp_img.onerror = error;

        } else {
            tmp_img.onerror = function () {
                tmp_img.src = "http://sunbrightness.gitee.io/csdn-material/img_loading/failed.png"
            }
        }
        tmp_img.src = url;
    }


    function getTop(e) {
        let T = e.offsetTop;
        while (e = e.offsetParent) {
            T += e.offsetTop;
        }
        return T;
    }

    function addAttribute(){
        let my_imgs = document.querySelector('.thread').querySelectorAll('img');
        for (let i = 0; i < my_imgs.length; i++) {
            let my_img = my_imgs[i];
            my_img.setAttribute("data-src", my_img.parentElement.href);
        }
    }

    // for bug: see load to which one.
    let debug_loaded = 0;


    function lazy_load(){
        let my_imgs = document.querySelector('.thread').querySelectorAll('img');

        let H = document.documentElement.clientHeight;//获取可视区域高度
        let S = document.documentElement.scrollTop || document.body.scrollTop;

        // for bug: see load to which one.
        let debug_located = 0;

        // we want to replace link of small img to link of big img, but failed, because the width and height also need to accordingly change.
        for (let i = 0; i < my_imgs.length; i++) {
            
            // for debug: now_located
            if (S > getTop(my_imgs[i])) {
                if(i > debug_located){
                    debug_located = i;
                }
            }
            const pre_load = H * parseInt(status_txt.innerText) + S

            if (pre_load > getTop(my_imgs[i])) {
                let my_img = my_imgs[i];
                //防止重复加载
                if (my_img.loading == true) {
                    continue;
                }
                //没有该属性代表不加载
                if (!my_img.getAttribute("data-src")) {
                    continue;
                }
                my_img.loading = true;
                // 这个tmp_img就是Imagess里的临时对象tmp_img
                Imagess(my_img.getAttribute("data-src"), function (tmp_img) {
                    // 加载成功则正确的url，或者加载失败放404的图
                    my_img.src = tmp_img.src;
                    my_img.style = 'max-height: 100%; max-width: 100%';
                    my_img.removeAttribute("data-src");
                });
                
                // for debug: 
                if(i > debug_loaded){
                    debug_loaded = i;
                }
            }
        }
        console.log(`debug_loaded = ${debug_loaded}, debug_located = ${debug_located}`);
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
    window.onload = function(){
        addAttribute();
        lazy_load();
    };
    window.onscroll = lazy_load;
    
})();