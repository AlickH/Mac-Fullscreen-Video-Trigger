// ==UserScript==
// @name         Fullscreen Video Alfred Trigger
// @namespace    http://tampermonkey.net/
// @version      0.0
// @description  Trigger Alfred workflow when a video or video-related element enters fullscreen in Safari.
// @author       mayuzumi
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 检查网页是否支持全屏事件
    if (document.fullscreenEnabled) {
        // 监听全屏状态变化事件
        document.addEventListener('fullscreenchange', () => {
            const fullscreenElement = document.fullscreenElement;

            if (fullscreenElement) {
                console.log('Element entered fullscreen:', fullscreenElement);

                // 判断是否为 <video> 或包含 <video> 的父级元素
                const isVideoFullscreen =
                    fullscreenElement.tagName === 'VIDEO' ||
                    fullscreenElement.querySelector('video');

                if (isVideoFullscreen) {
                    console.log('Video or video-related element is now in fullscreen!');

                    // 调用 Alfred 工作流
                    window.location.assign("shortcuts://run-shortcut?name=InFullScreenOnly").catch((error) =>
                        console.error('Error triggering Alfred:', error)
                    );
                } else {
                    console.log('The fullscreen element is not video-related.');
                }
            } else {
                window.location.assign("shortcuts://run-shortcut?name=Never").catch((error) =>
                        console.error('Error triggering Alfred:', error)
                    );
                console.log('Exited fullscreen mode.');
            }
        });
    } else {
        console.warn('Fullscreen API is not enabled for this page.');
    }
})();