import { Request, ResponseBody } from "./azure-function-process";

export interface GetBlobRequest extends Request<{ setup?: boolean }, {}> {
}

export interface GetBlobResponseData {
    blobUrl: string;
}

export interface GetBlobResponseBody extends ResponseBody<GetBlobResponseData> { }