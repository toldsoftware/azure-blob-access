import { BlobAccess } from './blob-access';
import { loadImage } from './load-image';

const DEBUG = true;

function log(message: string, ...args: any[]) {
    if (DEBUG) console.log(message, ...args);
}

// From file input element:
// <input type="file" id="file_uploader" accept="image/*;capture=camera" capture="camera">
export async function uploadImageFile(access: BlobAccess, blobSasUrl: string, fileElement: HTMLInputElement, maxWidth?: number, maxHeight?: number) {
    let file = fileElement['files'][0];
    let imageDataUri = window.URL.createObjectURL(file);
    await uploadImage(access, blobSasUrl, imageDataUri, maxWidth, maxHeight);
}

export async function uploadImage(access: BlobAccess, blobSasUrl: string, imageDataUri: string, maxWidth?: number, maxHeight?: number) {
    log('loadImage START');
    let cvs = await loadImage(imageDataUri, { maxWidth, maxHeight });
    log('loadImage END');
    log('toDataURL START');
    let contentType = 'image/jpeg';
    let resultImageUri = cvs.toDataURL(contentType, 0.92);
    log('toDataURL END');
    log('postImage START');
    await postImage(access, blobSasUrl, resultImageUri, contentType);
    log('postImage END');
}

export function uploadImage_manual(access: BlobAccess, blobSasUrl: string, imageDataUri: string, maxWidth?: number, maxHeight?: number) {
    return new Promise((resolve, reject) => {

        if (maxWidth != null) {
            log('Resize Image START');
            let contentType = 'image/jpeg';
            let img = new Image();
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = async () => {
                log('Resize Image Loaded');

                try {
                    let cvs = document.createElement('canvas');
                    let ctx = cvs.getContext('2d');

                    let aspectRatio = maxHeight == null ? img.width / img.height : maxWidth / maxHeight;
                    let scale = maxHeight == null ? maxWidth / img.width : Math.min(maxWidth / img.width, maxHeight / img.height);
                    if (scale > 1) { scale = 1; }

                    let w = Math.round(img.width * scale);
                    let h = Math.round(img.height * scale);

                    cvs.width = w;
                    cvs.height = h;

                    ctx.drawImage(img, 0, 0, w, h);

                    log('Resize Image Drawn', 'w=', w, 'h=', h, 'maxWidth=', maxWidth, 'maxHeight=', maxHeight);
                    imageDataUri = cvs.toDataURL(contentType, 0.92);
                    log('Resize Image END', 'imageDataUri.length=', imageDataUri.length);
                }
                catch (err) {
                    reject('The Image failed to Upload:' + err);
                    return;
                }

                log('Post Image START');
                await postImage(access, blobSasUrl, imageDataUri, contentType);
                log('Post Image END');

                resolve();
            };
            img.src = imageDataUri;
        } else {
            postImage(access, blobSasUrl, imageDataUri)
                .then(() => resolve).catch(err => reject(err));;
        }
    });
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