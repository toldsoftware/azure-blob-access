import { BlobAccess, createBlobPath } from './blob-access';

describe('createBlobPath', function () {
    it('should make path', function () {
        let path = createBlobPath('container', 'blob', '?SAS=SECURE');
        expect(path).toBe('container/blob?SAS=SECURE');
    });
});

describe('BlobAccess', function () {
    it('can be created', function () {
        let b = new BlobAccess(null);
        expect(b).not.toBeNull();
    });
});

// TODO: Create Unit Tests