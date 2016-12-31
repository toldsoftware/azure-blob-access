"use strict";
var azure_storage_1 = require("azure-storage");
;
var guid = require("node-uuid").v1;
function main(context, request) {
    var containerName = "user-storage";
    var blobName = "" + guid();
    var service = azure_storage_1.createBlobService("DefaultEndpointsProtocol=https;AccountName=toldazureblobaccesstest;AccountKey=sxoC66QPFJgWwkXTUIzER55xd7FMkYxudMhIlPaAbhQ258p5zwCeU0fviweRz6bVh7gFN7xyJkoyH7ZY85REAQ==;");
    // One-time setup
    if (request.query.setup) {
        // Ensure container exists
        service.createContainerIfNotExists(containerName, { publicAccessLevel: "blob" }, function (error, result, response) {
            if (!error) {
            }
        });
    }
    var sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: azure_storage_1.BlobUtilities.SharedAccessPermissions.READ + azure_storage_1.BlobUtilities.SharedAccessPermissions.WRITE,
        },
    };
    var blobSas = service.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
    var blobUrl = service.getUrl(containerName, blobName, blobSas);
    console.log("blobUrl", blobUrl);
    context.done(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/javascript",
        },
        body: {
            ok: true,
            data: { blobUrl: blobUrl },
        }
    });
}
exports.main = main;
//# sourceMappingURL=get-blob.js.map