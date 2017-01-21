declare let require: any;
const blueImpLoadImage = require('blueimp-load-image-npm') as LoadImageMethod;

export type ImageFile = string | Blob | File;
type LoadImageMethod = (file: ImageFile, callback: (img: HTMLImageElement | HTMLCanvasElement) => void, options: LoadImageOptions_Inner) => void;

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

interface LoadImageOptions_Inner extends LoadImageOptions {
    crossOrigin?: boolean;
    canvas?: boolean;
    orientation?: boolean;
    meta?: boolean;
}

export function loadImage(file: ImageFile, options?: LoadImageOptions): Promise<HTMLCanvasElement> {

    let optionsInner: LoadImageOptions_Inner = options || {};

    optionsInner.crossOrigin = true;

    // Orientation true makese canvas and meta true also
    optionsInner.orientation = true;
    optionsInner.canvas = true;
    optionsInner.meta = true;

    return new Promise<HTMLCanvasElement>((resolve, reject) => {
        blueImpLoadImage(file, (img) => resolve(img as HTMLCanvasElement), optionsInner);
    });
}