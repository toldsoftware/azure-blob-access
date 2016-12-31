export interface AjaxProvider {
    ajax(settings: AjaxSettings): void;
}
export interface XHR {
    setRequestHeader(header: string, value: string): void;
    getResponseHeader(header: string): string;
}
export interface AjaxSettings {
    url: string;
    type: "GET" | "POST" | "PUT" | "DELETE" | "HEAD";
    data?: string;
    beforeSend?(xhr: XHR): void;
    success?(data: string, textStatus: string, xhr: XHR): void;
    error?(xhr: XHR, textStatus: string, errorThrown: string): void;
    complete?(): void;
}
