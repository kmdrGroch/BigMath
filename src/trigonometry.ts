import { add, divide, exp, ln, multiply, sqrt, subtract } from './basic';
import { lt, lte } from './comparison';
import { ErrorConst, PI, PI2 } from './constants';
import { BigNumber, T } from './interfaces';
import { abs, DomainError, normalize, stringify } from './util';

/**
 * @domain Real numbers
 * @range [-1, 1]
 * @returns Sine of parameter
 */
export const sin = (a: T): BigNumber => {
  a = normalize(a);

  const r = divide(a, PI2);
  const tens = `${r.number}`.length + r.comma;
  const d = BigInt(`${r.number}`.substring(0, tens) || 0);
  const reduce = subtract(a, multiply(d, PI2));
  let s = { ...reduce };
  let k = { ...reduce };

  const k2 = multiply(reduce, reduce);

  let f = 1n;
  let i = 1n;
  let s1;
  while (true) {
    f *= i * (i * 4n + 2n);
    k = multiply(k, k2);
    s1 = (i % 2n === 0n) ? add(s, divide(k, f)) : subtract(s, divide(k, f));
    if (lt(abs(subtract(s1, s)), ErrorConst)) {
      return s1;
    }
    s = s1;
    i += 1n;
  }
};

/**
 * @domain Real numbers
 * @range [-1, 1]
 * @returns Cosine of parameter
 */
export const cos = (a: T): BigNumber => sin(subtract(PI2, a));

/**
 * @domain Real numbers & x != PI/2 + k*PI (k - integer)
 * @range Real numbers
 * @returns Tangent of parameter
 */
export const tan = (a: T): BigNumber => {
  const c = cos(a);
  if (c.number === 0n) {
    throw new DomainError(stringify(a), 'real numbers & x != PI/2 + k*PI (k - integer)');
  }

  return divide(sin(a), c);
};

/**
 * @domain Real numbers & x != k*PI (k - integer)
 * @range Real numbers
 * @returns Cotangent of parameter
 */
export const cot = (a: T): BigNumber => {
  const s = sin(a);
  if (s.number === 0n) {
    throw new DomainError(stringify(a), 'real numbers & x != k*PI (k - integer)');
  }

  return divide(cos(a), s);
};

/**
 * @domain Real numbers & x != PI/2 + k*PI (k - integer)
 * @range Real numbers
 * @returns Secant of parameter
 */
export const sec = (a: T): BigNumber => {
  const c = cos(a);
  if (c.number === 0n) {
    throw new DomainError(stringify(a), 'real numbers & x != PI/2 + k*PI (k - integer)');
  }

  return divide(1n, c);
};

/**
 * @domain Real numbers & x != k*PI (k - integer)
 * @range Real numbers
 * @returns Cosecant of parameter
 */
export const csc = (a: T): BigNumber => {
  const s = sin(a);
  if (s.number === 0n) {
    throw new DomainError(stringify(a), 'real numbers & x != k*PI (k - integer)');
  }

  return divide(1n, s);
};

/**
 * @domain [-1, 1]
 * @range [-PI/2, PI/2]
 * @returns Inverse sine of parameter
 */
export const asin = (a: T): BigNumber => {
  a = normalize(a);
  if (`${a.number}`.length > Math.abs(a.comma)) {
    if (a.number === 1n) {
      return { ...PI2 };
    }
    throw new DomainError(stringify(a), 'numbers from range [-1, 1]');
  }

  return atan(divide(a, sqrt(subtract(1n, multiply(a, a)))));
};

/**
 * @domain [-1, 1]
 * @range [0, PI]
 * @returns Inverse cosine of parameter
 */
export const acos = (a: T): BigNumber => subtract(PI2, asin(a));

/**
 * @domain Real numbers
 * @range [-PI/2, PI/2]
 * @returns Inverse tangent of parameter
 */
export const atan = (a: T): BigNumber => {
  a = normalize(a);

  let x = 2n;
  while (true) {
    a = divide(a, add(1n, sqrt(add(1n, multiply(a, a)))));
    if (lte(abs(a), 0.5)) { break; }
    x *= 2n;
  }

  let s = { ...a };
  let k = { ...a };

  const d2 = multiply(a, a);
  let i = 1n;
  let s1;
  while (true) {
    k = multiply(k, d2);
    s1 = (i % 2n === 1n) ? subtract(s, divide(k, i * 2n + 1n)) : add(s, divide(k, i * 2n + 1n));
    if (lt(abs(subtract(s1, s)), ErrorConst)) {
      return multiply(s1, x);
    }
    s = s1;
    i += 1n;
  }
};

/**
 * @domain Real numbers | Both can't be 0
 * @range [-PI/2, PI/2]
 * @returns 2-argument inverse tangent
 */
export const atan2 = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);

  if (a.number === 0n) {
    if (b.number === 0n) {
      throw new DomainError('atan(0, 0)', 'Real numbers | Both can\'t be 0');
    }
    const k = { ...PI2 };
    k.sign = b.sign;

    return k;
  }

  if (!a.sign) {
    return atan(divide(b, a));
  }

  if (b.number === 0n) {
    return { ...PI };
  }

  if (b.sign) {
    return subtract(atan(divide(b, a)), PI);
  }

  return add(atan(divide(b, a)), PI);
};

/**
 * @domain Real numbers
 * @range [0, PI]
 * @returns Inverse cotangent of parameter
 */
export const acot = (a: T): BigNumber => subtract(PI2, atan(a));

/**
 * @domain Real numbers without (-1, 1)
 * @range [0, PI] \ {PI/2}
 * @returns Inverse secant of parameter
 */
