import { add, divide, exp, ln, multiply, sqrt, subtract } from './basic';
import { config } from './BigMath';
import { gt, lt } from './comparison';
import { PI, PI2, HALF, ONE, TWO, THREE, FOUR, FIVE } from './constants';
import { BigNumber } from './interfaces';
import { abs, DomainError, normalize, stringify, finalize } from './util';

/**
 * @domain Real numbers
 * @range [-1, 1]
 * @returns Sine of parameter
 */
export const sin = (a: BigNumber): BigNumber => {
  const r = divide(a, PI2);
  const reduce = subtract(a, multiply(normalize(r.number / 10n ** BigInt(-r.comma)), PI2));
  let s = { ...reduce };
  let k = { ...reduce };

  const k2 = multiply(reduce, reduce);

  let f = 1n;
  let i = 1n;
  let s1;

  const ErrorConst = {
    comma: -config.precision,
    number: 1n,
    sign: false
  };

  let p = 6n;
  let ad = 14n;

  while (true) {
    f *= p;
    p += ad;
    ad += 8n;
    k = multiply(k, k2);
    s1 = i % 2n === 0n ? add(s, divide(k, normalize(f))) : subtract(s, divide(k, normalize(f)));
    if (lt(abs(subtract(s1, s)), ErrorConst)) {
      return finalize(s1);
    }
    s = s1;
    i++;
  }
};

/**
 * @domain Real numbers
 * @range [-1, 1]
 * @returns Cosine of parameter
 */
export const cos = (a: BigNumber): BigNumber => sin(subtract(PI2, normalize(a)));

/**
 * @domain Real numbers & x != PI/2 + k*PI (k - integer)
 * @range Real numbers
 * @returns Tangent of parameter
 */
export const tan = (a: BigNumber): BigNumber => {
  const c = cos(a);
  if (c.number === 0n) {
    throw new DomainError(stringify(a), 'real numbers & x != PI/2 + k*PI (k - integer)');
  }

  return finalize(divide(sin(a), c));
};

/**
 * @domain Real numbers & x != k*PI (k - integer)
 * @range Real numbers
 * @returns Cotangent of parameter
 */
export const cot = (a: BigNumber): BigNumber => {
  const s = sin(a);
  if (s.number === 0n) {
    throw new DomainError(stringify(a), 'real numbers & x != k*PI (k - integer)');
  }

  return finalize(divide(cos(a), s));
};

/**
 * @domain Real numbers & x != PI/2 + k*PI (k - integer)
 * @range Real numbers
 * @returns Secant of parameter
 */
export const sec = (a: BigNumber): BigNumber => {
  const c = cos(a);
  if (c.number === 0n) {
    throw new DomainError(stringify(a), 'real numbers & x != PI/2 + k*PI (k - integer)');
  }

  return finalize(divide(ONE, c));
};

/**
 * @domain Real numbers & x != k*PI (k - integer)
 * @range Real numbers
 * @returns Cosecant of parameter
 */
export const csc = (a: BigNumber): BigNumber => {
  const s = sin(a);
  if (s.number === 0n) {
    throw new DomainError(stringify(a), 'real numbers & x != k*PI (k - integer)');
  }

  return finalize(divide(ONE, s));
};

/**
 * @domain [-1, 1]
 * @range [-PI/2, PI/2]
 * @returns Inverse sine of parameter
 */
export const asin = (a: BigNumber): BigNumber => {
  if (`${a.number}`.length > Math.abs(a.comma)) {
    if (a.number === 1n) {
      return { ...PI2 };
    }
    throw new DomainError(stringify(a), 'numbers from range [-1, 1]');
  }

  return atan(divide(a, sqrt(subtract(ONE, multiply(a, a)))));
};

/**
 * @domain [-1, 1]
 * @range [0, PI]
 * @returns Inverse cosine of parameter
 */
export const acos = (a: BigNumber): BigNumber => subtract(PI2, asin(a));

/**
 * @domain Real numbers
 * @range [-PI/2, PI/2]
 * @returns Inverse tangent of parameter
 */
