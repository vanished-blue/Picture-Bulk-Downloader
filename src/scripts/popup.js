"use strict";

//resizeTo在popup页面不生效
// window.resizeTo(document.body.clientWidth, document.body.clientHeight);

chrome.tabs.query = Promise.promisify(chrome.tabs.query);
chrome.tabs.sendMessage = Promise.promisify(chrome.tabs.sendMessage);

let app = angular.module('app', ['ngStorage']);

// angular.element($0).scope();
// angular.element($0).controller();

app.controller('ImageCtrl', ($scope, $localStorage) => {
    $scope.$storage = $localStorage;

    //todo:用coffee来写
    //todo:$scope.$storage.minWidth ?= '100'
    if($scope.$storage.minWidth === undefined) {
        $scope.$storage.minWidth = '100';
    }

    if($scope.$storage.minHeight === undefined) {
        $scope.$storage.minHeight = '100';
    }

    $scope.allImages = [];
    $scope.images = [];
    $scope.selectedCount = 0;

    $scope.$watch('images', (newVal, oldVal, scope) => {
        scope.selectedCount = scope.images.filter((image) => {
            return !!image.selected;
        }).length;
    }, true);

    let origin;
    
    //todo:move into provider?factory?service?
    let filterByOrigin = (images) => {
        return images.filter((image) => {
            return origin ? new URL(image.src).origin === origin : true;
        });
    };

    let filterByWidth = (images) => {
        return images.filter((image) => {
            return image.naturalWidth >= +$scope.$storage.minWidth;
        });
    };

    let filterByHeight = (images) => {
        return images.filter((image) => {
            return image.naturalHeight >= +$scope.$storage.minHeight;
        });
    };

    let filterByDimension = _.compose(filterByWidth, filterByHeight);
    let filterPictures = _.compose(filterByOrigin, filterByDimension);

    //todo:compose
    $scope.filter = () => {
        $scope.images = filterPictures($scope.allImages);
    };
    
    let download = (image, index) => {
        let link = document.createElement('a');
        link.href = image.src;
        link.download = index + 1;
        link.click();
    };

    $scope.downloadBulk = () => {
        $scope.images
        .filter((image) => {
            return !!image.selected;
        })
        .forEach(download)
    };

    $scope.all = () => {
        //todo:Immutable
        $scope.images.forEach((image) => {
            image.selected = true;
        });
    };

    $scope.complement = () => {
        _.range($scope.images.length).forEach($scope.toggleSelect);
    };

    $scope.fetch = () => {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        })
        .then(tabs => {
            return chrome.tabs.sendMessage(tabs[0].id, {
              command: 'getAllImages'
            });
        })
        .then(response => {
            $scope.allImages = response;
            $scope.filter();
            $scope.$apply();
        })
        .catch((response) => {
            console.log(response);
        })
    };

    $scope.toggleSelect = (index) => {
        $scope.images[index].selected = !$scope.images[index].selected;
    };
});

app.controller('BackToTopCtrl', ($scope) => {
    $scope.top = () => {
        $('html, body').animate({scrollTop: 0});
    };
});
