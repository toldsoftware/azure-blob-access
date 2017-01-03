"use strict";
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
    return BlobAccess;
}());
exports.BlobAccess = BlobAccess;
//# sourceMappingURL=blobAccess.js.map