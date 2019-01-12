import { LOG10, LOG2 } from './constants';
import { sinh } from './trigonometry';
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
    a.number *= BigInt(10) ** BigInt(max - min);
  } else {
    b.number *= BigInt(10) ** BigInt(max - min);
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
    a.number *= BigInt(10) ** BigInt(max - min);
  } else {
    b.number *= BigInt(10) ** BigInt(max - min);
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

  const len = String(a.number).length - String(b.number).length;
  if (len > 0) {
    b.number *= BigInt(10) ** BigInt(len);
    b.comma -= len;
  } else {
    a.number *= BigInt(10) ** BigInt(-len);
    a.comma += len;
  }
  const n = a.number / b.number;
  let d = '';

  let c = a.comma - b.comma;

  a.number = (a.number - n * b.number) * BigInt(10);

  while (d.length !== 50) {
    if (a.number === BigInt(0)) {
      break;
    }
    d += String(a.number / b.number);
    a.number = (a.number - (a.number / b.number) * b.number) * BigInt(10);
    c -= 1;
  }

  if (c > 0) {
    return normalize({
      comma: 0,
      number: BigInt(n + d) * BigInt(10) ** BigInt(c),
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
  if (a.sign || a.number === BigInt(0)) {
    throw new DomainError(stringify(a), 'numbers greater than 0');
  }

  const tens = String(a.number).length + a.comma;
  let ten = multiply(tens, LOG10);

  a.comma -= tens;

  switch (String(a.number)[0]) {
    case '5':
    case '4':
      ten = subtract(ten, LOG2);
      a = multiply(a, 2);
      break;
    case '3':
      ten = subtract(ten, {
        comma: -57,
        number: BigInt('1098612288668109691395245236922525704647490557822749451734'),
        sign: false
      });
      a = multiply(a, 3);
      break;
    case '2':
      ten = subtract(ten, multiply(LOG2, 2));
      a = multiply(a, 4);
      break;
    case '1':
      if (Number(String(a.number)[1] || 0) > 5) {
        ten = subtract(ten, {
          comma: -57,
          number: BigInt('1791759469228055000812477358380702272722990692183004705855'),
          sign: false
        });
        a = multiply(a, 6);
      } else {
        ten = subtract(ten, {
          comma: -57,
          number: BigInt('2079441541679835928251696364374529704226500403080765762362'),
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
  if (a.number === BigInt(0) && b.number === BigInt(0)) {
    throw new DomainError('0 ^ 0', 'real numbers | both can\'t be 0 at the same time');
  }

  if (b.comma > -1) {
    if (b.sign) {
      a = divide(1, a);
    }
    if (a.sign) {
      a.sign = Number(b.number) % 2 === 1;
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

/**
 * @domain Numbers greater or equal 0
 * @returns Square root of number
 */
export const sqrt = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign) {
    throw new DomainError(stringify(a), 'numbers greater or equal 0');
  }
  if (a.number === BigInt(0)) {
    return normalize(0);
  }

  let aprox = power(10, BigInt(Math.floor((String(a.number).length + a.comma) / 2)));

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
