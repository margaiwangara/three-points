import { expect } from 'chai';
import 'mocha';

const words: string = 'This is a bunch of words';

describe('Initial Test', function() {
  describe('should be string', function() {
    it('should return a typeof string', function() {
      expect(words).to.be.a('string');
    });
  });
});
