// Intentionally global
___export = require('@told/azure-functions-server/lib/src-server/azure-server').serve(require('./../lib/src-server/get-blob').main);
module.exports = ___export;