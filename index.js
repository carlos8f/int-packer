var bignum = require('bignum');

function IntPacker (lengths) {
  var self = this;
  if (!Array.isArray(lengths)) this.lengths = [].slice.call(arguments);
  else this.lengths = lengths.slice();
  if (typeof this.lengths[0] === 'object') {
    this.labels = [];
    this.lengths = this.lengths.map(function (obj) {
      self.labels.push(obj.label);
      return obj.length;
    });
  }
  this.total = this.lengths.reduce(function (prev, length) {
    return prev + length;
  }, 0);
}
module.exports = function (lengths) {
  if (!Array.isArray(lengths)) lengths = [].slice.call(arguments);
  return new IntPacker(lengths);
};

IntPacker.prototype.pack = function (values) {
  var self = this;
  if (!Array.isArray(values) && typeof values === 'object') {
    var tmp = [];
    this.labels.forEach(function (label) {
      if (typeof values[label] === 'undefined') tmp.push(0);
      else tmp.push(values[label]);
    });
    values = tmp;
  }
  else if (!Array.isArray(values)) values = [].slice.call(arguments);
  var ret = '';
  this.lengths.forEach(function (length, idx) {
    var val = values[idx];
    if (typeof val === 'undefined') val = 0;
    var section = zeroPad(val, length);
    if (section.length !== length) {
      var err = new Error('section `' + section + '` does not match length ' + length);
      err.code = 'INVALID_LENGTH';
      throw err;
    }
    ret += section;
  });
  var num = bignum(ret);
  var _toString = num.toString;
  num.toString = function () {
    var ret = zeroPad(_toString.call(num), self.total);
    return ret;
  };
  return num;
};

IntPacker.prototype.unpack = function (num) {
  num = zeroPad(num, this.total);
  var ret = [], idx = 0;
  this.lengths.forEach(function (length) {
    var section = num.substr(idx, length);
    if (section.length !== length) {
      var err = new Error('section `' + section + '` does not match length ' + length);
      err.code = 'INVALID_LENGTH';
      throw err;
    }
    ret.push(Number(section));
    idx += length;
  });
  if (this.labels) {
    var obj = {};
    this.labels.forEach(function (label, idx) {
      obj[label] = ret[idx];
    });
    return obj;
  }
  return ret;
};

function zeroPad (num, length) {
  num = String(num);
  while (num.length < length) {
    num = '0' + num;
  }
  return num;
}
