"use strict";
var tslib_1 = require("tslib");
var APPEND_BREAK = '\n,{},\n';
var APPEND_BREAK_ESCAPE = '\\n,{ },\\n';
function createBlobPath(containerUrl, blobName, sas) {
    return containerUrl + '/' + blobName + sas;
}
exports.createBlobPath = createBlobPath;
var BlobAccess = (function () {
    function BlobAccess(http) {
        this.http = http;
    }
    BlobAccess.prototype.setOrCreateBlockBlob = function (blobSasUrl, data, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            'x-ms-blob-type': 'BlockBlob',
                            'x-ms-blob-cache-control': options.cacheControl || 'public'
                        };
                        if (options.contentType) {
                            headers['Content-Type'] = options.contentType;
                            headers['x-ms-blob-content-type'] = options.contentType;
                        }
                        // console.log('setOrCreateBlockBlob', 'data.length=', data.length, 'headers=', headers);
                        return [4 /*yield*/, this.http.request(blobSasUrl, 'PUT', data, headers)];
                    case 1:
                        // console.log('setOrCreateBlockBlob', 'data.length=', data.length, 'headers=', headers);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BlobAccess;
}());
exports.BlobAccess = BlobAccess;
//# sourceMappingURL=blob-access.js.map