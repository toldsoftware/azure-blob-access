import { GetBlobRequest, GetBlobResponseBody } from './get-blob.model';
import { setupBrowser, Platform } from '@told/platform/lib';

// let host = "http://localhost:9876";
let host = 'http://azure-blob-access-test.azurewebsites.net/api/get-blob';
let timeout = 10000;

describe('getBlob', () => {

    setupBrowser();
    let http = Platform.http();

    it('should return a url', (done) => {
        http.request(host).then(r => {
            let responseObj = JSON.parse(r.data) as GetBlobResponseBody;
            // console.log(responseObj);
            expect(responseObj.data.urls[0].blobUrl).toMatch(/^https?:\/\//);
            expect(responseObj.data.urls[0].blobSasUrl).toMatch(/^https?:\/\//);
            expect(responseObj.data.urls[0].blobSasUrl.indexOf(responseObj.data.urls[0].blobUrl)).toBe(0);
            expect(responseObj.data.urls[0].blobSasUrl.length > responseObj.data.urls[0].blobUrl.length).toBe(true);
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