export const asec = (a: T): BigNumber => {
  a = normalize(a);
  if (`${a.number}`.length <= Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers not from range (-1, 1)');
  }

  return subtract(PI2, asin(divide(1n, a)));
};

/**
 * @domain Real numbers without (-1, 1)
 * @range [-PI/2, PI/2] \ {0}
 * @returns Inverse cosecant of parameter
 */
export const acsc = (a: T): BigNumber => {
  a = normalize(a);
  if (`${a.number}`.length <= Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers not from range (-1, 1)');
  }

  return asin(divide(1n, a));
};

/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Hyperbolic sine of parameter
 */
export const sinh = (a: T): BigNumber => {
  a = normalize(a);
  const x2 = multiply(a, a);
  let sum = { ...a };
  let fact = 1n;
  let i = 2n;
  let sum1;

  while (true) {
    fact *= i * (i + 1n);
    a = multiply(a, x2);
    sum1 = add(sum, divide(a, fact));
    if (lt(abs(subtract(sum1, sum)), ErrorConst)) {
      return sum1;
    }
    sum = sum1;
    i += 2n;
  }
};

/**
 * @domain Real numbers
 * @range Numbers greater or equal 1
 * @returns Hyperbolic cosine of parameter
 */
export const cosh = (a: T): BigNumber => {
  a = exp(a);

  return multiply(add(a, divide(1n, a)), 0.5);
};

/**
 * @domain Real numbers
 * @range (-1, 1)
 * @returns Hyperbolic tangent of parameter
 */
export const tanh = (a: T): BigNumber => {
  a = exp(a);

  return subtract(1n, divide(2n, add(multiply(a, a), 1n)));
};

/**
 * @domain Real numbers without 0
 * @range Real numbers without [-1, 1]
 * @returns Hyperbolic cotangent of parameter
 */
export const coth = (a: T): BigNumber => {
  a = normalize(a);
  if (a.number === 0n) {
    throw new DomainError('0', 'real numbers without 0');
  }
  a = exp(a);

  return add(1n, divide(2n, subtract(multiply(a, a), 1n)));
};

/**
 * @domain Real numbers
 * @range (0, 1)
 * @returns Hyperbolic secant of parameter
 */
export const sech = (a: T): BigNumber => {
  a = exp(a);

  return divide(2n, add(a, divide(1n, a)));
};

/**
 * @domain Real numbers without 0
 * @range Real numbers without 0
 * @returns Hyperbolic cosecant of parameter
 */
export const csch = (a: T): BigNumber => {
  a = normalize(a);
  if (a.number === 0n) {
    throw new DomainError('0', 'real numbers without 0');
  }
  a = exp(a);

  return divide(2n, subtract(a, divide(1n, a)));
};

/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Inverse hyperbolic sine of parameter
 */
export const asinh = (a: T): BigNumber => {
  a = normalize(a);

  return ln(add(a, sqrt(add(multiply(a, a), 1n))));
};

/**
 * @domain Real numbers greater or equal 1
 * @range Real numbers greater or equal 0
 * @returns Inverse hyperbolic cosine of parameter
 */
export const acosh = (a: T): BigNumber => {
  a = normalize(a);
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

  return ln(add(a, sqrt(subtract(multiply(a, a), 1n))));
};

/**
 * @domain (-1, 1)
 * @range Real numbers
 * @returns Inverse hyperbolic tangent of parameter
 */
export const atanh = (a: T): BigNumber => {
  a = normalize(a);
  if (`${a.number}`.length > Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers from range (-1, 1)');
  }

  return multiply(ln(divide(add(1n, a), subtract(1n, a))), 0.5);
};

/**
 * @domain Real numbers without [-1, 1]
 * @range Real numbers
 * @returns Inverse hyperbolic cotangent of parameter
 */
export const acoth = (a: T): BigNumber => {
  a = normalize(a);
  if (`${a.number}`.length <= Math.abs(a.comma) || a.number === 1n || a.number === 0n) {
    throw new DomainError(stringify(a), 'numbers not from range [-1, 1]');
  }

  return multiply(ln(divide(add(a, 1n), subtract(a, 1n))), 0.5);
};

/**
 * @domain (0, 1]
 * @range Real numbers greater of equal 0
 * @returns Inverse hyperbolic secant of parameter
 */
export const asech = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign || `${a.number}`.length > Math.abs(a.comma)) {
    if (stringify(a) === '1') {
      return {
        comma: 0,
        number: 0n,
        sign: false
      };
    }
    throw new DomainError(stringify(a), 'numbers from range (0,1]');
  }

  return ln(divide(add(1n, sqrt(subtract(1n, multiply(a, a)))), a));
};

/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Inverse hyperbolic cosecant of parameter
 */
export const acsch = (a: T): BigNumber => {
  const b = divide(1n, a);

  return ln(add(b, sqrt(add(divide(b, a), 1n))));
};

export const versin = (a: T): BigNumber => subtract(1n, cos(a));

export const vercosin = (a: T): BigNumber => add(1n, cos(a));

export const coversin = (a: T): BigNumber => subtract(1n, sin(a));

export const covercosin = (a: T): BigNumber => add(1n, sin(a));

export const haversin = (a: T): BigNumber => divide(subtract(1n, cos(a)), 2n);

export const havercosin = (a: T): BigNumber => divide(add(1n, cos(a)), 2n);

export const hacoversin = (a: T): BigNumber => divide(subtract(1n, sin(a)), 2n);

export const hacovercosin = (a: T): BigNumber => divide(add(1n, sin(a)), 2n);

export const gd = (a: T): BigNumber => multiply(2n, atan(tanh(divide(a, 2n))));
