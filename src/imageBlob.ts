import { BlobAccess } from './blobAccess';

// From file input element:
// <input type="file" id="file_uploader" accept="image/*;capture=camera" capture="camera">
export async function uploadImageFile(access: BlobAccess, blobSasUrl: string, fileElement: HTMLInputElement, maxWidth?: number, maxHeight?: number) {
    let file = fileElement['files'][0];
    let imageDataUri = window.URL.createObjectURL(file);

    if (maxWidth != null) {
        let img = new Image();
        img.onload = async () => {
            let cvs = document.createElement('canvas');
            let ctx = cvs.getContext('2d');

            let aspectRatio = maxHeight == null ? img.width / img.height : maxWidth / maxHeight;
            let scale = maxHeight == null ? img.width / maxWidth : Math.min(img.width / maxWidth, img.height / maxHeight);
            if (scale > 1) { scale = 1; }

            let w = Math.round(img.width * scale);
            let h = Math.round(img.height * scale);

            cvs.width = w;
            cvs.height = h;

            ctx.drawImage(img, 0, 0, w, h);
            imageDataUri = cvs.toDataURL('image/jpeg', 0.92);
            await postImage(access, blobSasUrl, imageDataUri);
        };
        img.src = imageDataUri;
    } else {
        await postImage(access, blobSasUrl, imageDataUri);
    }
}


export async function postImage(access: BlobAccess, sasUrl: string, imageDataUrl: string) {
    let data = convertImageDataUrlToBytes(imageDataUrl);
    await access.setOrCreateBlockBlob(sasUrl, data, { contentType: 'image/jpeg' });
}

export function convertImageDataUrlToBytes(dataURI: string): Uint8Array {
    let bytes: Uint8Array = null;

    try {
        bytes = dataURItoUint8Array(dataURI);
    } catch (e) {
        console.log('FAIL convertImageDataUrlToRawData', 'err' + JSON.stringify(e));
        throw e;
    }

    return bytes;
}

export function convertImageDataUrlToBlob(dataURI: string, imageType: ImageType): Blob {
    let b: Blob = null;

    try {
        b = dataURItoBlob(dataURI, imageType);
    } catch (e) {
        console.log('FAIL convertImageDataUrlToBlob', 'err' + JSON.stringify(e));
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