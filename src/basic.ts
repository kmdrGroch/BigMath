import { lt, lte } from './comparison';
import { LOG10, LOG2, PI, HALF, TWO, ONE, THREE, FOUR, SIX, EIGHT, MINUSONE } from './constants';
import { BigNumber, T } from './interfaces';
import { sin } from './trigonometry';
import { abs, DomainError, finalize, normalize, stringify, trim, gcd } from './util';
import { config } from './BigMath';

/**
 * @domain Real numbers, Real numbers
 * @returns Sum of parameters
 */
export const add = (a: BigNumber, b: BigNumber): BigNumber => {
  a = { ...a };
  b = { ...b };

  if (a.sign !== b.sign) {
    if (a.sign) {
      a.sign = false;

      return subtract(b, a);
    }
    b.sign = false;

    return subtract(a, b);
  }

  if (a.comma === b.comma) {
    return trim({
      comma: a.comma,
      number: a.number + b.number,
      sign: a.sign
    });
  }

  if (a.comma > b.comma) {
    return trim({
      comma: b.comma,
      number: a.number * 10n ** BigInt(a.comma - b.comma) + b.number,
      sign: a.sign
    });
  }

  return trim({
    comma: a.comma,
    number: a.number + b.number * 10n ** BigInt(b.comma - a.comma),
    sign: a.sign
  });
};

/**
 * @domain Real numbers, Real numbers
 * @returns Difference of parameters
 */
export const subtract = (a: BigNumber, b: BigNumber): BigNumber => {
  a = { ...a };
  b = { ...b };

  if (a.sign !== b.sign) {
    if (a.sign) {
      b.sign = true;

      return add(a, b);
    }
    b.sign = false;

    return add(a, b);
  }

  if (a.comma === b.comma) {
    return trim({
      comma: a.comma,
      number: a.number - b.number,
      sign: a.sign
    });
  }

  if (a.comma > b.comma) {
    return trim({
      comma: b.comma,
      number: a.number * 10n ** BigInt(a.comma - b.comma) - b.number,
      sign: a.sign
    });
  }

  return trim({
    comma: a.comma,
    number: a.number - b.number * 10n ** BigInt(b.comma - a.comma),
    sign: a.sign
  });
};

/**
 * @domain Real numbers
 * @returns Product of parameters
 */
export const multiply = (a: BigNumber, b: BigNumber): BigNumber =>
  trim({
    comma: a.comma + b.comma,
    number: a.number * b.number,
    sign: a.sign !== b.sign
  });

/**
 * @domain Real numbers, Real numbers other than 0
 * @returns Quotient of parameters
 */
