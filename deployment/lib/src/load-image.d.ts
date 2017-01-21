export declare type ImageFile = string | Blob | File;
export interface LoadImageOptions {
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    contain?: boolean;
    cover?: boolean;
    crop?: boolean;
}
export declare function loadImage(file: ImageFile, options?: LoadImageOptions): Promise<HTMLCanvasElement>;
