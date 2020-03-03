import { add, divide, exp, ln, multiply, power, sqrt, subtract } from './basic';
import { config } from './BigMath';
import { gt, lt } from './comparison';
import { LOG2, PI, PI2, TWO, ONE, HALF, NINEHALF } from './constants';
import { BigNumber, T } from './interfaces';
import { abs, DomainError, normalize, stringify, finalize } from './util';

/**
 * @returns Arithmetic–geometric mean of parameters
 */
export const AGM = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);
  if (a.sign || b.sign) {
    throw new DomainError(`AGM(${stringify(a)}, ${stringify(b)})`, 'arguments have to be positive');
  }

  let c;
  let a1;

  const ErrorConst = {
    comma: -config.precision,
    number: 1n,
    sign: false
  };

  while (true) {
    c = { ...a };
    a1 = multiply(add(c, b), HALF);
    if (lt(abs(subtract(a1, a)), ErrorConst)) {
      return finalize(a1);
    }
    a = a1;
    b = sqrt(multiply(c, b));
  }
};

/**
 * @returns Complete elliptic integral of the first kind
 */
export const K = (a: T): BigNumber => {
  a = normalize(a);
  if (`${a.number}`.length > Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'number from range [-1, 1]');
  }

  return finalize(divide(PI2, AGM(ONE, sqrt(subtract(ONE, power(a, TWO))))));
};

/**
 * @returns Omega function (product logarithm)
 */
export const W = (a: T): BigNumber => {
  a = normalize(a);
  if (a.number === 0n) {
    return a;
  }
  let w = normalize('0.56714329040978387299996866221035554975381578');
  if (a.number === 1n && a.comma === 0 && !a.sign) {
    return w;
  }
  if (lt(a, divide(LOG2, normalize(-2n)))) {
    throw new DomainError(stringify(a), 'number bigger than -log(2) / 2');
  }

  let ex;
  let wjewj;
  let w1;
  let safeIterator = 0;

  const ErrorConst = {
    comma: -config.precision,
    number: 1n,
    sign: false
  };

  while (true) {
    ex = exp(w);
    wjewj = multiply(w, ex);
    w1 = subtract(
      w,
      divide(subtract(wjewj, a), subtract(add(wjewj, ex), divide(multiply(add(w, TWO), subtract(wjewj, a)), multiply(add(w, ONE), TWO))))
    );
    if (lt(abs(subtract(w, w1)), ErrorConst) || safeIterator === 100) {
      return finalize(w1);
    }
    w = w1;
    safeIterator++;
  }
};

/**
 * @returns y for the equation: y = x ** y [y = x ** x ** x ** ...]
 */
export const XY = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign || a.number === 0n || gt(a, sqrt(TWO))) {
    throw new DomainError(stringify(a), 'number bigger than 0 and less than sqrt(2)');
  }
  if (!a.sign && a.number === 1n && a.comma === 0) {
    return a;
  }
  a = ln(a);
  const b = { ...a };
  b.sign = !b.sign;
  a = divide(W(b), a);
  a.sign = !a.sign;

  return finalize(a);
};

export const erf = (a: T): BigNumber => {
  a = normalize(a);

  if (gt(abs(a), NINEHALF)) {
    return {
      comma: 0,
      number: 1n,
      sign: a.sign
    };
  }

  const a2 = multiply(a, a);
  let sum = { ...a };
  const fact = {
    comma: 0,
    number: 1n,
    sign: false
  };
  const k = {
    comma: 0,
    number: 1n,
    sign: false
  };

  let sum1;

  const ErrorConst = {
    comma: -config.precision,
    number: 1n,
    sign: false
  };

  for (let i = 1n; ; i++) {
    fact.number *= i;
    k.number += 2n;
    a = multiply(a, a2);

    sum1 = i % 2n === 1n ? subtract(sum, divide(a, multiply(fact, k))) : add(sum, divide(a, multiply(fact, k)));

    if (lt(abs(subtract(sum, sum1)), ErrorConst)) {
      return finalize(multiply(sum1, divide(TWO, sqrt(PI))));
    }
    sum = sum1;
  }
};
