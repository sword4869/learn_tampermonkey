// ==UserScript==
// @name         m163MusicDownloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       sword4869
// @match        https://music.163.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let status_txt = document.createElement('div');
    function addButton() {
        let newElement = document.createElement('div');

        newElement.style.position = 'fixed';
        newElement.style.top = '10px';
        newElement.style.left = '10px';
        newElement.style.border = '1px solid #DDD';
        newElement.style.backgroundColor = '#FFF';
        newElement.style.zIndex = 9999;

        // button
        let download_mp3_btn = document.createElement('button');
        download_mp3_btn.innerText = '♬';
        download_mp3_btn.style.backgroundColor = '#FFF';
        // 'https://music.163.com/song/media/outer/url?id=1303026566.mp3'
        let base_url = 'https://music.163.com/song/media/outer/url?';
        let song_id = window.location.href;
        song_id = song_id.split('?')[1];
        let my_url = base_url + song_id + '.mp3';
        status_txt.innerText = song_id;
        let file_name_element = document.querySelector('.f-ff2');
        let file_name = '';
        if(file_name_element){
            file_name = document.querySelector('.f-ff2').innerHTML + '.mp3';
        }
        download_mp3_btn.addEventListener('click',
            function () {
                let a = document.createElement('a')
                a.href = my_url;
                a.download = file_name;
                a.click();
                status_txt.innerText = 'download...';
            });
        newElement.appendChild(download_mp3_btn);

        // status_txt
        newElement.appendChild(status_txt);

        // 将这个新的元素和它的文本添加到 DOM 中
        document.body.appendChild(newElement);
    }

    window.addEventListener('hashchange', addButton);
    window.onload = addButton；
})();
