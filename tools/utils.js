const fs = require('fs');
const path = require('path');

let mkdirsSync = exports.mkdirsSync = function (dirname, mode) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    if (mkdirsSync(path.dirname(dirname), mode)) {
        fs.mkdirSync(dirname, mode);
        return true;
    }
    return false;
}