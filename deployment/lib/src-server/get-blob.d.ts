import { Context } from '@told/azure-functions-server/lib/src';
import { GetBlobResponseData, GetBlobRequest } from './../src/get-blob.model';
export declare function main(context: Context<GetBlobResponseData>, request: GetBlobRequest): void;