export const divide = (a: BigNumber, b: BigNumber, pure = false): BigNumber => {
  a = { ...a };
  b = { ...b };

  if (b.number === 0n) {
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

  a.number = (a.number - n * b.number) * 10n;

  let i = 0;
  let f;
  while (i !== config.precision + (pure ? 1 : 11)) {
    if (a.number === 0n) {
      break;
    }
    f = a.number / b.number;
    d += `${f}`;
    a.number = (a.number - f * b.number) * 10n;
    i++;
  }

  const c = a.comma - b.comma - i;

  if (c > 0) {
    return {
      comma: 0,
      number: BigInt(`${n}${d}`) * 10n ** BigInt(c),
      sign: a.sign !== b.sign
    };
  }

  return finalize(
    {
      comma: c,
      number: BigInt(`${n}${d}`),
      sign: a.sign !== b.sign
    },
    -config.precision - (pure ? 0 : 10)
  );
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
  let ten = multiply(normalize(tens), LOG10);

  a.comma -= tens;

  switch (`${a.number}`[0]) {
    case '5':
    case '4':
      ten = subtract(ten, LOG2);
      a = multiply(a, TWO);
      break;
    case '3':
      ten = subtract(ten, {
        comma: -57,
        number: 1098612288668109691395245236922525704647490557822749451734n,
        sign: false
      });
      a = multiply(a, THREE);
      break;
    case '2':
      ten = subtract(ten, multiply(LOG2, TWO));
      a = multiply(a, FOUR);
      break;
    case '1':
      if (+(`${a.number}`[1] || 0) > 5) {
        ten = subtract(ten, {
          comma: -57,
          number: 1791759469228055000812477358380702272722990692183004705855n,
          sign: false
        });
        a = multiply(a, SIX);
      } else {
        ten = subtract(ten, {
          comma: -57,
          number: 2079441541679835928251696364374529704226500403080765762362n,
          sign: false
        });
        a = multiply(a, EIGHT);
      }
  }

  let sum = divide(subtract(a, ONE), add(a, ONE));
  let p = { ...sum };
  const double = multiply(sum, sum);
  let start1 = add(THREE, double);
  const coef1 = add(FOUR, multiply(FOUR, double));
  const quad = multiply(double, double);
  let i = 5n;

  let sum1 = multiply(divide(p, THREE), start1);

  let sum2;

  const ErrorConst = {
    comma: -config.precision,
    number: 1n,
    sign: false
  };

  while (true) {
    p = multiply(p, quad);
    start1 = add(start1, coef1);

    sum2 = add(sum1, multiply(divide(p, normalize(i * (i + 2n))), start1));

    if (lt(abs(subtract(sum2, sum1)), ErrorConst)) {
      return finalize(add(ten, multiply(sum2, TWO)));
    }

    i += 4n;
    sum1 = sum2;
  }
};

/**
 * @domain Numbers greater than -1
 * @returns Natural logarithm (base e) of a number + 1
 */
export const ln1p = (a: T): BigNumber => {
  a = normalize(a);

  if (lte(a, MINUSONE)) {
    throw new DomainError(stringify(a), 'numbers greater than -1');
  }

  return ln(add(ONE, a));
};

/**
 * @domain Numbers greater than 0
 * @returns Logarithm base 10 of a number
 */
export const log10 = (a: T): BigNumber => finalize(divide(ln(a), LOG10));

/**
 * @domain Numbers greater than 0
 * @returns Logarithm base 2 of a number
 */
export const log2 = (a: T): BigNumber => finalize(divide(ln(a), LOG2));

/**
 * @domain Real numbers, Real numbers | both can't be 0 at the same time | not negative ^ non-integer
 * @returns Result of the exponentiation of parameters
 */
export const power = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);
  if (a.number === 0n && b.number === 0n) {
    throw new DomainError('0 ^ 0', "real numbers | both can't be 0 at the same time");
  }

  if (b.comma > -1) {
    if (b.sign) {
      a = divide(ONE, a);
    }
    if (a.sign) {
      a.sign = b.number % 2n === 1n;
    }
    a.comma = a.comma * +`${b.number}`;
    a.number = a.number ** b.number;

    return a;
  }

  if (a.sign) {
    const tens = 10n ** BigInt(-b.comma);
    const g = gcd(b.number, tens);
    if ((tens / g) % 2n === 0n) {
      throw new DomainError(`${stringify(a)} ^ ${stringify(b)}`, 'real numbers | not negative ^ non-integer');
    }

    a.sign = false;

    return {
      ...finalize(exp(multiply(b, ln(a)))),
      sign: true
    };
  }

  return finalize(exp(multiply(b, ln(a))));
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
    return {
      comma: 0,
      number: 0n,
      sign: false
    };
  }

  const last = a.number % 10n;
  let mid;

  if (-a.comma % 2 === 0 && !(last === 2n || last === 3n || last === 7n || last === 8n)) {
    const len = BigInt(`${a.number}`.length);
    let k;
    let end;

    if (len % 2n === 1n) {
      k = 10n ** ((len - 1n) / 2n);
      end = 4n * k;
    } else {
      end = 10n ** (len / 2n - 1n);
      k = 3n * end;
    }

    while (k <= end) {
      mid = (k + end) / 2n;
      if (mid ** 2n === a.number) {
        return trim({
          comma: a.comma / 2,
          number: mid,
          sign: false
        });
      }
      if (mid ** 2n < a.number) {
        k = mid + 1n;
      } else {
        end = mid - 1n;
      }
    }
  }

  let aprox = normalize(mid || 10n ** BigInt(Math.floor((`${a.number}`.length + a.comma) / 2)));
  let aprox1;

  const ErrorConst = {
    comma: -config.precision,
    number: 1n,
    sign: false
  };

  while (true) {
    aprox1 = multiply(add(divide(a, aprox), aprox), HALF);
    if (lt(abs(subtract(aprox1, aprox)), ErrorConst)) {
      return finalize(aprox1);
    }
    aprox = aprox1;
  }
};

