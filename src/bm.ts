interface BigNumber {
  comma: number;
  number: bigint;
  sign: boolean;
}

type TypeName<T> = T;
type T = TypeName<bigint | BigNumber | number | string>;

class DomainError extends RangeError {
  constructor(given: string, expected: string) {
    super(`Number out of domain. Given: ${given}. Expected: ${expected}`);
    this.name = 'DomainError';
  }
}

const normalize = (a: T): BigNumber => {
  switch (typeof a) {
    case 'number':
      a = String(a);
      return normalize({
        comma: a.indexOf('.') === -1 ? 0 : a.indexOf('.') + 1 - a.length,
        number: BigInt(a.split('.').join('').replace('-', '')),
        sign: a.indexOf('-') > -1
      });
    case 'bigint':
      return {
        comma: 0,
        number: a < BigInt(0) ? -a : a,
        sign: a < BigInt(0)
      };
    case 'string':
      return normalize({
        comma: a.indexOf('.') === -1 ? 0 : a.indexOf('.') + 1 - a.length,
        number: BigInt(a.split('.').join('').replace('-', '')),
        sign: a.indexOf('-') > -1
      });
    case 'object':
      let x = String(a.number);
      if (x === '0') {
        return {
          comma: 0,
          number: BigInt(0),
          sign: false
        };
      }
      const sign = !(x.indexOf('-') > -1 === a.sign);
      let comma = Number(a.comma);
      x = x.replace('-', '');
      const arr = x.split('');
      for (;;) {
        if (arr[arr.length - 1] === '0') {
          comma++;
          arr.pop();
        } else {
          break;
        }
      }
      x = arr.join('');
      return {
        comma,
        number: BigInt(x),
        sign
      };
  }
};

/**
 * @domain Real numbers, Real numbers
 * @returns Sum of parameters
 */
const add = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);

  if (a.sign !== b.sign) {
    if (a.sign === true) {
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
const subtract = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);

  if (a.sign !== b.sign) {
    if (a.sign === true) {
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
const multiply = (a: T, b: T): BigNumber => {
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
const divide = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);

  if (b.number === BigInt(0)) {
    throw new DomainError('0', 'numbers other than 0');
  }
  const len = String(a.number).length - String(b.number).length - (String(b.number).length + b.comma + 1);
  if (len > 0) {
    b.number *= BigInt(10) ** BigInt(len);
    b.comma -= len;
  } else {
    a.number *= BigInt(10) ** BigInt(-len);
    a.comma += len;
  }
  const n = a.number / b.number;
  let d = '';

  let c = -Math.abs(a.comma - b.comma);

  a.number = (a.number - n * b.number) * BigInt(10);

  let i = 40;
  while (i !== 0) {
    d += String(a.number / b.number);
    a.number = (a.number - (a.number / b.number) * b.number) * BigInt(10);
    c--;
    i--;
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
const ln = (a: T) => {
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
      ten = subtract(ten, {
        comma: -57,
        number: BigInt('1791759469228055000812477358380702272722990692183004705855'),
        sign: false
      });
      a = multiply(a, 6);
      break;
  }

  let sum = divide(subtract(a, 1), add(a, 1));
  let p = normalize(sum);
  const k = multiply(sum, sum);

  for (let i = 1; i < 20; i++) {
    p = multiply(p, k);
    sum = add(sum, divide(p, 2 * i + 1));
  }

  return add(ten, multiply(sum, 2));
};

/**
 * @domain Real numbers, Real numbers | both can't be 0 at the same time
 * @returns Result of the exponentiation of parameters
 */
const power = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);
  if (a.number === BigInt(0) && b.number === BigInt(0)) {
    throw new DomainError('0 ^ 0', 'real numbers | both can\'t be 0 at the same time');
  }

  if (b.comma > -1) {
    if (b.sign) {
      a = divide(1, a);
    }
    a.comma = a.comma * Number(b.number);
    a.number = a.number ** BigInt(b.number);
    return a;
  }
  return exp(multiply(b, ln(a)));
};

/**
 * @domain Numbers greater or equal 0
 * @returns Square root of number
 */
const sqrt = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign) {
    throw new DomainError(stringify(a), 'numbers greater or equal 0');
  }
  if (a.number === BigInt(0)) {
    return normalize(0);
  }

  let aprox = normalize(BigInt(10) ** BigInt(Math.floor((String(a.number).length + a.comma) / 2)));

  for (let i = 0; i < 20; i++) {
    aprox = multiply(add(divide(a, aprox), aprox), 0.5);
  }

  return aprox;
};

