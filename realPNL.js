// ==UserScript==
// @name         realPNL
// @description  real PNL based on "Binance Futures price" itself
// @version      1.2
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
min-width: 192px;
color: #fff;
}

#realPNL .real-title {
font-size: 0.9em;
}

#realPNL .real-data span:nth-child(1) {
font-weight: normal;
color: #888;
}

#realPNL .real-data span:nth-child(2) {
font-weight: bold;
}
`);


$.noConflict();
jQuery(document).ready(function ($) {
    var url = window.location.pathname;
    var box =
        '<div id="realPNL">' +
        '<div class="real-border">' +
        '<div class="real-title">Real PNL (<b>Pure Profit<b>)</div>' +
        '<div class="real-data"><span>...</span> <span>(...)</span></div>' +
        '</div>' +
        '</div>';

    if (url.match('\/futures\/') !== null) {
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
                        $("#realPNL .real-data span:nth-child(1)").text(realPNL_sum);
                        $("#realPNL .real-data span:nth-child(2)").text('(' + realPNL_pure + ')');
                    } else {
                        $("#realPNL .real-data span:nth-child(1)").text('...');
                        $("#realPNL .real-data span:nth-child(2)").text('(...)');
                    }
                } else {
                    $('.trade-history .position-tab .ReactVirtualized__Grid').append(box);
                }
            }
        }, 1500);
    } else if (url.match('\/futuresng\/') !== null) {
        setInterval(function () {
            var position = $(".css-4q7727 .list-grid .css-13rzmoo");
            if (position.length !== 0)
            {
                if ($("#realPNL").length !== 0) {
                    position = position.parent();
                    if (position.children().length > 5) {
                        var positionSize = parseFloat(position.children().filter(':nth-child(2)').text().replace(/,/g, ''));
                        var positionPrice = parseFloat(position.children().filter(':nth-child(3)').text().replace(/,/g, ''));
                        var currentPrice = parseFloat($('.css-xz4nxa .css-vurnku').text().replace(/,/g, ''));
                        var realPNL_sum = ((currentPrice - positionPrice) * positionSize).toFixed(2);
                        var realPNL_pure = (realPNL_sum - (Math.abs((currentPrice + positionPrice) * positionSize) * 0.0004)).toFixed(2);
                        $("#realPNL .real-data span:nth-child(1)").text(realPNL_sum);
                        $("#realPNL .real-data span:nth-child(2)").text('(' + realPNL_pure + ')');
                    } else {
                        $("#realPNL .real-data span:nth-child(1)").text('...');
                        $("#realPNL .real-data span:nth-child(2)").text('(...)');
                    }
                } else {
                    $("div").parent(".css-4q7727 .list-grid").append(box);
                }
            }
        }, 1500);
    } else {
        console.log('realPNL: ', 'Oops, realPNL doesn\'t work correctly. create an issue on github please.');
    }
});
