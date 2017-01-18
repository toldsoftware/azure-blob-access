import { HttpClient } from '@told/platform/lib';
export interface BlockBlobOptions {
    contentType?: string;
    cacheControl?: string;
}
export declare function createBlobPath(containerUrl: string, blobName: string, sas: string): string;
export declare class BlobAccess {
    private http;
    constructor(http: HttpClient);
    setOrCreateBlockBlob(blobSasUrl: string, data: any, options: BlockBlobOptions): Promise<void>;
}
