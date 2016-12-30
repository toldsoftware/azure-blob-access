import { BlobAccess } from "./blobAccess";

describe("BlobAccess", function () {
    it("can be created", function () {
        let b = new BlobAccess(null);
        expect(b).not.toBeNull();
    });
});

// TODO: Create Unit Tests