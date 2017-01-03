import { Request, ResponseBody } from '@told/azure-functions-server/lib/src';
export interface GetBlobRequest extends Request<{
    setup?: boolean;
}, {}> {
}
export interface GetBlobResponseData {
    blobUrl: string;
}
export interface GetBlobResponseBody extends ResponseBody<GetBlobResponseData> {
}
