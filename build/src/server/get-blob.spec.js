"use strict";
var P = require("./azure-function-process.test");
var get_blob_1 = require("./get-blob");
var host = "https://localhost:9876";
describe("getBlob", function () {
    it("should return a url", function (done) {
        P.getResponse(get_blob_1.main).then(function (r) {
            console.log(r.body.data);
            expect(r.body.data).toMatch(/^https?:\/\//);
            done();
        }).catch(fail);
    }, 10);
    // should return a new block blob url
    // should return a writtable block blob url
    // should return a writtable and readable block blob url
    // should return an empty append blob url
    // should return an appendable append blob url
    // should return an appendable and readable append blob url
});
//# sourceMappingURL=get-blob.spec.js.map