var packer = require('../')(-1, -3, -4, 1);
var packed = packer.pack(-1, 800, -9999, 1);
console.log(packed);
var unpacked = packer.unpack(packed);
console.log(unpacked);