/**
 * @domain Real numbers
 * @returns Result of the exponentiation of e ^ parameter
 */
const exp = (a: T): BigNumber => {
  a = normalize(a);

  const str = String(a.number);

  const tens = str.length + a.comma;
  const d = BigInt(str.substring(0, tens) || 0);
  a.number = BigInt(str.substring(tens));

  const n = power(E, d);

  let b = normalize(1);
  let f = BigInt(1);

  for (let i = BigInt(1); i < BigInt(50); i++) {
    f *= i;
    b = add(b, divide({
      comma: a.comma * Number(i),
      number: a.number ** i,
      sign: a.sign
    }, f));
  }

  return multiply(b, n);
};

/**
 * @domain Real numbers
 * @range [-1, 1]
 * @returns Sine of parameter
 */
const sin = (a: T): BigNumber => {
  a = normalize(a);

  const r = divide(a, PI2);
  const tens = String(r.number).length + r.comma;
  const d = BigInt(String(r.number).substring(0, tens) || 0);
  const reduce = subtract(a, multiply(d, PI2));
  let s = normalize(reduce);
  let k = normalize(reduce);

  const k2 = multiply(reduce, reduce);

  let f = BigInt(1);

  for (let i = 1; i < 20; i++) {
    f *= BigInt(i * (4 * i + 2));
    k = multiply(k, k2);
    if (i % 2 === 0) {
      s = add(s, divide(k, f));
    } else {
      s = subtract(s, divide(k, f));
    }
  }
  if (s.comma < -30) {
    const c = s.comma + 30;
    s.comma = -30;
    s.number = BigInt(String(s.number).substring(0, String(s.number).length + c));
  }

  return normalize(s);
};

/**
 * @domain Real numbers
 * @range [-1, 1]
 * @returns Cosine of parameter
 */
const cos = (a: T): BigNumber => sin(subtract(PI2, a));

/**
 * @domain Real numbers & x != PI/2 + k*PI (k - integer)
 * @range Real numbers
 * @returns Tangent of parameter
 */
const tan = (a: T): BigNumber => {
  a = normalize(a);
  const c = cos(a);
  if (c.number === BigInt(0)) {
    throw new DomainError(stringify(a), 'real numbers & x != PI/2 + k*PI (k - integer)');
  }
  return divide(sin(a), c);
};

/**
 * @domain Real numbers & x != k*PI (k - integer)
 * @range Real numbers
 * @returns Cotangent of parameter
 */
const cot = (a: T): BigNumber => {
  a = normalize(a);
  const s = sin(a);
  if (s.number === BigInt(0)) {
    throw new DomainError(stringify(a), 'real numbers & x != k*PI (k - integer)');
  }
  return divide(cos(a), s);
};

/**
 * @domain Real numbers & x != PI/2 + k*PI (k - integer)
 * @range Real numbers
 * @returns Secant of parameter
 */
const sec = (a: T): BigNumber => {
  a = normalize(a);
  const c = cos(a);
  if (c.number === BigInt(0)) {
    throw new DomainError(stringify(a), 'real numbers & x != PI/2 + k*PI (k - integer)');
  }
  return divide(1, c);
};

/**
 * @domain Real numbers & x != k*PI (k - integer)
 * @range Real numbers
 * @returns Cosecant of parameter
 */
const csc = (a: T): BigNumber => {
  a = normalize(a);
  const s = sin(a);
  if (s.number === BigInt(0)) {
    throw new DomainError(stringify(a), 'real numbers & x != k*PI (k - integer)');
  }
  return divide(1, s);
};

/**
 * @domain [-1, 1]
 * @range [-PI/2, PI/2]
 * @returns Inverse sine of parameter
 */
