import { createBlobService, BlobUtilities } from "azure-storage";

import { Context, Request, Response, MainEntryPoint } from "./../src/azure-function-process";
import { GetBlobResponseData, GetBlobRequest } from "./../src/get-blob.model";

declare var require: any;
interface Guid extends String { };
let guid = require("node-uuid").v1 as () => Guid;

export function main(context: Context<GetBlobResponseData>, request: GetBlobRequest) {

    let containerName = "user-storage";
    let blobName = "" + guid();

    let service = createBlobService("DefaultEndpointsProtocol=https;AccountName=toldazureblobaccesstest;AccountKey=sxoC66QPFJgWwkXTUIzER55xd7FMkYxudMhIlPaAbhQ258p5zwCeU0fviweRz6bVh7gFN7xyJkoyH7ZY85REAQ==;");

    // One-time setup
    if (request.query.setup) {

        // Ensure container exists
        service.createContainerIfNotExists(containerName, { publicAccessLevel: "blob" }, (error, result, response) => {
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

    console.log("blobUrl", blobUrl);

    context.done(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/javascript",
        },
        body: {
            ok: true,
            data: { blobUrl },
        }
    });
}