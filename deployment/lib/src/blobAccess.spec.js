"use strict";
var blobAccess_1 = require("./blobAccess");
describe('createBlobPath', function () {
    it('should make path', function () {
        var path = blobAccess_1.createBlobPath('container', 'blob', '?SAS=SECURE');
        expect(path).toBe('container/blob?SAS=SECURE');
    });
});
describe('BlobAccess', function () {
    it('can be created', function () {
        var b = new blobAccess_1.BlobAccess(null);
        expect(b).not.toBeNull();
    });
});
// TODO: Create Unit Tests 
//# sourceMappingURL=blobAccess.spec.js.map