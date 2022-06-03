// ==UserScript==
// @name         Digit77 Helper
// @namespace    cn.XYZliang.digit77Helper
// @version      1.0
// @description  Digit77下载助手。自动复制提取码，跳过ouo.io的三秒等待时间！
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @license      GNU General Public License v3.0
// @author       XYZliang
// @include      https://www.digit77.com/*
// @include      http://www.digit77.com/*
// @include      https://ouo.press/*
// @include      http://ouo.press/*
// @include      https://ouo.io/*
// @include      http://ouo.io/*
// @icon         https://www.digit77.com/lib/img/logo.svg
// @grant        unsafeWindow
// @run-at       document-end
// @charset		 UTF-8
// ==/UserScript==
/* globals jQuery, $ */
// @grant GM_setClipboard

// 用户设置
// 设置选项 1为开启 0为关闭
var seeting = {
    //是否自动复制下载页面的提取码
    automaticCopyingExtractedCode: 1
        //是否ouo.io的三秒等待时间
    ,skipWaitingTime: 1
}


// 脚本代码
'use strict';
let url = location.host;
if (url == "www.digit77.com" && seeting.automaticCopyingExtractedCode == 1) {
    $("#history_version a").each(function () {
        $("#history_version th")[2].innerText="下载链接（已开启Digit77 Helper自动复制提取码）"
        let codeText = this.innerText;
        let code = codeText.split(" ")[1]
        if (code != undefined) {
            this.addEventListener('click', function () {
                let text = code;
                let copyButton = document.createElement('button')
                copyButton.setAttribute("id", "copy")
                copyButton.setAttribute("class", "btn")
                copyButton.setAttribute("data-clipboard-text", text)
                copyButton.innerText = "已复制提取码"+code
                this.parentNode.appendChild(copyButton)
                let clipboard = new ClipboardJS('.btn');
                clipboard.on('success', function (e) {
                    console.info('Action:', e.action);
                    console.info('Text:', e.text);
                    console.info("提取码"+text+"复制成功");
                    e.clearSelection();
                });
                clipboard.on('error', function (e) {
                    console.error('Action:', e.action);
                    console.error('Trigger:', e.trigger);
                    console.error("提取码"+text+"复制失败");
                });
                $("#copy").click()
                this.parentNode.removeChild(copyButton)
            });
        }
    })
}
else if(url.indexOf("ouo")!=-1 && seeting.skipWaitingTime == 1){
    console.log("正在跳过ouo")
    $("h4").innerText="Digit Help正在跳过等待！"
    $(".btn-main").innerText="欢迎使用Digit77 Helper"
    $(".btn-main").click()
}