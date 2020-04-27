import { BigMath } from '../src/BigMath';

declare module '../src/BigMath' {
  namespace BigMath {
    function plugin2(value: string): BigMath;
  }
  interface BigMath {
    plugin2(value: string): BigMath;
  }
}

BigMath.plugin2 = function (f) {
  return this.abs(f);
};

BigMath.prototype.plugin2 = function (f) {
  return new BigMath(f).abs();
};
