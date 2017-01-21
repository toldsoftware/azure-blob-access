import { BlobAccess } from './blob-access';
import { loadImage, LoadImageOptions } from './load-image';

const DEBUG = false;

function log(message: string, ...args: any[]) {
    if (DEBUG) console.log(message, ...args);
}

// From file input element:
// <input type="file" id="file_uploader" accept="image/*;capture=camera" capture="camera">
export async function uploadImageFile(access: BlobAccess, blobSasUrl: string, fileElement: HTMLInputElement, options?: LoadImageOptions) {
    let file = fileElement['files'][0];
    let imageDataUri = window.URL.createObjectURL(file);
    await uploadImage(access, blobSasUrl, imageDataUri, options);
}

export async function uploadImage(access: BlobAccess, blobSasUrl: string, imageDataUri: string, options?: LoadImageOptions) {
    log('loadImage START');
    let cvs = await loadImage(imageDataUri, options);
    log('loadImage END');
    log('toDataURL START');
    let contentType = 'image/jpeg';
    let resultImageUri = cvs.toDataURL(contentType, 0.92);
    log('toDataURL END');
    log('postImage START');
    await postImage(access, blobSasUrl, resultImageUri, contentType);
    log('postImage END');
}

export async function postImage(access: BlobAccess, sasUrl: string, imageDataUrl: string, contentType: string = 'image/jpeg') {
    let data = convertImageDataUrlToBytes(imageDataUrl);
    await access.setOrCreateBlockBlob(sasUrl, data, { contentType });
}

export function convertImageDataUrlToBytes(dataURI: string): Uint8Array {
    let bytes: Uint8Array = null;

    try {
        bytes = dataURItoUint8Array(dataURI);
    } catch (e) {
        log('FAIL convertImageDataUrlToRawData', 'err' + JSON.stringify(e));
        throw e;
    }

    return bytes;
}

export function convertImageDataUrlToBlob(dataURI: string, imageType: ImageType): Blob {
    let b: Blob = null;

    try {
        b = dataURItoBlob(dataURI, imageType);
    } catch (e) {
        log('FAIL convertImageDataUrlToBlob', 'err' + JSON.stringify(e));
        throw e;
    }

    return b;
}

function dataURItoUint8Array(dataURI: string): Uint8Array {
    let byteString = atob(dataURI.split(',')[1]);
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return ia;
}

export enum ImageType {
    Jpeg,
    Png
}

function dataURItoBlob(dataURI: string, imageType: ImageType): Blob {
    let byteString = atob(dataURI.split(',')[1]);
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    let type = imageType === ImageType.Jpeg ? 'image/jpeg' : 'image/png';
    return new Blob([ab], { type: type });
}