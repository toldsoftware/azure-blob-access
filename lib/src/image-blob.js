"use strict";
var tslib_1 = require("tslib");
var load_image_1 = require("./load-image");
var DEBUG = false;
function log(message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (DEBUG)
        console.log.apply(console, [message].concat(args));
}
// From file input element:
// <input type="file" id="file_uploader" accept="image/*;capture=camera" capture="camera">
function uploadImageFile(access, blobSasUrl, fileElement, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var file, imageDataUri;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = fileElement['files'][0];
                    imageDataUri = window.URL.createObjectURL(file);
                    return [4 /*yield*/, uploadImage(access, blobSasUrl, imageDataUri, options)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.uploadImageFile = uploadImageFile;
function uploadImage(access, blobSasUrl, imageDataUri, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cvs, contentType, resultImageUri;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log('loadImage START');
                    return [4 /*yield*/, load_image_1.loadImage(imageDataUri, options)];
                case 1:
                    cvs = _a.sent();
                    log('loadImage END');
                    log('toDataURL START');
                    contentType = 'image/jpeg';
                    resultImageUri = cvs.toDataURL(contentType, 0.92);
                    log('toDataURL END');
                    log('postImage START');
                    return [4 /*yield*/, postImage(access, blobSasUrl, resultImageUri, contentType)];
                case 2:
                    _a.sent();
                    log('postImage END');
                    return [2 /*return*/];
            }
        });
    });
}
exports.uploadImage = uploadImage;
function postImage(access, sasUrl, imageDataUrl, contentType) {
    if (contentType === void 0) { contentType = 'image/jpeg'; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = convertImageDataUrlToBytes(imageDataUrl);
                    return [4 /*yield*/, access.setOrCreateBlockBlob(sasUrl, data, { contentType: contentType })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.postImage = postImage;
function convertImageDataUrlToBytes(dataURI) {
    var bytes = null;
    try {
        bytes = dataURItoUint8Array(dataURI);
    }
    catch (e) {
        log('FAIL convertImageDataUrlToRawData', 'err' + JSON.stringify(e));
        throw e;
    }
    return bytes;
}
exports.convertImageDataUrlToBytes = convertImageDataUrlToBytes;
function convertImageDataUrlToBlob(dataURI, imageType) {
    var b = null;
    try {
        b = dataURItoBlob(dataURI, imageType);
    }
    catch (e) {
        log('FAIL convertImageDataUrlToBlob', 'err' + JSON.stringify(e));
        throw e;
    }
    return b;
}
exports.convertImageDataUrlToBlob = convertImageDataUrlToBlob;
function dataURItoUint8Array(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return ia;
}
var ImageType;
(function (ImageType) {
    ImageType[ImageType["Jpeg"] = 0] = "Jpeg";
    ImageType[ImageType["Png"] = 1] = "Png";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
function dataURItoBlob(dataURI, imageType) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var type = imageType === ImageType.Jpeg ? 'image/jpeg' : 'image/png';
    return new Blob([ab], { type: type });
}
//# sourceMappingURL=image-blob.js.map