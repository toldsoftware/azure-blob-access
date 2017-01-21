import { GetBlobRequest, GetBlobResponseBody } from './get-blob.model';
import { BlobAccess } from './blob-access';
import { uploadImage } from './image-blob';
import { setupBrowser, Platform } from '@told/platform/lib';

// let host = "http://localhost:9876";
let host = 'http://azure-blob-access-test.azurewebsites.net/api/get-blob';
let imageUrl = 'https://toldazureblobaccesstest.blob.core.windows.net/test/sample.jpg';
let timeout = 10000;

describe('uploadImage', () => {

    setupBrowser();
    let http = Platform.http();

    it('should get a blob url', async (done) => {
        try {
            // Get Blob Sas Url
            let r = await http.request(host);
            let responseObj = JSON.parse(r.data) as GetBlobResponseBody;
            let blobSasUrl = responseObj.data.urls[0].blobSasUrl;
            let blobUrl = responseObj.data.urls[0].blobUrl;

            expect(blobSasUrl).toMatch(/^https?:\/\//);
            expect(blobUrl).toMatch(/^https?:\/\//);
            done();

        } catch (err) {
            fail();
        }
    });

    it('should upload an image', (done) => {
        let go = async () => {
            try {

                // Get Blob Sas Url
                console.log('Get Blob Sas Url START');
                let r = await http.request(host);
                let responseObj = JSON.parse(r.data) as GetBlobResponseBody;
                let blobSasUrl = responseObj.data.urls[0].blobSasUrl;
                let blobUrl = responseObj.data.urls[0].blobUrl;
                console.log('Get Blob Sas Url START');

                // Upload image
                console.log('Upload Image START');
                let access = new BlobAccess(http);
                await uploadImage(access, blobSasUrl, imageUrl, 300, 300);
                console.log('Upload Image END');

                // Load Uploaded Image
                console.log('Load Uploaded Image START');

                let img = new Image();
                img.onload = () => {
                    expect(img.width).toBe(300);
                    expect(img.height).toBe(300);
                    console.log('Load Uploaded Image END');
                    done();
                };
                img.onerror = () => fail();
                img.src = blobUrl;

            } catch (err) {
                fail();
            }
        };
        go().then();
    }, timeout);

    // should return a new block blob url
    // should return a writtable block blob url
    // should return a writtable and readable block blob url

    // should return an empty append blob url
    // should return an appendable append blob url
    // should return an appendable and readable append blob url
});