var packer = require('../')(
  {label: 'sex', length: 1},
  {label: 'year', length: 4},
  {label: 'month', length: 2},
  {label: 'day', length: 2},
  {label: 'eye', length: 1},
  {label: 'hair', length: 1},
  {label: 'height', length: 2},
  {label: 'weight', length: 3}
);
var packed = packer.pack({
  sex: 0,
  year: 1983,
  month: 11,
  day: 17,
  eye: 0,
  hair: 1,
  height: 69,
  weight: 200
});
console.log(packed);
// <BigNum 0198311170169200>
var unpacked = packer.unpack(packed);
console.log(unpacked);
/*
{
  sex: 0,
  year: 1983,
  month: 11,
  day: 17,
  eye: 0,
  hair: 1,
  height: 69,
  weight: 200
}
*/