/**
 * @domain Numbers greater or equal 0
 * @returns Cubic root of number
 */
export const cbrt = (a: T): BigNumber => {
  a = normalize(a);

  if (a.number === 0n) {
    return {
      comma: 0,
      number: 0n,
      sign: false
    };
  }

  let mid;

  if (-a.comma % 3 === 0) {
    const len = BigInt(`${a.number}`.length);
    let k;
    let end;

    if (len % 3n === 1n) {
      k = 10n ** ((len - 1n) / 3n);
      end = 3n * k;
    } else if (len % 3n === 2n) {
      k = 2n * 10n ** ((len - 2n) / 3n);
      end = 5n * 10n ** ((len - 2n) / 3n);
    } else {
      k = 4n * 10n ** (len / 3n);
      end = 10n ** (len / 3n + 1n);
    }

    while (k <= end) {
      mid = (k + end) / 2n;
      if (mid ** 3n === a.number) {
        return trim({
          comma: a.comma / 3,
          number: mid,
          sign: false
        });
      }
      if (mid ** 3n < a.number) {
        k = mid + 1n;
      } else {
        end = mid - 1n;
      }
    }
  }

  let aprox = normalize(mid || 10n ** BigInt(Math.floor((`${a.number}`.length + a.comma) / 3)));
  let aprox1;

  const ErrorConst = {
    comma: -config.precision,
    number: 1n,
    sign: false
  };

  while (true) {
    aprox1 = divide(add(divide(a, multiply(aprox, aprox)), multiply(aprox, TWO)), THREE);
    if (lt(abs(subtract(aprox1, aprox)), ErrorConst)) {
      return finalize(aprox1);
    }
    aprox = aprox1;
  }
};

/**
 * @domain Real numbers
 * @returns Result of the exponentiation of e ^ parameter
 */
