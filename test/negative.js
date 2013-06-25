describe('negative values', function () {
  before(function () {
    p = packer(-1, -3, -4, 1);
  });
  it('packs', function () {
    var num = p.pack(-1, 800, -9999, 1);
    assert.equal(String(num), '011800099991');
  });
  it('unpacks', function () {
    var unpacked = p.unpack('011800099991');
    assert.deepEqual(unpacked, [
      -1, 800, -9999, 1
    ]);
  });
});
