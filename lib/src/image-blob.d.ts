import { BlobAccess } from './blob-access';
export declare function uploadImageFile(access: BlobAccess, blobSasUrl: string, fileElement: HTMLInputElement, maxWidth?: number, maxHeight?: number): Promise<void>;
export declare function uploadImage(access: BlobAccess, blobSasUrl: string, imageDataUri: string, maxWidth?: number, maxHeight?: number): Promise<void>;
export declare function uploadImage_manual(access: BlobAccess, blobSasUrl: string, imageDataUri: string, maxWidth?: number, maxHeight?: number): Promise<{}>;
export declare function postImage(access: BlobAccess, sasUrl: string, imageDataUrl: string, contentType?: string): Promise<void>;
export declare function convertImageDataUrlToBytes(dataURI: string): Uint8Array;
export declare function convertImageDataUrlToBlob(dataURI: string, imageType: ImageType): Blob;
export declare enum ImageType {
    Jpeg = 0,
    Png = 1,
}