export const atan = (a: BigNumber): BigNumber => {
  if (a.number === 0n) {
    return {
      comma: 0,
      number: 0n,
      sign: false
    };
  }

  if (gt(abs(a), ONE)) {
    return finalize(subtract({ ...PI2, sign: a.sign }, atan(divide(ONE, a))));
  }

  a = divide(a, add(ONE, sqrt(add(ONE, multiply(a, a)))));

  let k = divide(a, add(ONE, multiply(a, a)));
  let s = { ...k };

  const con = multiply(a, k);
  const coef = multiply(con, con);
  const incon = divide(ONE, con);
  let i = 8n;
  let s1;

  const ErrorConst = {
    comma: -config.precision,
    number: 1n,
    sign: false
  };

  k = multiply(multiply(k, coef), divide(TWO, THREE));
  s = add(s, multiply(k, add(incon, divide(FOUR, FIVE))));

  let p1 = 24n;
  let p2 = 35n;
  let ad1 = 24n;
  let ad2 = 32n;

  while (true) {
    k = multiply(multiply(k, coef), divide(normalize(p1), normalize(p2)));
    s1 = add(s, multiply(k, add(incon, divide(normalize(i), normalize(i + 1n)))));

    ad1 += 32n;
    ad2 += 32n;
    p1 += ad1;
    p2 += ad2;

    if (lt(abs(subtract(s1, s)), ErrorConst)) {
      return finalize(multiply(s1, TWO));
    }
    s = s1;
    i += 4n;
  }
};

/**
 * @domain Real numbers | Both can't be 0
 * @range [-PI/2, PI/2]
 * @returns 2-argument inverse tangent
 */
export const atan2 = (a: BigNumber, b: BigNumber): BigNumber => {
  if (a.number === 0n) {
    if (b.number === 0n) {
      throw new DomainError('atan(0, 0)', "Real numbers | Both can't be 0");
    }

    return { ...PI2, sign: b.sign };
  }

  if (!a.sign) {
    return atan(divide(b, a));
  }

  if (b.number === 0n) {
    return { ...PI };
  }

  if (b.sign) {
    return finalize(subtract(atan(divide(b, a)), PI));
  }

  return finalize(add(atan(divide(b, a)), PI));
};

/**
 * @domain Real numbers
 * @range [0, PI]
 * @returns Inverse cotangent of parameter
 */
export const acot = (a: BigNumber): BigNumber => finalize(subtract(PI2, atan(a)));

/**
 * @domain Real numbers without (-1, 1)
 * @range [0, PI] \ {PI/2}
 * @returns Inverse secant of parameter
 */
export const asec = (a: BigNumber): BigNumber => {
  if (`${a.number}`.length <= Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers not from range (-1, 1)');
  }

  return finalize(subtract(PI2, asin(divide(ONE, a))));
};

/**
 * @domain Real numbers without (-1, 1)
 * @range [-PI/2, PI/2] \ {0}
 * @returns Inverse cosecant of parameter
 */
export const acsc = (a: BigNumber): BigNumber => {
  if (`${a.number}`.length <= Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers not from range (-1, 1)');
  }

  return asin(divide(ONE, a));
};

/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Hyperbolic sine of parameter
 */
export const sinh = (a: BigNumber): BigNumber => {
  const x2 = multiply(a, a);
  let sum = { ...a };
  let fact = 1n;
  let i = 6n;
  let accum = 14n;
  let sum1;

  const ErrorConst = {
    comma: -config.precision,
    number: 1n,
    sign: false
  };

  while (true) {
    fact *= i;
    i += accum;
    accum += 8n;
    a = multiply(a, x2);
    sum1 = add(sum, divide(a, normalize(fact)));
    if (lt(abs(subtract(sum1, sum)), ErrorConst)) {
      return finalize(sum1);
    }
    sum = sum1;
  }
};

/**
 * @domain Real numbers
 * @range Numbers greater or equal 1
 * @returns Hyperbolic cosine of parameter
 */
export const cosh = (a: BigNumber): BigNumber => {
  a = exp(a);

  return finalize(multiply(add(a, divide(ONE, a)), HALF));
};

/**
 * @domain Real numbers
 * @range (-1, 1)
 * @returns Hyperbolic tangent of parameter
 */
export const tanh = (a: BigNumber): BigNumber => {
  a = exp(a);

  return finalize(subtract(ONE, divide(TWO, add(multiply(a, a), ONE))));
};

/**
 * @domain Real numbers without 0
 * @range Real numbers without [-1, 1]
 * @returns Hyperbolic cotangent of parameter
 */
