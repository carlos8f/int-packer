describe('shorter values length', function () {
  before(function () {
    p = packer(1, 4, 2, 2, 1, 1, 2, 3);
  });
  it('packs', function () {
    var num = p.pack(0, 1983, 11, 17, 0, 1, 69);
    assert.equal(String(num), '0198311170169000');
  });
  it('unpacks', function () {
    var unpacked = p.unpack('0198311170169000');
    assert.deepEqual(unpacked, [
      0, 1983, 11, 17, 0, 1, 69, 0
    ]);
  });
});
