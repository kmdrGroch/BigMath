import { BigMath } from '../src/BigMath';

declare module '../src/BigMath' {
  namespace BigMath {
    function plugin1(value: string): BigMath;
  }
  interface BigMath {
    plugin1(value: string): BigMath;
  }
}

BigMath.plugin1 = function (f) {
  return this.abs(f);
};

BigMath.prototype.plugin1 = function (f) {
  return new BigMath(f).abs();
};
