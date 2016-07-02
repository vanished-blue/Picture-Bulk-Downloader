'use strict';
// 可考虑使用RxJs(事件流)

let streams = {
    browserAction: {
        onClicked: $.Callbacks()
    }
};

chrome.browserAction.onClicked.addListener(() => {
    streams.browserAction.onClicked.fire();
});

streams.browserAction.onClicked.add(() => {
    console.log('browser action clicked');
});

