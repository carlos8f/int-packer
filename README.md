int-packer
==========

Pack integers into bigger integers

[![build status](https://secure.travis-ci.org/carlos8f/int-packer.png)](http://travis-ci.org/carlos8f/int-packer)

## Usage

Say you want to encode some data into an integer:

```
1 digit: sex (0 male 1 female)
4 digits: birth year
2 digits: birth month
2 digits: birth day
1 digit: eye color (0 brown 1 blue 2 hazel 3 green 4 other)
1 digit: hair color (0 brown 1 black 2 blond 3 red 4 other)
2 digits: height in inches
3 digits: weight
```

With `int-packer` you can create a "packer" instance with an array of digits:

```js
var packer = require('int-packer')(1, 4, 2, 2, 1, 1, 2, 3);
// you can also do this:
var packer = require('int-packer')([1, 4, 2, 2, 1, 1, 2, 3]);
```

And pack values into a larger number. `pack()` returns an instance of
[justmoon/node-bignum](https://github.com/justmoon/node-bignum), with a special
`toString()` method that zero-pads the value.

```js
var num = packer.pack(0, 1983, 11, 17, 0, 1, 69, 200);
console.log(num);
// <BigNum 0198311170169200>
var unpacked = packer.unpack(num);
console.log(unpacked);
// [ 0, 1983, 11, 17, 0, 1, 69, 200 ]
```

### Labels

You can also assign labels to each section:

```js
var packer = require('int-packer')(
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
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (C) 2013 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2013 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
