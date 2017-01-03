"use strict";
var azure_storage_1 = require("azure-storage");
;
var guid = require('node-uuid').v1;
function main(context, request) {
    context.log('START', 'request.query', request.query);
    var containerName = 'user-storage';
    var blobName = '' + guid();
    // Uses env.AZURE_STORAGE_CONNECTION_STRING
    var service = azure_storage_1.createBlobService();
    // One-time setup
    if (request.query.setup) {
        // Ensure container exists
        service.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, function (error, result, response) {
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
    context.done(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/javascript',
            'X-Told-Test-Header': 'test-header',
        },
        body: {
            ok: true,
            data: { blobUrl: blobUrl },
        }
    });
    context.log('END blobUrl', blobUrl);
}
exports.main = main;
//# sourceMappingURL=get-blob.js.map