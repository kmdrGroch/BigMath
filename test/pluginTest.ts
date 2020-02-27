import { BigMath } from '../src/BigMath';

declare module '../src/BigMath' {
  namespace BigMath {
    function map(value: string): BigMath;
  }
  interface BigMath {
    map(value: string): BigMath;
  }
}

BigMath.map = function(f) {
  return this.abs(f);
};

BigMath.prototype.map = function(f) {
  return new BigMath(f).abs();
};
