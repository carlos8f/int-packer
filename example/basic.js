var packer = require('../')(1, 4, 2, 2, 1, 1, 2, 3);
// you can also do this:
var packer = require('../')([1, 4, 2, 2, 1, 1, 2, 3]);

var num = packer.pack(0, 1983, 11, 17, 0, 1, 69, 200);
console.log(num);
// num is actually an instance of justmoon/node-bignum, with a special toString()
// method that zero-pads the value.
// <BigNum 0198311170169200>
var unpacked = packer.unpack(num);
console.log(unpacked);
// [ 0, 1983, 11, 17, 0, 1, 69, 200 ]