export const coth = (a: BigNumber): BigNumber => {
  if (a.number === 0n) {
    throw new DomainError('0', 'real numbers without 0');
  }
  a = exp(a);

  return finalize(add(ONE, divide(TWO, subtract(multiply(a, a), ONE))));
};

/**
 * @domain Real numbers
 * @range (0, 1)
 * @returns Hyperbolic secant of parameter
 */
export const sech = (a: BigNumber): BigNumber => {
  a = exp(a);

  return finalize(divide(TWO, add(a, divide(ONE, a))));
};

/**
 * @domain Real numbers without 0
 * @range Real numbers without 0
 * @returns Hyperbolic cosecant of parameter
 */
export const csch = (a: BigNumber): BigNumber => {
  if (a.number === 0n) {
    throw new DomainError('0', 'real numbers without 0');
  }
  a = exp(a);

  return finalize(divide(TWO, subtract(a, divide(ONE, a))));
};

/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Inverse hyperbolic sine of parameter
 */
export const asinh = (a: BigNumber): BigNumber => ln(add(a, sqrt(add(multiply(a, a), ONE))));

/**
 * @domain Real numbers greater or equal 1
 * @range Real numbers greater or equal 0
 * @returns Inverse hyperbolic cosine of parameter
 */
export const acosh = (a: BigNumber): BigNumber => {
  if (a.sign || `${a.number}`.length <= Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers greater or equal 1');
  }
  if (a.number === 1n) {
    return {
      comma: 0,
      number: 0n,
      sign: false
    };
  }

  return ln(add(a, sqrt(subtract(multiply(a, a), ONE))));
};

/**
 * @domain (-1, 1)
 * @range Real numbers
 * @returns Inverse hyperbolic tangent of parameter
 */
export const atanh = (a: BigNumber): BigNumber => {
  if (`${a.number}`.length > Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers from range (-1, 1)');
  }

  return finalize(multiply(ln(divide(add(ONE, a), subtract(ONE, a))), HALF));
};

/**
 * @domain Real numbers without [-1, 1]
 * @range Real numbers
 * @returns Inverse hyperbolic cotangent of parameter
 */
export const acoth = (a: BigNumber): BigNumber => {
  if (`${a.number}`.length <= Math.abs(a.comma) || a.number === 1n || a.number === 0n) {
    throw new DomainError(stringify(a), 'numbers not from range [-1, 1]');
  }

  return finalize(multiply(ln(divide(add(a, ONE), subtract(a, ONE))), HALF));
};

/**
 * @domain (0, 1]
 * @range Real numbers greater of equal 0
 * @returns Inverse hyperbolic secant of parameter
 */
export const asech = (a: BigNumber): BigNumber => {
  if (a.sign || `${a.number}`.length > Math.abs(a.comma)) {
    if (a.comma === 0 && !a.sign && a.number === 1n) {
      return {
        comma: 0,
        number: 0n,
        sign: false
      };
    }
    throw new DomainError(stringify(a), 'numbers from range (0,1]');
  }

  return ln(divide(add(ONE, sqrt(subtract(ONE, multiply(a, a)))), a));
};

/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Inverse hyperbolic cosecant of parameter
 */
export const acsch = (a: BigNumber): BigNumber => {
  const b = divide(ONE, a);

  return ln(add(b, sqrt(add(divide(b, a), ONE))));
};

export const versin = (a: BigNumber): BigNumber => finalize(subtract(ONE, cos(a)));

export const vercos = (a: BigNumber): BigNumber => finalize(add(ONE, cos(a)));

export const coversin = (a: BigNumber): BigNumber => finalize(subtract(ONE, sin(a)));

export const covercos = (a: BigNumber): BigNumber => finalize(add(ONE, sin(a)));

export const haversin = (a: BigNumber): BigNumber => finalize(divide(subtract(ONE, cos(a)), TWO));

export const havercos = (a: BigNumber): BigNumber => finalize(divide(add(ONE, cos(a)), TWO));

export const hacoversin = (a: BigNumber): BigNumber => finalize(divide(subtract(ONE, sin(a)), TWO));

export const hacovercos = (a: BigNumber): BigNumber => finalize(divide(add(ONE, sin(a)), TWO));

export const gd = (a: BigNumber): BigNumber => finalize(multiply(TWO, atan(tanh(divide(normalize(a), TWO)))));
