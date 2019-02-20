import { lte } from './comparison';
import { LOG10, LOG2, PI, primes } from './constants';
import { BigNumber, T } from './interfaces';
import { sin, sinh } from './trigonometry';
import { DomainError, normalize, stringify } from './util';

/**
 * @domain Real numbers, Real numbers
 * @returns Sum of parameters
 */
export const add = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);

  if (a.sign !== b.sign) {
    if (a.sign) {
      a.sign = false;

      return subtract(b, a);
    }
    b.sign = false;

    return subtract(a, b);
  }

  const max = Math.max(a.comma, b.comma);
  const min = Math.min(a.comma, b.comma);
  if (a.comma > b.comma) {
    a.number *= 10n ** BigInt(max - min);
  } else {
    b.number *= 10n ** BigInt(max - min);
  }

  return normalize({
    comma: min,
    number: a.number + b.number,
    sign: a.sign
  });
};

/**
 * @domain Real numbers, Real numbers
 * @returns Difference of parameters
 */
export const subtract = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);

  if (a.sign !== b.sign) {
    if (a.sign) {
      b.sign = true;

      return add(a, b);
    }
    b.sign = false;

    return add(a, b);
  }

  const max = Math.max(a.comma, b.comma);
  const min = Math.min(a.comma, b.comma);
  if (a.comma > b.comma) {
    a.number *= 10n ** BigInt(max - min);
  } else {
    b.number *= 10n ** BigInt(max - min);
  }

  return normalize({
    comma: min,
    number: a.number - b.number,
    sign: a.sign
  });
};

/**
 * @domain Real numbers
 * @returns Product of parameters
 */
export const multiply = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);

  return normalize({
    comma: a.comma + b.comma,
    number: a.number * b.number,
    sign: a.sign !== b.sign
  });
};

/**
 * @domain Real numbers, Real numbers other than 0
 * @returns Quotient of parameters
 */
export const divide = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);

  if (b.number === BigInt(0)) {
    throw new DomainError('0', 'numbers other than 0');
  }

  const len = `${a.number}`.length - `${b.number}`.length;
  if (len > 0) {
    b.number *= 10n ** BigInt(len);
    b.comma -= len;
  } else {
    a.number *= 10n ** BigInt(-len);
    a.comma += len;
  }
  const n = a.number / b.number;
  let d = '';

  let c = a.comma - b.comma;

  a.number = (a.number - n * b.number) * 10n;

  while (d.length !== 50) {
    if (a.number === BigInt(0)) {
      break;
    }
    d += `${a.number / b.number}`;
    a.number = (a.number - (a.number / b.number) * b.number) * BigInt(10);
    c -= 1;
  }

  if (c > 0) {
    return normalize({
      comma: 0,
      number: BigInt(n + d) * 10n ** BigInt(c),
      sign: a.sign !== b.sign
    });
  }

  return normalize({
    comma: c,
    number: BigInt(n + d),
    sign: a.sign !== b.sign
  });
};

/**
 * @domain Numbers greater than 0
 * @returns Natural logarithm (base e) of a number
 */
export const ln = (a: T) => {
  a = normalize(a);
  if (a.sign || a.number === 0n) {
    throw new DomainError(stringify(a), 'numbers greater than 0');
  }

  const tens = `${a.number}`.length + a.comma;
  let ten = multiply(tens, LOG10);

  a.comma -= tens;

  switch (`${a.number}`[0]) {
    case '5':
    case '4':
      ten = subtract(ten, LOG2);
      a = multiply(a, 2);
      break;
    case '3':
      ten = subtract(ten, {
        comma: -57,
        number: 1098612288668109691395245236922525704647490557822749451734n,
        sign: false
      });
      a = multiply(a, 3);
      break;
    case '2':
      ten = subtract(ten, multiply(LOG2, 2));
      a = multiply(a, 4);
      break;
    case '1':
      if (+(`${a.number}`[1] || 0) > 5) {
        ten = subtract(ten, {
          comma: -57,
          number: 1791759469228055000812477358380702272722990692183004705855n,
          sign: false
        });
        a = multiply(a, 6);
      } else {
        ten = subtract(ten, {
          comma: -57,
          number: 2079441541679835928251696364374529704226500403080765762362n,
          sign: false
        });
        a = multiply(a, 8);
      }
  }

  let sum = divide(subtract(a, 1), add(a, 1));
  let p = normalize(sum);
  const k = multiply(sum, sum);

  for (let i = 1; i < 20; i += 1) {
    p = multiply(p, k);
    sum = add(sum, divide(p, i * 2 + 1));
  }

  return add(ten, multiply(sum, 2));
};

