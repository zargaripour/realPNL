// ==UserScript==
// @name         realPNL
// @description  real PNL based on "Binance Futures price" itself
// @version      1.8
// @author       Hamed Zargaripour
// @namespace    https://github.com/zargaripour/realPNL
// @updateURL    https://raw.githubusercontent.com/zargaripour/realPNL/master/realPNL.js
// @icon         https://bin.bnbstatic.com/static/images/common/favicon.ico
// @match        https://www.binance.com/*/futures/*
// @match        https://www.binance.com/*/futuresng/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM_addStyle
// @copyright    2020+, zargaripour.com
// ==/UserScript==

/* globals $,jQuery, waitForKeyElements */


GM_addStyle (`
#realPNL {
text-align: center;
width: 100%;
font-size: 1.2em;
}
#realPNL .real-border {
border: 1px solid #2a2f37;
display: inline-block;
margin: 16px;
}
#realPNL .real-border div {
background-color: #1b2027;
padding: 8px 16px;
margin: 2px;
min-width: 128px;
color: #fff;
}
#realPNL .real-title {
font-size: 0.9em;
}
#realPNL .real-data span {
font-weight: bold;
}
`);


$.noConflict();
jQuery(document).ready(function ($) {
    var url = window.location.pathname;
    var hrf = window.location.href;
    var box =
        '<div id="realPNL">' +
        '<div class="real-border">' +
        '<div class="real-title"><b>Pure Profit<b></div>' +
        '<div class="real-data">...</div>' +
        '</div>' +
        '</div>';

    if (url.match('\/legacy\/') !== null) {
        setInterval(function () {
            if ($(".position-tab").length !== 0) {
                if ($("#realPNL").length !== 0) {
                    if ($('.trade-history .position-tab .ReactVirtualized__Grid__innerScrollContainer').children().length > 13) {
                        var position = $('.trade-history .position-tab .ReactVirtualized__Grid__innerScrollContainer > div');
                        var positionSize = parseFloat(position.filter(':nth-child(12)').text().replace(/,/g, ''));
                        var positionPrice = parseFloat(position.filter(':nth-child(13)').text().replace(/,/g, ''));
                        var currentPrice = parseFloat($('.header-pc > div:nth-child(2) > div:nth-child(1) > div:nth-child(3)').text().replace(/,/g, ''));
                        var realPNL_sum = ((currentPrice - positionPrice) * positionSize).toFixed(2);
                        var realPNL_pure = (realPNL_sum - (Math.abs((currentPrice + positionPrice) * positionSize) * 0.0004)).toFixed(2);
                        $("#realPNL .real-data").text(realPNL_pure);
                    } else {
                        $("#realPNL .real-data").text('...');
                    }
                } else {
                    $('.trade-history .position-tab .ReactVirtualized__Grid').append(box);
                }
            }
        }, 1500);
    } else if (url.match('\/futures\/') !== null || url.match('\/futuresng\/') !== null) {
        setInterval(function () {
            var position = $(".css-4q7727 .positionRow");
            if (position.length !== 0)
            {
                if ($("#realPNL").length !== 0) {
                    if (position.children().length > 5) {
                        var positionSize = parseFloat(position.children().filter('.size').text().replace(/,/g, ''));
                        var positionPrice = parseFloat(position.children().filter('.entryPrice').text().replace(/,/g, ''));
                        var currentPrice = parseFloat($('.showPrice').text().replace(/,/g, ''));
                        var realPNL_sum = ((currentPrice - positionPrice) * positionSize).toFixed(2);
                        var realPNL_pure = (realPNL_sum - (Math.abs((currentPrice + positionPrice) * positionSize) * 0.0004)).toFixed(2);
                        $("#realPNL .real-data").text(realPNL_pure);
                    } else {
                        $("#realPNL .real-data").text('...');
                    }
                } else {
                    position.parents().eq(2).append(box);
                }
            }
        }, 1500);
    } else {
        console.log('realPNL: ', 'Oops, realPNL doesn\'t work correctly. create an issue on github please.');
    }
});
