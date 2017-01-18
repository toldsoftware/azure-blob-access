"use strict";
var tslib_1 = require("tslib");
var DEBUG = true;
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
function uploadImageFile(access, blobSasUrl, fileElement, maxWidth, maxHeight) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var file, imageDataUri;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = fileElement['files'][0];
                    imageDataUri = window.URL.createObjectURL(file);
                    return [4 /*yield*/, uploadImage(access, blobSasUrl, imageDataUri, maxWidth, maxHeight)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.uploadImageFile = uploadImageFile;
function uploadImage(access, blobSasUrl, imageDataUri, maxWidth, maxHeight) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        if (maxWidth != null) {
            log('Resize Image START');
            var contentType_1 = 'image/jpeg';
            var img_1 = new Image();
            img_1.setAttribute('crossOrigin', 'anonymous');
            img_1.onload = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var cvs, ctx, aspectRatio, scale, w, h;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            log('Resize Image Loaded');
                            try {
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
                                log('Resize Image Drawn');
                                imageDataUri = cvs.toDataURL(contentType_1, 0.92);
                                log('Resize Image END');
                            }
                            catch (err) {
                                reject('The Image failed to Upload:' + err);
                                return [2 /*return*/];
                            }
                            log('Post Image START');
                            return [4 /*yield*/, postImage(access, blobSasUrl, imageDataUri, contentType_1)];
                        case 1:
                            _a.sent();
                            log('Post Image END');
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); };
            img_1.src = imageDataUri;
        }
        else {
            postImage(access, blobSasUrl, imageDataUri)
                .then(function () { return resolve; }).catch(function (err) { return reject(err); });
            ;
        }
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