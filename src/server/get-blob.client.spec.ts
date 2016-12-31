import { GetBlobRequest, GetBlobResponseBody } from "./get-blob.model";
import { setupBrowser, Platform } from "@told/platform";

let host = "https://localhost:9876";

describe("getBlob", () => {

    setupBrowser();
    let http = Platform.http();

    it("should return a url", (done) => {
        http.request(host).then(r => {
            let responseObj = JSON.parse(r.data) as GetBlobResponseBody;
            console.log(responseObj);
            expect(responseObj.data.blobUrl).toMatch(/^https?:\/\//);
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