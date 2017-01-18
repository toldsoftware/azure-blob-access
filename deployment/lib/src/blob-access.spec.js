"use strict";
var blob_access_1 = require("./blob-access");
describe('createBlobPath', function () {
    it('should make path', function () {
        var path = blob_access_1.createBlobPath('container', 'blob', '?SAS=SECURE');
        expect(path).toBe('container/blob?SAS=SECURE');
    });
});
describe('BlobAccess', function () {
    it('can be created', function () {
        var b = new blob_access_1.BlobAccess(null);
        expect(b).not.toBeNull();
    });
});
// TODO: Create Unit Tests 
//# sourceMappingURL=blob-access.spec.js.map