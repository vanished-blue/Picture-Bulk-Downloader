(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
//todo: 可考虑使用RxJs(事件流)
//todo: git remote add origin `my github address`
//todo: git push origin ChromeExtensionProjects/picdownload

let Promise = require('./lib/promise');

chrome.contextmenu.create({
    
});

},{"./lib/promise":2}],2:[function(require,module,exports){
'use strict';

Promise.promisify = (fn) => {
    return (...props) => {
        return new Promise((resolve, reject) => {
            props.push((response) => {
                if(response != null) {
                    resolve(response);
                }else {
                    reject(response);
                }
            });
            fn.apply(null, props);
        });
    }
};

module.exports = Promise;
},{}]},{},[1])