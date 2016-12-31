"use strict";
var lib_1 = require("@told/platform/lib");
var host = "http://localhost:9876";
describe("getBlob", function () {
    lib_1.setupBrowser();
    var http = lib_1.Platform.http();
    it("should return a url", function (done) {
        http.request(host).then(function (r) {
            var responseObj = JSON.parse(r.data);
            // console.log(responseObj);
            expect(responseObj.data.blobUrl).toMatch(/^https?:\/\//);
            done();
        }).catch(fail);
    }, 1000);
    // should return a new block blob url
    // should return a writtable block blob url
    // should return a writtable and readable block blob url
    // should return an empty append blob url
    // should return an appendable append blob url
    // should return an appendable and readable append blob url
});
//# sourceMappingURL=get-blob.client.spec.js.map