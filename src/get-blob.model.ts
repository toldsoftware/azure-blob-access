import { Request, ResponseBody } from '@told/azure-functions-server/lib/src';

export interface GetBlobRequest extends Request<{ setup?: boolean, suffixesCsv?: string }, {}> {
}

export interface GetBlobResponseData {
    urls: {
        blobUrl: string;
        blobSasUrl: string;
    }[];
}

export interface GetBlobResponseBody extends ResponseBody<GetBlobResponseData> { }