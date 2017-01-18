"use strict";
var tslib_1 = require("tslib");
// From file input element:
// <input type="file" id="file_uploader" accept="image/*;capture=camera" capture="camera">
function uploadImageFile(access, blobSasUrl, fileElement, maxWidth, maxHeight) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        var file, imageDataUri, img_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = fileElement['files'][0];
                    imageDataUri = window.URL.createObjectURL(file);
                    if (!(maxWidth != null))
                        return [3 /*break*/, 1];
                    img_1 = new Image();
                    img_1.onload = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var cvs, ctx, aspectRatio, scale, w, h;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    cvs = document.createElement('canvas');
                                    ctx = cvs.getContext('2d');
                                    aspectRatio = maxHeight == null ? img_1.width / img_1.height : maxWidth / maxHeight;
                                    scale = maxHeight == null ? img_1.width / maxWidth : Math.min(img_1.width / maxWidth, img_1.height / maxHeight);
                                    if (scale > 1) {
                                        scale = 1;
                                    }
                                    w = Math.round(img_1.width * scale);
                                    h = Math.round(img_1.height * scale);
                                    cvs.width = w;
                                    cvs.height = h;
                                    ctx.drawImage(img_1, 0, 0, w, h);
                                    imageDataUri = cvs.toDataURL('image/jpeg', 0.92);
                                    return [4 /*yield*/, postImage(access, blobSasUrl, imageDataUri)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    img_1.src = imageDataUri;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, postImage(access, blobSasUrl, imageDataUri)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.uploadImageFile = uploadImageFile;
function postImage(access, sasUrl, imageDataUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = convertImageDataUrlToBytes(imageDataUrl);
                    return [4 /*yield*/, access.setOrCreateBlockBlob(sasUrl, data, { contentType: 'image/jpeg' })];
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
        console.log('FAIL convertImageDataUrlToRawData', 'err' + JSON.stringify(e));
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
        console.log('FAIL convertImageDataUrlToBlob', 'err' + JSON.stringify(e));
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
//# sourceMappingURL=imageBlob.js.map