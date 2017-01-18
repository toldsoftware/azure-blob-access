import { AjaxProvider } from './ajaxProvider';
export interface BlockBlobOptions {
    contentType?: string;
    cacheControl?: string;
}
export declare function createBlobPath(containerUrl: string, blobName: string, sas: string): string;
export declare class BlobAccess {
    private ajax;
    constructor(ajax: AjaxProvider);
    setOrCreateBlockBlob(blobSasUrl: string, data: any, options: BlockBlobOptions): Promise<{}>;
}
