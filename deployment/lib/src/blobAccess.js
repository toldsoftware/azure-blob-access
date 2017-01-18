"use strict";
var tslib_1 = require("tslib");
var APPEND_BREAK = '\n,{},\n';
var APPEND_BREAK_ESCAPE = '\\n,{ },\\n';
function createBlobPath(containerUrl, blobName, sas) {
    return containerUrl + '/' + blobName + sas;
}
exports.createBlobPath = createBlobPath;
var BlobAccess = (function () {
    function BlobAccess(ajax) {
        this.ajax = ajax;
    }
    // getBlobMetadata(blobPath: string, metadataKeys: string[], onSuccess: (metadata: { [key: string]: string }) => void, onFail: () => void) {
    //     // GET or HEAD to https://myaccount.blob.core.windows.net/mycontainer/myblob?comp=metadata
    //     let url = blobPath + "&comp=metadata";
    //     this.ajax.ajax({
    //         url: url,
    //         type: "HEAD",
    //         // beforeSend:  (xhr) => {},
    //         success: (data, textStatus, response) => {
    //             // console.log("success " + data);
    //             let metadataValues: { [key: string]: string } = {};
    //             metadataKeys.forEach(k => {
    //                 let val = response.getResponseHeader("x-ms-meta-" + k);
    //                 if (val != null) {
    //                     metadataValues[k] = decodeURIComponent(val);
    //                 }
    //             });
    //             onSuccess(metadataValues);
    //         },
    //         error: (shr, status, data) => {
    //             // console.log("error " + data + " Status " + shr.status);
    //             onFail();
    //         },
    //         complete: () => {
    //             // console.log("end");
    //         }
    //     });
    // }
    // setBlobMetadata(blobPath: string, metadataValues: { [key: string]: string }, onSuccess: () => void, onFail: () => void) {
    //     // PUT to https://myaccount.blob.core.windows.net/mycontainer/myblob?comp=metadata
    //     // This replaces the whole metadata
    //     let url = blobPath + "&comp=metadata";
    //     this.ajax.ajax({
    //         url: url,
    //         type: "PUT",
    //         beforeSend: (xhr) => {
    //             for (let k in metadataValues) {
    //                 let value = metadataValues[k];
    //                 if (value != null && value !== "null" && value !== "undefined") {
    //                     xhr.setRequestHeader("x-ms-meta-" + k, encodeURIComponent(value));
    //                 }
    //             }
    //         },
    //         success: (data) => {
    //             // console.log("success " + data);
    //             onSuccess();
    //         },
    //         error: (shr, status, data) => {
    //             // console.log("error " + data + " Status " + shr.status);
    //             onFail();
    //         },
    //         complete: () => {
    //             // console.log("end");
    //         }
    //     });
    // }
    // deleteBlob(blobPath: string, onSuccess: () => void, onFail: () => void) {
    //     let blobSasUrl = blobPath;
    //     this.ajax.ajax({
    //         url: blobSasUrl,
    //         type: "DELETE",
    //         beforeSend: (xhr) => {
    //         },
    //         success: (data) => {
    //             // console.log("success " + data);
    //             onSuccess();
    //         },
    //         error: (shr, status, data) => {
    //             // console.log("error " + data + " Status " + shr.status);
    //             onFail();
    //         },
    //         complete: () => {
    //             // console.log("end");
    //         }
    //     });
    // }
    BlobAccess.prototype.setOrCreateBlockBlob = function (blobSasUrl, data, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.ajax.ajax({
                            url: blobSasUrl,
                            type: 'PUT',
                            data: data,
                            beforeSend: function (xhr) {
                                // Encoded in SasUrl
                                // xhr.setRequestHeader('Authorization', blobAuthorization);
                                // xhr.setRequestHeader('x-ms-date', blobDate);
                                // xhr.setRequestHeader('x-ms-version', blobMsVersion);
                                // Set by browser
                                // xhr.setRequestHeader('Content-Length', "" + requestData.length);
                                // Set Content Type (Is this needed?)
                                xhr.setRequestHeader('Content-Type', options.contentType);
                                // Set to BlockBlob
                                xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
                                // Store content type and cache control for direct access
                                if (options.contentType) {
                                    xhr.setRequestHeader('x-ms-blob-content-type', options.contentType);
                                }
                                if (options.cacheControl) {
                                    xhr.setRequestHeader('x-ms-blob-cache-control', options.cacheControl || 'public');
                                }
                            },
                            success: function (data) {
                                // console.log("success " + data);
                                resolve();
                            },
                            error: function (shr, status, data) {
                                // console.log("error " + data + " Status " + shr.status);
                                reject(status);
                            },
                            complete: function () {
                                // console.log("end");
                            }
                        });
                    })];
            });
        });
    };
    return BlobAccess;
}());
exports.BlobAccess = BlobAccess;
//# sourceMappingURL=blobAccess.js.map