# realPNL
*It's an userscript for [Tampermonkey](https://www.tampermonkey.net/)*  
<br/>
PNL in [Binance's Futures](https://www.binance.com/en/futures/) is an "Unrealized" PNL based on Mark Price. It's useful for many things like liquidation.
But as you may know, Your real profit depends on Binance Futures price itself. this script calculates your real PNL and shows your profit and loss.  
<br/><br/>
## Requirements
- [Tampermonkey](https://www.tampermonkey.net/)  
<br/><br/>
## Demo
![Real PNL](https://raw.githubusercontent.com/zargaripour/realPNL/master/demo.png)
If you have a position like this, Your unrealized PNL would be 1810$[mark 1], real PNL whould be 1900$[mark 2], but you will get something around 1348$ after cutting commission[mark 3].  
As you may know, commissions depends on many factors like making order, taking order, BNB level and may other things. Considering all these things needs so many calculations. however, may not have big difference. so we can take top commission, that is 0.04% of each transaction. then you will get "pure profit" or maybe a little bit better.  
<br/><br/>
## Installation
1. Install *Temper Monkey*
    * Install on [Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 
    * Install on [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) 
    * Install on [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089)
2. in "Tempermonkey" dashboard, go to "Utilities" tab
3. insert the below link in "Install from URL":   
    * https://raw.githubusercontent.com/zargaripour/realPNL/master/realPNL.js
4. press "Install"    

that's it. once you have a position on binance futures, the "realPNL" box will be appear.  
*and it will update automaticly...*  
<br/><br/>
## Donation
*If you're happy for getting more profits, you can make me happy too ;)*  
*I shared my script with you. if you want, you can share your happiness with me instead ;)*  
``` 
BTC  (BTC)   Address: 1KA7m2KAwJmnKcrEig34aM8jorH6iEYZ3q 
```
``` 
ETH  (ERC20) Address: 0x4d9cb5ecff2ee24d7e56cd6304aa967a1c0d10eb 
```
``` 
USDT (ERC20) Address: 0x4d9cb5ecff2ee24d7e56cd6304aa967a1c0d10eb 
```
``` 
USDT (TRC20) Address: TBNCkyvLFJkH4ZPsfTbjZ3vqSerrAXYsz1 
```
