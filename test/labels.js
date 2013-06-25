describe('labels', function () {
  var p;
  before(function () {
    p = packer(
      {label: 'sex', length: 1},
      {label: 'year', length: 4},
      {label: 'month', length: 2},
      {label: 'day', length: 2},
      {label: 'eye', length: 1},
      {label: 'hair', length: 1},
      {label: 'height', length: 2},
      {label: 'weight', length: 3}
    );
  });
  it('packs', function () {
    var num = p.pack({
      sex: 0,
      year: 1983,
      month: 11,
      day: 17,
      eye: 0,
      hair: 1,
      height: 69,
      weight: 200
    });
    assert.equal(String(num), '0198311170169200');
  });
  it('unpacks', function () {
    var unpacked = p.unpack('0198311170169200');
    assert.deepEqual(unpacked, {
      sex: 0,
      year: 1983,
      month: 11,
      day: 17,
      eye: 0,
      hair: 1,
      height: 69,
      weight: 200
    });
  });
});
