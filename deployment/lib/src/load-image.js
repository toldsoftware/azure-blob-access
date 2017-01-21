"use strict";
var blueImpLoadImage = require('blueimp-load-image');
function loadImage(file, options) {
    var optionsInner = options || {};
    optionsInner.crossOrigin = true;
    // Orientation true makes canvas and meta true also
    optionsInner.orientation = true;
    optionsInner.canvas = true;
    optionsInner.meta = true;
    return new Promise(function (resolve, reject) {
        blueImpLoadImage(file, function (img) { return resolve(img); }, optionsInner);
    });
}
exports.loadImage = loadImage;
//# sourceMappingURL=load-image.js.map