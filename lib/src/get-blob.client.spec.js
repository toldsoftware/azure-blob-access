"use strict";
var lib_1 = require("@told/platform/lib");
// let host = "http://localhost:9876";
var host = "http://azure-blob-access-test.azurewebsites.net/api/get-blob";
var timeout = 10000;
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
    }, timeout);
    // should return a new block blob url
    // should return a writtable block blob url
    // should return a writtable and readable block blob url
    // should return an empty append blob url
    // should return an appendable append blob url
    // should return an appendable and readable append blob url
});
//# sourceMappingURL=get-blob.client.spec.js.map