export const exp = (a: T): BigNumber => {
  a = normalize(a);

  if (a.number === 0n) {
    return {
      comma: 0,
      number: 1n,
      sign: false
    };
  }

  let f = a.number / 10n ** BigInt(-a.comma);
  let i = 1n;

  while (f !== 0n) {
    f /= 2n;
    i *= 2n;
  }

  if (i !== 1n) {
    a = divide(a, normalize(i));
  }

  const inv = divide(ONE, a);
  a = multiply(a, a);

  const b = { ...a };

  let sum = {
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

  for (let k = 2n; ; k += 2n) {
    a = divide(a, normalize(k * (k - 1n)));
    sum1 = add(sum, multiply(a, add(multiply(normalize(k), inv), ONE)));
    if (lt(abs(subtract(sum1, sum)), ErrorConst)) {
      return finalize({
        comma: sum1.comma * +`${i}`,
        number: sum1.number ** i,
        sign: false
      });
    }
    a = multiply(a, b);
    sum = sum1;
  }
};

/**
 * @domain Real numbers
 * @returns Result of the exponentiation of e ^ parameter - 1
 */
export const expm1 = (a: T): BigNumber => subtract(exp(a), ONE);

export const doubleFactorial = (a: T): BigNumber => {
  a = normalize(a);
  if (a.comma !== 0 || a.sign) {
    throw new DomainError(stringify(a), 'positive integers');
  }

  let n = a.number;

  if (n < 7n) {
    return {
      comma: 0,
      number: [1n, 1n, 2n, 3n, 8n, 15n, 48n][+`${n}`],
      sign: false
    };
  }

  switch ((n + 1n) % 4n) {
    case 0n:
      const p = (n - 1n) / 2n;
      n++;
      let prod = 1n;

      for (let k = 1n; k <= p; k += 2n) {
        prod *= (n - k) * k;
      }

      return normalize(prod);
    case 2n:
      return normalize(n * doubleFactorial(n - 2n).number);
  }

  return normalize(2n ** (n / 2n) * factorial(n / 2n).number);
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

  const n = a.number;

  if (n < 7n) {
    return {
      comma: 0,
      number: [1n, 1n, 2n, 6n, 24n, 120n, 720n][+`${n}`],
      sign: false
    };
  }

  let nostart = false;
  const h = n / 2n;
  let s = h + 1n;
  let k = s + h;
  let f = (n & 1n) === 1n ? k : 1n;

  if ((h & 1n) === 1n) f = -f;
  k += 4n;

  function HyperFact(l: bigint): bigint {
    if (l > 1n) {
      const m = l >> 1n;
      return HyperFact(m) * HyperFact(l - m);
    }

    if (nostart) {
      s -= k -= 4n;
      return s;
    }
    nostart = true;

    return f;
  }

  return normalize(HyperFact(h + 1n) << h);
};

export const gamma = (a: T): BigNumber => {
  /*
    g = 7
    data taken from:
    http://my.fit.edu/~gabdo/gammacoeff.txt
  */

  a = normalize(a);

  if (a.comma === 0 && !a.sign) {
    return factorial(subtract(a, ONE));
  }

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

  if (a.sign && a.comma === 0 && a.number % 2n === 0n) {
    throw new DomainError(stringify(a), 'not negative multiplications of 2');
  }

  let y;
  if (lte(a, HALF)) {
    y = divide(PI, multiply(sin(multiply(PI, a)), gamma(subtract(ONE, a))));
  } else {
    a = subtract(a, ONE);
    let x = normalize(p1);
    for (let i = 0; i < p.length; i++) {
      x = add(x, divide(normalize(p[i]), add(a, normalize(i + 1))));
    }
    const t = add(a, normalize(p.length - 0.5));
    y = multiply(multiply(multiply(sqrt(multiply(PI, TWO)), power(t, add(a, HALF))), exp(multiply(t, MINUSONE))), x);
  }

  return finalize(y);
};

export const superFactorial = (a: T): BigNumber => {
  a = normalize(a);
  if (a.comma !== 0 || a.sign) {
    throw new DomainError(stringify(a), 'positive integers');
  }

  if (a.number < 2n) {
    return {
      comma: 0,
      number: 1n,
      sign: false
    };
  }

  if (a.number % 2n === 0n) {
    let prod = 1n;
    let fact = 1n;
    let prod2 = 1n;

    for (let i = 2n; i < a.number; i += 2n) {
      fact *= i * (i + 1n);
      prod2 *= i;
      prod *= fact;
    }

    return {
      comma: 0,
      number: prod2 * a.number * prod ** 2n,
      sign: false
    };
  }

  a.number -= 1n;
  let prod = 1n;
  let fact = 1n;
  let prod2 = 1n;

  for (let i = 2n; i < a.number; i += 2n) {
    fact *= i * (i + 1n);
    prod2 *= i;
    prod *= fact;
  }

  return {
    comma: 0,
    number: prod2 * prod ** 2n * fact * a.number * (a.number + 1n) * a.number,
    sign: false
  };
};