const asin = (a: T): BigNumber => {
  a = normalize(a);
  if (String(a.number).length > Math.abs(a.comma)) {
    if (a.number === BigInt(1)) {
      return normalize(PI2);
    }
    throw new DomainError(stringify(a), 'numbers from range [-1, 1]');
  }

  let s = normalize(a);
  let k = normalize(a);

  let b = normalize(1);

  a = multiply(a, a);

  for (let i = 0; i < 30; i++) {
    k = multiply(k, a);
    b = multiply(b, divide(i * 2 + 1, i * 2 + 2));

    s = add(s, divide(multiply(k, b), 2 * i + 3));
  }

  return s;
};

/**
 * @domain [-1, 1]
 * @range [0, PI]
 * @returns Inverse cosine of parameter
 */
const acos = (a: T): BigNumber => subtract(PI2, asin(a));

/**
 * @domain Real numbers
 * @range [-PI/2, PI/2]
 * @returns Inverse tangent of parameter
 */
const atan = (a: T): BigNumber => {
  a = normalize(a);

  a = divide(a, add(1, sqrt(add(1, power(a, 2)))));

  let s = normalize(a);
  let k = normalize(a);

  const d2 = multiply(a, a);

  for (let i = 1; i < 30; i++) {
    k = multiply(k, d2);
    if (i % 2 === 1) {
      s = subtract(s, divide(k, 2 * i + 1));
    } else {
      s = add(s, divide(k, 2 * i + 1));
    }
  }

  return multiply(s, 2);
};

/**
 * @domain Real numbers
 * @range [0, PI]
 * @returns Inverse cotangent of parameter
 */
const acot = (a: T): BigNumber => subtract(PI2, atan(a));

/**
 * @domain Real numbers without (-1, 1)
 * @range [0, PI] \ {PI/2}
 * @returns Inverse secant of parameter
 */
const asec = (a: T): BigNumber => {
  a = normalize(a);
  if (String(a.number).length <= Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers not from range (-1, 1)');
  }
  return acos(divide(1, a));
};

/**
 * @domain Real numbers without (-1, 1)
 * @range [-PI/2, PI/2] \ {0}
 * @returns Inverse cosecant of parameter
 */
const acsc = (a: T): BigNumber => {
  a = normalize(a);
  if (String(a.number).length <= Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers not from range (-1, 1)');
  }
  return asin(divide(1, a));
};

/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Hyperbolic sine of parameter
 */
const sinh = (a: T): BigNumber => {
  a = exp(a);
  return divide(subtract(a, divide(1, a)), 2);
};

/**
 * @domain Real numbers
 * @range Numbers greater or equal 1
 * @returns Hyperbolic cosine of parameter
 */
const cosh = (a: T): BigNumber => {
  a = exp(a);
  return divide(add(a, divide(1, a)), 2);
};

/**
 * @domain Real numbers
 * @range (-1, 1)
 * @returns Hyperbolic tangent of parameter
 */
const tanh = (a: T): BigNumber => {
  a = exp(a);
  return divide(subtract(a, divide(1, a)), add(a, divide(1, a)));
};

/**
 * @domain Real numbers without 0
 * @range Real numbers without [-1, 1]
 * @returns Hyperbolic cotangent of parameter
 */
const coth = (a: T): BigNumber => {
  a = normalize(a);
  if (a.number === BigInt(0)) {
    throw new DomainError('0', 'real numbers without 0');
  }
  a = exp(a);
  return divide(add(a, divide(1, a)), subtract(a, divide(1, a)));
};

/**
 * @domain Real numbers
 * @range (0, 1)
 * @returns Hyperbolic secant of parameter
 */
const sech = (a: T): BigNumber => {
  a = exp(a);
  return divide(2, add(a, divide(1, a)));
};

/**
 * @domain Real numbers without 0
 * @range Real numbers without 0
 * @returns Hyperbolic cosecant of parameter
 */
const csch = (a: T): BigNumber => {
  a = normalize(a);
  if (a.number === BigInt(0)) {
    throw new DomainError('0', 'real numbers without 0');
  }
  a = exp(a);
  return divide(2, subtract(a, divide(1, a)));
};

/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Inverse hyperbolic sine of parameter
 */
