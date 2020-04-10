// ==UserScript==
// @name         realPNL
// @description  real PNL based on "Binance Futures price" itself
// @version      1.1
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
}

#realPNL .real-title {
font-size: 0.9em;
}

#realPNL .real-data {
font-weight: bold;
}
`);


$.noConflict();
jQuery( document ).ready(function($) {
    var url = window.location.pathname;
    var box =
        '<div id="realPNL">' +
        '<div class="real-border">'+
        '<div class="real-title">Real PNL (Pure Profit)</div>'+
        '<div class="real-data">...</div>' +
        '</div>' +
        '</div>';

    if(url.match('\/futures\/') !== null )
    {
        setInterval(function()
        {
            if($(".position-tab").length !== 0)
            {
                if($("#realPNL").length !== 0)
                {
                    if($('.trade-history .position-tab .ReactVirtualized__Grid__innerScrollContainer').children().length > 13)
                    {
                        var position = $('.trade-history .position-tab .ReactVirtualized__Grid__innerScrollContainer > div');
                        var positionSize = parseFloat(position.filter(':nth-child(12)').text().replace(/,/g, ''));
                        var positionPrice = parseFloat(position.filter(':nth-child(13)').text().replace(/,/g, ''));
                        var currentPrice = parseFloat($('.header-pc > div:nth-child(2) > div:nth-child(1) > div:nth-child(3)').text().replace(/,/g, ''));
                        var realPNL_sum = ((currentPrice - positionPrice) * positionSize).toFixed(2);
                        var realPNL_pure = (realPNL_sum - (Math.abs((currentPrice+positionPrice)*positionSize) * 0.0004)).toFixed(2);
                        $("#realPNL .real-data").text(realPNL_sum + ' (' + realPNL_pure + ')');
                    }
                    else
                    {
                        $("#realPNL .real-data").text('...');
                    }
                }
                else
                {
                    $('.trade-history .position-tab .ReactVirtualized__Grid').append(box);
                }
            }
        }, 1500);

        console.log('realPNL: ' , 'yeah! some dudes are working on your real PNL, don\'t disturb them.;)');
    }
    else if (url.match('\/futuresng\/') !== null)
    {
        console.log('realPNL: ' , 'Oh crap! this is an new version. I will work on it, sure when it be stable.');
    }
    else
    {
        console.log('realPNL: ' , 'Oops, realPNL doesn\'t work correctly. create an issue on github please.');
    }
});
