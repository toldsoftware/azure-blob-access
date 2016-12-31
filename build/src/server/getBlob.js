"use strict";
function main(context, request) {
    context.log("JavaScript HTTP trigger function processed a request.");
    var response = null;
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
exports.main = main;
//# sourceMappingURL=getBlob.js.map