const asinh = (a: T): BigNumber => {
  a = normalize(a);
  return ln(add(a, sqrt(add(power(a, 2), 1))));
};

/**
 * @domain Real numbers greater or equal 1
 * @range Real numbers greater or equal 0
 * @returns Inverse hyperbolic cosine of parameter
 */
const acosh = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign || String(a.number).length <= Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers greater or equal 1');
  }
  if (a.number === BigInt(1)) {
    return {
      comma: 0,
      number: BigInt(0),
      sign: false
    };
  }
  return ln(add(a, sqrt(subtract(power(a, 2), 1))));
};

/**
 * @domain (-1, 1)
 * @range Real numbers
 * @returns Inverse hyperbolic tangent of parameter
 */
const atanh = (a: T): BigNumber => {
  a = normalize(a);
  if (String(a.number).length > Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'numbers from range (-1, 1)');
  }
  return divide(ln(divide(add(1, a), subtract(1, a))), 2);
};

/**
 * @domain Real numbers without [-1, 1]
 * @range Real numbers
 * @returns Inverse hyperbolic cotangent of parameter
 */
const acoth = (a: T): BigNumber => {
  a = normalize(a);
  if (String(a.number).length <= Math.abs(a.comma) || a.number === BigInt(1) || a.number === BigInt(0)) {
    throw new DomainError(stringify(a), 'numbers not from range [-1, 1]');
  }
  return divide(ln(divide(add(a, 1), subtract(a, 1))), 2);
};

/**
 * @domain (0, 1]
 * @range Real numbers greater of equal 0
 * @returns Inverse hyperbolic secant of parameter
 */
const asech = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign || String(a.number).length > Math.abs(a.comma)) {
    if (stringify(a) === '1') {
      return {
        comma: 0,
        number: BigInt(0),
        sign: false
      };
    }
    throw new DomainError(stringify(a), 'numbers from range (0,1]');
  }
  return ln(divide(add(1, sqrt(subtract(1, power(a, 2)))), a));
};

/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Inverse hyperbolic cosecant of parameter
 */
const acsch = (a: T): BigNumber => {
  a = normalize(a);
  const b = divide(1, a);
  return ln(add(b, sqrt(add(divide(b, a), 1))));
};

const LOG10: BigNumber = Object.freeze({
  comma: -57,
  number: BigInt('2302585092994045684017991454684364207601101488628772976033'),
  sign: false
});

const LOG2: BigNumber = Object.freeze({
  comma: -57,
  number: BigInt('693147180559945309417232121458176568075500134360255254120'),
  sign: false
});

const PI2: BigNumber = Object.freeze({
  comma: -57,
  number: BigInt('1570796326794896619231321691639751442098584699687552910487'),
  sign: false
});

const PI: BigNumber = Object.freeze({
  comma: -57,
  number: BigInt('3141592653589793238462643383279502884197169399375105820974'),
  sign: false
});

const E: BigNumber = Object.freeze({
  comma: -227,
  number: BigInt('271828182845904523536028747135266249775724709369995957496696762772407663035354759457138217852516642742746639193200305992181741359662904357290033429526059563073813232862794349076323382988075319525101901157383418793070215408914993'),
  sign: false
});

const stringify = (a: BigNumber): string => {
  const s = String(a.number);
  if (a.comma < 0) {
    const len = s.length + a.comma;
    if (len > 0) {
      return `${a.sign ? '-' : ''}${s.substring(0, len)}.${s.substring(len)}`;
    } else {
      return `${a.sign ? '-' : ''}0.${'0'.repeat(-len) + s}`;
    }
  } else {
    return `${a.sign ? '-' : ''}${s}${'0'.repeat(a.comma)}`;
  }
};

export {
  DomainError
};

export default {
  acos,
  acosh,
  acot,
  acoth,
  acsc,
  acsch,
  add,
  asec,
  asech,
  asin,
  asinh,
  atan,
  atanh,
  cos,
  cosh,
  cot,
  coth,
  csc,
  csch,
  divide,
  exp,
  ln,
  LOG10,
  LOG2,
  multiply,
  PI,
  PI2,
  power,
  sec,
  sech,
  sin,
  sinh,
  sqrt,
  stringify,
  subtract,
  tan,
  tanh
};