/**
 * @domain Real numbers, Real numbers | both can't be 0 at the same time | not negative ^ non-integer
 * @returns Result of the exponentiation of parameters
 */
export const power = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);
  if (a.number === 0n && b.number === 0n) {
    throw new DomainError('0 ^ 0', 'real numbers | both can\'t be 0 at the same time');
  }

  if (b.comma > -1) {
    if (b.sign) {
      a = divide(1, a);
    }
    if (a.sign) {
      a.sign = b.number % 2n === 1n;
    }
    a.comma = a.comma * Number(b.number);
    a.number = a.number ** BigInt(b.number);

    return a;
  }
  if (a.sign) {
    throw new DomainError(`${stringify(a)} ^ ${stringify(b)}`, 'real numbers | not negative ^ non-integer');
  }

  return exp(multiply(b, ln(a)));
};

const sqrtInteger = (n: bigint): bigint => {
  let prod = 1n;

  for (const prime of primes) {
    if (prime > n) {
      break;
    }
    const pow = prime ** 2n;
    while (n % pow === 0n) {
      n /= pow;
      prod *= prime;
    }
  }

  if (n > 1n) {
    return -1n;
  }

  return prod;
};

/**
 * @domain Numbers greater or equal 0
 * @returns Square root of number
 */
export const sqrt = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign) {
    throw new DomainError(stringify(a), 'numbers greater or equal 0');
  }
  if (a.number === 0n) {
    return normalize(0);
  }

  let num = a.number;
  if (-a.comma % 2 === 0 && num < 2n ** 32n) {
    const comma = a.comma / 2;
    num = sqrtInteger(num);
    if (num !== -1n) {
      return normalize({
        comma,
        number: num,
        sign: false
      });
    }
  }

  let aprox = power(10, BigInt(Math.floor((`${a.number}`.length + a.comma) / 2)));

  for (let i = 0; i < 20; i += 1) {
    aprox = multiply(add(divide(a, aprox), aprox), 0.5);
  }

  return aprox;
};

/**
 * @domain Real numbers
 * @returns Result of the exponentiation of e ^ parameter
 */
export const exp = (a: T): BigNumber => {
  const sh = sinh(a);

  return add(sh, sqrt(add(1, multiply(sh, sh))));
};

/**
 * @domain Integers
 * @returns Product of all integers until given number
 */
export const factorial = (a: T): BigNumber => {
  a = normalize(a);
  if (a.comma !== 0 || a.sign) {
    throw new DomainError(stringify(a), 'positive integers');
  }
  let k = 1n;
  for (let i = 2n; i <= a.number; i += 1n) {
    k *= i;
  }

  return normalize(k);
};

export const gamma = (a: T): BigNumber => {
  /*
    g = 7
    data taken from:
    http://my.fit.edu/~gabdo/gammacoeff.txt
  */

  const p1 = '0.9999999999998099322768470047347829718009602570498980962898849358';
  const p = [
    '676.5203681218850985670091904440190381974449058924722569853678707',
    '-1259.139216722402870471560787552828410476730722910298369550296701',
    '771.3234287776530788486528258894307395627292390168566479072763666',
    '-176.6150291621405990658455135399941244433015398373585840448427972',
    '12.50734327868690481445893685327163629939919667813089937179501692',
    '-0.1385710952657201168955470698506320982416866194189568573645197562',
    '0.000009984369578019570859562668995694018788834042365371027657733820183',
    '0.0000001505632735149311558338355775386439360927036032480858107693939127'
  ];
  a = normalize(a);

  if (a.sign && a.comma === 0 && a.number % 2n === 0n) {
    throw new DomainError(stringify(a), 'not negative multiplications of 2');
  }

  let y;
  if (lte(a, 0.5)) {
    y = divide(PI, multiply(sin(multiply(PI, a)), gamma(subtract(1, a))));
  } else {
    a = subtract(a, 1);
    let x = normalize(p1);
    for (let i = 0; i < p.length; i += 1) {
      x = add(x, divide(p[i], add(a, i + 1)));
    }
    const t = add(a, p.length - 0.5);
    y = multiply(multiply(multiply(sqrt(multiply(PI, 2)), power(t, add(a, 0.5))), exp(multiply(t, -1))), x);
  }

  return y;
};
