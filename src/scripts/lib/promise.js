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