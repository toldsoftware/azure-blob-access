export interface Request<TQuery, TBody> {
    query: TQuery;
    body: TBody;
}

export interface Response<T> {
    status?: number;
    headers?: { "content-type"?: string };
    body: ResponseBody<T>;
}

export interface ResponseBody<T> {
    ok: boolean;
    data?: T;
    errors?: string[];
}

export interface Context<T> {
    log(text: string): void;
    done(u?: any, response?: Response<T>): void;
}

export type MainEntryPoint<T, TQuery, TBody> = (context: Context<T>, request: Request<TQuery, TBody>) => void;

