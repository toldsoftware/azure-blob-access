"use strict";
var _this = this;
var tslib_1 = require("tslib");
var load_image_1 = require("./load-image");
var imageUrl = 'https://toldazureblobaccesstest.blob.core.windows.net/test/sample.jpg';
var sourceWidth = 600;
var sourceHeight = 600;
// To Orient: Orientation=8: 90° rotate left
var imageUrl_exifOrientation = 'https://toldazureblobaccesstest.blob.core.windows.net/test/ExifOrientation.jpg';
var exif_correctWidth = 1280;
var exif_correctHeight = 720;
describe('loadImage', function () {
    it('should load an image', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var img;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, load_image_1.loadImage(imageUrl)];
                case 1:
                    img = _a.sent();
                    expect(img.width).toBe(sourceWidth);
                    expect(img.height).toBe(sourceHeight);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, 3000);
    it('should load an image as a blob', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var xhr;
        return tslib_1.__generator(this, function (_a) {
            xhr = new XMLHttpRequest();
            xhr.open('GET', imageUrl);
            xhr.responseType = 'blob';
            xhr.onload = function (ev) {
                var blob = xhr.response;
                load_image_1.loadImage(blob).then(function (img) {
                    expect(img.width).toBe(sourceWidth);
                    expect(img.height).toBe(sourceHeight);
                    done();
                });
            };
            xhr.send();
            return [2 /*return*/];
        });
    }); }, 3000);
    it('should load an image with maxSize', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var img;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, load_image_1.loadImage(imageUrl, { maxWidth: 300, maxHeight: 300 })];
                case 1:
                    img = _a.sent();
                    expect(img.width).toBe(300);
                    expect(img.height).toBe(300);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, 3000);
    it('should load an image that can convert to dataUrl', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var img, dataUrl;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, load_image_1.loadImage(imageUrl, { maxWidth: 300, maxHeight: 300 })];
                case 1:
                    img = _a.sent();
                    dataUrl = img.toDataURL('image/jpeg', 0.92);
                    expect(img.width).toBe(300);
                    expect(img.height).toBe(300);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, 3000);
    it('should load an image that can convert to dataUrl and reload', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var img, dataUrl;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, load_image_1.loadImage(imageUrl, { maxWidth: 300, maxHeight: 300 })];
                case 1:
                    img = _a.sent();
                    dataUrl = img.toDataURL('image/jpeg', 0.92);
                    return [4 /*yield*/, load_image_1.loadImage(dataUrl)];
                case 2:
                    img = _a.sent();
                    expect(img.width).toBe(300);
                    expect(img.height).toBe(300);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, 3000);
    it('should load an image with corrected rotation', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var img;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, load_image_1.loadImage(imageUrl_exifOrientation)];
                case 1:
                    img = _a.sent();
                    expect(img.width).toBe(exif_correctWidth);
                    expect(img.height).toBe(exif_correctHeight);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, 3000);
});
describe('getOrientation', function () {
    it('should have no orientation for a normal image', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var orientation;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, load_image_1.getOrientation(imageUrl)];
                case 1:
                    orientation = _a.sent();
                    expect(orientation).toBe(0);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, 3000);
    it('should have an orientation for an exif rotated image', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var orientation;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, load_image_1.getOrientation(imageUrl_exifOrientation)];
                case 1:
                    orientation = _a.sent();
                    expect(orientation).toBe(8);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, 3000);
});
//# sourceMappingURL=load-image.spec.js.map