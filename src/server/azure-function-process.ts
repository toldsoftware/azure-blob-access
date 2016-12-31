export interface Request {
    query: any;
    body: any;
}

export interface Response {
    status?: number;
    headers?: { "content-type"?: string };
    body: string;
}

export interface Context {
    log(text: string): void;
    done(u?: any, response?: Response): void;
    res: Response;
}