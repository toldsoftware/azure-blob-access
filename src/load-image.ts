declare let require: any;
const blueImpLoadImage = require('blueimp-load-image') as LoadImageMethod;

export type ImageFile = string | Blob | File;
type LoadImageMethod = (file: ImageFile, callback: (img: HTMLImageElement | HTMLCanvasElement, meta: any) => void, options: LoadImageOptions_Inner) => void;

const DEBUG = true;

// Add More Options from Here: https://github.com/blueimp/JavaScript-Load-Image#options
export interface LoadImageOptions {
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    contain?: boolean;
    cover?: boolean;
    crop?: boolean;
}

// tslint:disable-next-line:class-name
interface LoadImageOptions_Inner extends LoadImageOptions {
    crossOrigin?: boolean;
    canvas?: boolean;
    orientation?: boolean;
    meta?: boolean;
}

export async function loadImage(file: ImageFile, options?: LoadImageOptions) {
    if (typeof file === 'string') {
        return await loadImage_string(file, options);
    } else {
        return await loadImage_file(file, options);
    }
}

function loadImage_string(imageUrl: string, options?: LoadImageOptions): Promise<HTMLCanvasElement> {
    return new Promise<HTMLCanvasElement>((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', imageUrl);
        xhr.responseType = 'blob';
        xhr.onload = (ev) => {
            let blobData = xhr.response;
            loadImage_file(blobData, options).then(x => {
                resolve(x);
            });
        };
        xhr.send();
    });
}

function loadImage_file(file: Blob | File, options?: LoadImageOptions): Promise<HTMLCanvasElement> {
// export function loadImage(file: ImageFile, options?: LoadImageOptions): Promise<HTMLCanvasElement> {

    let optionsInner: LoadImageOptions_Inner = options || {};

    optionsInner.crossOrigin = true;

    // Orientation true makes canvas and meta true also
    optionsInner.orientation = true;
    optionsInner.canvas = true;
    optionsInner.meta = true;

    return new Promise<HTMLCanvasElement>((resolve, reject) => {
        blueImpLoadImage(file, (img, meta) => {

            // if (DEBUG) {
            //     let orientation = (meta.exif && meta.exif.get('Orientation'));
            //     console.log('orientation=', orientation);
            // }

            resolve(img as HTMLCanvasElement);
        }, optionsInner);
    });
}

export async function getOrientation(file: ImageFile) {
    if (typeof file === 'string') {
        return await getOrientation_string(file);
    } else {
        return await getOrientation_file(file);
    }
}

function getOrientation_string(imageUrl: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', imageUrl);
        xhr.responseType = 'blob';
        xhr.onload = (ev) => {
            let blobData = xhr.response;
            getOrientation_file(blobData).then(orientation => {
                resolve(orientation);
            });
        };
        xhr.send();
    });
}

function getOrientation_file(file: Blob | File): Promise<number> {

    return new Promise<number>((resolve, reject) => {
        (blueImpLoadImage as any).parseMetaData(file, (data: any) => {
            if (!data.exif) { resolve(0); return; }
            let orientation = data.exif.get('Orientation');
            resolve(orientation);
        });
    });
}