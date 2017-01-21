"use strict";
var _this = this;
var tslib_1 = require("tslib");
var blob_access_1 = require("./blob-access");
var image_blob_1 = require("./image-blob");
var lib_1 = require("@told/platform/lib");
// let host = "http://localhost:9876";
var host = 'http://azure-blob-access-test.azurewebsites.net/api/get-blob';
var imageUrl = 'https://toldazureblobaccesstest.blob.core.windows.net/test/sample.jpg';
var timeout = 10000;
describe('uploadImage', function () {
    lib_1.setupBrowser();
    var http = lib_1.Platform.http();
    it('should get a blob url', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var r, responseObj, blobSasUrl, blobUrl, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, http.request(host)];
                case 1:
                    r = _a.sent();
                    responseObj = JSON.parse(r.data);
                    blobSasUrl = responseObj.data.urls[0].blobSasUrl;
                    blobUrl = responseObj.data.urls[0].blobUrl;
                    expect(blobSasUrl).toMatch(/^https?:\/\//);
                    expect(blobUrl).toMatch(/^https?:\/\//);
                    done();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    fail();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it('should upload an image', function (done) {
        var go = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var r, responseObj, blobSasUrl, blobUrl, access, img_1, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        // Get Blob Sas Url
                        console.log('Get Blob Sas Url START');
                        return [4 /*yield*/, http.request(host)];
                    case 1:
                        r = _a.sent();
                        responseObj = JSON.parse(r.data);
                        blobSasUrl = responseObj.data.urls[0].blobSasUrl;
                        blobUrl = responseObj.data.urls[0].blobUrl;
                        console.log('Get Blob Sas Url START');
                        // Upload image
                        console.log('Upload Image START');
                        access = new blob_access_1.BlobAccess(http);
                        return [4 /*yield*/, image_blob_1.uploadImage(access, blobSasUrl, imageUrl, { maxWidth: 300, maxHeight: 300 })];
                    case 2:
                        _a.sent();
                        console.log('Upload Image END');
                        // Load Uploaded Image
                        console.log('Load Uploaded Image START');
                        img_1 = new Image();
                        img_1.onload = function () {
                            expect(img_1.width).toBe(300);
                            expect(img_1.height).toBe(300);
                            console.log('Load Uploaded Image END');
                            done();
                        };
                        img_1.onerror = function () { return fail(); };
                        img_1.src = blobUrl;
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        fail();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        go().then();
    }, timeout);
    // should return a new block blob url
    // should return a writtable block blob url
    // should return a writtable and readable block blob url
    // should return an empty append blob url
    // should return an appendable append blob url
    // should return an appendable and readable append blob url
});
//# sourceMappingURL=image-blob.client.spec.js.map