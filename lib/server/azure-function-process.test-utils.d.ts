import * as P from "./azure-function-process";
export declare function getResponse<T, TQuery, TBody>(main: P.MainEntryPoint<T, TQuery, TBody>, query?: TQuery, body?: TBody): Promise<P.Response<T>>;
