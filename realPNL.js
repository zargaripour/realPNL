// ==UserScript==
// @name         realPNL
// @description  real PNL based on "Binance Futures price" itself
// @version      0.9
// @author       Hamed Zargaripour
// @namespace    https://zargaripour.com/repo/realPNL/
// @updateURL    https://zargaripour.com/repo/realPNL/dist/realPNL.latest.js
// @match        https://www.binance.com/en/futures/*
// @icon         https://bin.bnbstatic.com/static/images/common/favicon.ico
// @grant        GM_addStyle
// @copyright    2020+, zargaripour.com
// ==/UserScript==

/* globals $, waitForKeyElements */


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
min-width: 150px;
}

#realPNL .real-title {
font-size: 0.9em;
}

#realPNL .real-data {
font-weight: bold;
}
`);


$(document).ready(function ()
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
					$("#realPNL .real-data").text(((currentPrice - positionPrice) * positionSize).toFixed(2));
				}
			}
			else
			{
				$('.trade-history .position-tab .ReactVirtualized__Grid').append(
					'<div id="realPNL">'+
					'<div class="real-border">'+
					'<div class="real-title">Real PNL</div>'+
					'<div class="real-data">...</div>'+
					'</div>'+
					'</div>'
				);
			}
		}
	}, 2500);
});


