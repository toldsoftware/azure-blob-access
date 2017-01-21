import { loadImage, getOrientation } from './load-image';

let imageUrl = 'https://toldazureblobaccesstest.blob.core.windows.net/test/sample.jpg';
let sourceWidth = 600;
let sourceHeight = 600;

// To Orient: Orientation=8: 90° rotate left
let imageUrl_exifOrientation = 'https://toldazureblobaccesstest.blob.core.windows.net/test/ExifOrientation.jpg';
let exif_correctWidth = 1280;
let exif_correctHeight = 720;


describe('loadImage', () => {
    it('should load an image', async (done) => {
        let img = await loadImage(imageUrl);
        expect(img.width).toBe(sourceWidth);
        expect(img.height).toBe(sourceHeight);
        done();
    }, 3000);

    it('should load an image as a blob', async (done) => {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', imageUrl);
        xhr.responseType = 'blob';
        xhr.onload = (ev) => {
            let blob = xhr.response;

            loadImage(blob).then(img => {
                expect(img.width).toBe(sourceWidth);
                expect(img.height).toBe(sourceHeight);
                done();
            });

        };
        xhr.send();


    }, 3000);

    it('should load an image with maxSize', async (done) => {
        let img = await loadImage(imageUrl, { maxWidth: 300, maxHeight: 300 });
        expect(img.width).toBe(300);
        expect(img.height).toBe(300);
        done();
    }, 3000);

    it('should load an image that can convert to dataUrl', async (done) => {
        let img = await loadImage(imageUrl, { maxWidth: 300, maxHeight: 300 });
        let dataUrl = img.toDataURL('image/jpeg', 0.92);
        expect(img.width).toBe(300);
        expect(img.height).toBe(300);
        done();
    }, 3000);

    it('should load an image that can convert to dataUrl and reload', async (done) => {
        let img = await loadImage(imageUrl, { maxWidth: 300, maxHeight: 300 });
        let dataUrl = img.toDataURL('image/jpeg', 0.92);
        img = await loadImage(dataUrl);
        expect(img.width).toBe(300);
        expect(img.height).toBe(300);
        done();
    }, 3000);

    it('should load an image with corrected rotation', async (done) => {
        let img = await loadImage(imageUrl_exifOrientation);
        expect(img.width).toBe(exif_correctWidth);
        expect(img.height).toBe(exif_correctHeight);
        done();
    }, 3000);
});


describe('getOrientation', () => {
    it('should have no orientation for a normal image', async (done) => {

        let orientation = await getOrientation(imageUrl);
        expect(orientation).toBe(0);
        done();

    }, 3000);

    it('should have an orientation for an exif rotated image', async (done) => {

        let orientation = await getOrientation(imageUrl_exifOrientation);
        expect(orientation).toBe(8);
        done();

    }, 3000);
});