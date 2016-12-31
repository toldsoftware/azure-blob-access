import { Context, Request, Response } from "./azure-function-process";

export function main(context: Context, request: Request) {
    context.log("JavaScript HTTP trigger function processed a request.");

    let response: Response = null;

    if (request.query.name || (request.body && request.body.name)) {
        response = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (request.query.name || request.body.name)
        };
    }
    else {
        response = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done(null, response);
}