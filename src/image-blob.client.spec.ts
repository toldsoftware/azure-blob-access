import { GetBlobRequest, GetBlobResponseBody } from './get-blob.model';
import { BlobAccess } from './blob-access';
import { uploadImage } from './image-blob';
import { AjaxProvider } from './ajax-provider';
import { setupBrowser, Platform } from '@told/platform/lib';

// let host = "http://localhost:9876";
let host = 'http://azure-blob-access-test.azurewebsites.net/api/get-blob';
let imageUrl = 'https://toldazureblobaccesstest.blob.core.windows.net/test/sample.jpg';
let timeout = 10000;

describe('uploadImage', () => {

    setupBrowser();
    let http = Platform.http();

    it('should upload an image', async (done) => {

        try {

            // Get Blob Sas Url
            let r = await http.request(host);
            let responseObj = JSON.parse(r.data) as GetBlobResponseBody;
            let blobSasUrl = responseObj.data.urls[0].blobSasUrl;

            // Upload image

            // let access = new BlobAccess(ajax);
            // // let r = await uploadImage()

        } catch (err) {
            fail();
        }

    }, timeout);

    // should return a new block blob url
    // should return a writtable block blob url
    // should return a writtable and readable block blob url

    // should return an empty append blob url
    // should return an appendable append blob url
    // should return an appendable and readable append blob url
});