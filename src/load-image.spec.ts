import { loadImage } from './load-image';

let imageUrl = 'https://toldazureblobaccesstest.blob.core.windows.net/test/sample.jpg';
let sourceWidth = 600;
let sourceHeight = 600;

describe('loadImage', () => {
    it('should load an image', async (done) => {
        let img = await loadImage(imageUrl);
        expect(img.width).toBe(sourceWidth);
        expect(img.height).toBe(sourceHeight);
        done();
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
});
