/*
 * @Description: 移动端rem适配
 * @Author: 李佳馨
 * @Date: 2019-05-17 16:02:23
 * @LastEditTime: 2019-05-17 17:10:07
 * @LastEditors: Please set LastEditors
 */

(function (baseFontSize) {
    var docEl = document.documentElement
    
    // 获取dpr，设置meta标签
    var ua = navigator.userAgent
    var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
    var isAndroid = window.navigator.appVersion.match(/android/gi)
    var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
    
    var dpr = window.devicePixelRatio || 1

    if (isIos) {
        dpr = (dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1))
    } else if (isAndroid && !(matches && matches[1] > 534)) {
        // 如果非iOS, 非Android4.3以上, dpr设为1;
        dpr = 1
    }

    docEl.setAttribute('data-dpr', dpr)
    var scale = 1 / dpr
    var metaEl = document.querySelector('meta[name="viewport"]')
    if (!metaEl) {
        metaEl = document.createElement('meta')
        metaEl.setAttribute('name', 'viewport')
        window.document.head.appendChild(metaEl)
    }
    metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale)

    // 设置html Fontsize
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var _baseFontSize = baseFontSize || 100

    var refreshRem = function () {
        var clientWidth = window.innerWidth ||
                          docEl.clientWidth ||
                          document.body.clientWidth

        if (!clientWidth) {
            return
        }
        docEl.style.fontSize = (clientWidth / (750 / _baseFontSize)) + 'px'
    }

    window.addEventListener(resizeEvt, refreshRem, false)
    document.addEventListener('DOMContentLoaded', refreshRem, false)

    refreshRem()
})()
