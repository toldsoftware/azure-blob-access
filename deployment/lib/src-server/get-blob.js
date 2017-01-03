"use strict";
var tslib_1 = require("tslib");
var azure_storage_1 = require("azure-storage");
;
var guid = require('node-uuid').v1;
function main(context, request) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var containerName, blobName, service, sharedAccessPolicy, blobSas, blobUrl;
        return tslib_1.__generator(this, function (_a) {
            context.log('START', 'request.query', request.query);
            containerName = 'user-storage';
            blobName = '' + guid();
            service = azure_storage_1.createBlobService();
            // One-time setup
            if (request.query.setup) {
                // Ensure container exists
                service.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, function (error, result, response) {
                    if (!error) {
                    }
                });
            }
            sharedAccessPolicy = {
                AccessPolicy: {
                    Permissions: azure_storage_1.BlobUtilities.SharedAccessPermissions.READ + azure_storage_1.BlobUtilities.SharedAccessPermissions.WRITE,
                },
            };
            blobSas = service.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
            blobUrl = service.getUrl(containerName, blobName, blobSas);
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
            return [2 /*return*/];
        });
    });
}
exports.main = main;
//# sourceMappingURL=get-blob.js.map