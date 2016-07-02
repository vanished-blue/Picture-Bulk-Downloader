'use strict';

let $ = require('jquery/src/callbacks');

let streams;

streams = {
    default: $.Callbacks(),
    getAllImages: $.Callbacks(),
    get(key) {
        return this[key] || this.default;
    }
};

chrome.extension.onMessage.addListener((...props) => {
    let [msg] = props;
    streams.get(msg.command).fire(...props);
});

streams.getAllImages.add((msg, sender, sendResponse) => {
    let images;
    //todo:惰性
    images = _.toArray(document.querySelectorAll('img'))
             .map((img) => {
                 return {
                     src: img.src,
                     naturalWidth: img.naturalWidth,
                     naturalHeight: img.naturalHeight
                 }
             });
    sendResponse(images);
});
