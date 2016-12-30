import { AjaxProvider } from "./ajaxProvider";

const APPEND_BREAK = "\n,{},\n";
const APPEND_BREAK_ESCAPE = "\\n,{ },\\n";

export interface BlockBlobOptions {
    contentType?: string;
    cacheControl?: string;
}

export function createBlobPath(containerUrl: string, blobName: string, sas: string) {
    return containerUrl + "/" + blobName + sas;
}

export class BlobAccess {
    constructor(private ajax: AjaxProvider) {

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

    // setOrCreateBlockBlob(blobSasUrl: string, data: string, options: BlockBlobOptions, onSuccess: () => void, onFail: () => void) {

    //     this.ajax.ajax({
    //         url: blobSasUrl,
    //         type: "PUT",
    //         data: data,
    //         beforeSend: (xhr) => {
    //             // Encoded in SasUrl
    //             // xhr.setRequestHeader('Authorization', blobAuthorization);
    //             // xhr.setRequestHeader('x-ms-date', blobDate);
    //             // xhr.setRequestHeader('x-ms-version', blobMsVersion);

    //             // Set by browser
    //             // xhr.setRequestHeader('Content-Length', "" + requestData.length);

    //             // Set above
    //             // xhr.setRequestHeader('Content-Type', "image/png");

    //             // Set to BlockBlob
    //             xhr.setRequestHeader("x-ms-blob-type", "BlockBlob");

    //             // Store content type and cache control for direct access
    //             if (options.contentType) { xhr.setRequestHeader("x-ms-blob-content-type", options.contentType); }
    //             if (options.cacheControl) { xhr.setRequestHeader("x-ms-blob-cache-control", options.cacheControl || "public"); }
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

    // createAppendBlob(blobPath: string, onSuccess: () => void, onFail: () => void) {
    //     this.ajax.ajax({
    //         url: blobPath,
    //         type: "PUT",
    //         beforeSend: (xhr) => {
    //             xhr.setRequestHeader("x-ms-blob-type", "AppendBlob");
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

    // appendToBlob(blobPath: string, data: string, onSuccess: () => void, onFail: () => void) {

    //     let dataFormatted = data.replace(new RegExp(APPEND_BREAK, "g"), APPEND_BREAK_ESCAPE) + APPEND_BREAK;

    //     this.ajax.ajax({
    //         url: blobPath + "&comp=appendblock",
    //         type: "PUT",
    //         data: dataFormatted,
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

    // getBlob(blobPath: string, onSuccess: (data: any) => void, onFail: () => void) {

    //     let blobSasUrl = blobPath;

    //     this.ajax.ajax({
    //         url: blobSasUrl,
    //         type: "GET",
    //         success: (data) => {
    //             // console.log("success " + data);
    //             onSuccess(data);
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

    // getBlobAppends(blobPath: string, onSuccess: (appends: string[]) => void, onFail: () => void) {

    //     let blobSasUrl = blobPath;

    //     this.ajax.ajax({
    //         url: blobSasUrl,
    //         type: "GET",
    //         success: (data) => {
    //             // console.log("success " + data);

    //             let appends = data.split(APPEND_BREAK);
    //             appends = appends.map(d => d.replace(new RegExp(APPEND_BREAK_ESCAPE, "g"), APPEND_BREAK));

    //             onSuccess(appends);
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
}