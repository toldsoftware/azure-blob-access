import { createBlobService, BlobUtilities } from 'azure-storage';

import { Context, Request, Response, MainEntryPoint } from '@told/azure-functions-server/lib/src';
import { GetBlobResponseData, GetBlobRequest } from './../src/get-blob.model';

declare var require: any;
interface Guid extends String { };
let guid = require('node-uuid').v1 as () => Guid;

export async function main(context: Context<GetBlobResponseData>, request: GetBlobRequest) {
    context.log('START',
        'request.query', request.query
    );

    let containerName = 'user-storage';
    let blobName = '' + guid();

    // Uses env.AZURE_STORAGE_CONNECTION_STRING
    let service = createBlobService();

    // One-time setup
    if (request.query.setup) {

        // Ensure container exists
        service.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, (error, result, response) => {
            if (!error) {
            }
        });
    }

    let sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: BlobUtilities.SharedAccessPermissions.READ + BlobUtilities.SharedAccessPermissions.WRITE,
        },
    };

    let blobSas = service.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
    let blobUrl = service.getUrl(containerName, blobName, blobSas);

    context.done(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/javascript',
            'X-Told-Test-Header': 'test-header',
        },
        body: {
            ok: true,
            data: { blobUrl },
        }
    });

    context.log('END blobUrl', blobUrl);
}