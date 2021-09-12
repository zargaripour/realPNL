// ==UserScript==
// @name         realPNL
// @description  real PNL based on "Binance Futures price" itself
// @version      2.2
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
margin-top: 0;
}
#realPNL .real-border {
border: 1px solid #2a2f37;
display: inline-block;
margin: 0 4px;
}
#realPNL .real-border div {
background-color: #1b2027;
padding: 0 4px;
margin: 2px;
min-width: 110px;
color: #fff;
}
#realPNL .real-title {
font-size: 0.9em;
}
#realPNL .real-data span {
font-weight: bold;
}
#realPNL .shortside {
color: rgb(246, 70, 93);
}

#realPNL .longside {
color: rgb(14, 203, 129);
}
`);


$.noConflict();
jQuery(document).ready(function ($) {
    var url = window.location.pathname;
    var hrf = window.location.href;
    var box =
        '<div id="realPNL">' +
            '<div class="real-border">' +
                '<div class="real-title"><b class="longside">Long Side<b></div>' +
                '<div class="real-data longdata"><b class="longside">...<b></div>' +
            '</div>' +
            '<div class="real-border">' +
                '<div class="real-title"><b class="shortside">Short Side<b></div>' +
                '<div class="real-data shortdata"><b class="shortside">...<b></div>' +
            '</div>' +
        '</div>';

    if (url.match('\/futures\/') !== null || url.match('\/futuresng\/') !== null) {
        setInterval(function () {
            var position = $(".positionRow.body");
            if (position.length !== 0) {
                if ($("#realPNL").length !== 0) {
                    var long = false;
                    var short = false;
                    var item = null;
                    var positionSize = null
                    var positionPrice = null;
                    var currentPrice = null;
                    var realPNL_sum = null;
                    var realPNL_pure = null;

                    if($('.positionRow.body').children().filter('.size.size-sell').length > 0)
                    {
                        item = position.children().filter('.size.size-sell').parent();
                        positionSize = parseFloat(item.children().filter('.size').text().replace(/,/g, ''));
                        positionPrice = parseFloat(item.children().filter('.entryPrice').text().replace(/,/g, ''));
                        currentPrice = parseFloat($('.contractPrice').text().replace(/,/g, ''));
                        realPNL_sum = ((currentPrice - positionPrice) * positionSize).toFixed(2);
                        realPNL_pure = (realPNL_sum - (Math.abs((currentPrice + positionPrice) * positionSize) * 0.0004)).toFixed(2);
                        $("#realPNL .real-data.shortdata").text(realPNL_pure);
                        short = true;
                    }
                    if($('.positionRow.body').children().filter('.size.size-buy').length > 0)
                    {
                        item = position.children().filter('.size.size-buy').parent();
                        positionSize = parseFloat(item.children().filter('.size').text().replace(/,/g, ''));
                        positionPrice = parseFloat(item.children().filter('.entryPrice').text().replace(/,/g, ''));
                        currentPrice = parseFloat($('.contractPrice').text().replace(/,/g, ''));
                        realPNL_sum = ((currentPrice - positionPrice) * positionSize).toFixed(2);
                        realPNL_pure = (realPNL_sum - (Math.abs((currentPrice + positionPrice) * positionSize) * 0.0004)).toFixed(2);
                        $("#realPNL .real-data.longdata").text(realPNL_pure);
                        long = true;
                    }

                    if(long == false)
                    {
                        $("#realPNL .real-data.longdata").html('<b class="longside">...<b>');
                    }
                    if(short == false)
                    {
                        $("#realPNL .real-data.shortdata").html('<b class="shortside">...<b>');
                    }
                } else {
                    $(".css-1p1znp9").append(box);
                }
            }
        }, 1500);
    } else {
        console.log('realPNL: ', 'Oops, realPNL doesn\'t work correctly. create an issue on github please.');
    }
});
