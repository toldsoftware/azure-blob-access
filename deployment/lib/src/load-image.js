"use strict";
var tslib_1 = require("tslib");
var blueImpLoadImage = require('blueimp-load-image');
var DEBUG = true;
function loadImage(file, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof file === 'string'))
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, loadImage_string(file, options)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, loadImage_file(file, options)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.loadImage = loadImage;
function loadImage_string(imageUrl, options) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', imageUrl);
        xhr.responseType = 'blob';
        xhr.onload = function (ev) {
            var blobData = xhr.response;
            loadImage_file(blobData, options).then(function (x) {
                resolve(x);
            });
        };
        xhr.send();
    });
}
function loadImage_file(file, options) {
    // export function loadImage(file: ImageFile, options?: LoadImageOptions): Promise<HTMLCanvasElement> {
    var optionsInner = options || {};
    optionsInner.crossOrigin = true;
    // Orientation true makes canvas and meta true also
    optionsInner.orientation = true;
    optionsInner.canvas = true;
    optionsInner.meta = true;
    return new Promise(function (resolve, reject) {
        blueImpLoadImage(file, function (img, meta) {
            // if (DEBUG) {
            //     let orientation = (meta.exif && meta.exif.get('Orientation'));
            //     console.log('orientation=', orientation);
            // }
            resolve(img);
        }, optionsInner);
    });
}
function getOrientation(file) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof file === 'string'))
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, getOrientation_string(file)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, getOrientation_file(file)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getOrientation = getOrientation;
function getOrientation_string(imageUrl) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', imageUrl);
        xhr.responseType = 'blob';
        xhr.onload = function (ev) {
            var blobData = xhr.response;
            getOrientation_file(blobData).then(function (orientation) {
                resolve(orientation);
            });
        };
        xhr.send();
    });
}
function getOrientation_file(file) {
    return new Promise(function (resolve, reject) {
        blueImpLoadImage.parseMetaData(file, function (data) {
            if (!data.exif) {
                resolve(0);
                return;
            }
            var orientation = data.exif.get('Orientation');
            resolve(orientation);
        });
    });
}
//# sourceMappingURL=load-image.js.map