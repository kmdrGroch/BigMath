interface BigNumber {
  comma: number;
  number: bigint;
  sign: boolean;
}

type TypeName<T> = T;
type T = TypeName<bigint | BigNumber | number | string>;

const normalize = (a: T): BigNumber => {
  switch (typeof a) {
    case 'bigint':
      return {
        comma: 0,
        number: a < BigInt(0) ? -a : a,
        sign: a < BigInt(0)
      };
    case 'number':
      a = String(a);
      return normalize({
        comma: a.indexOf('.') === -1 ? 0 : a.indexOf('.') + 1 - a.length,
        number: BigInt(a.split('.').join('').replace('-', '')),
        sign: a.indexOf('-') > -1
      });
    case 'string':
      return normalize({
        comma: a.indexOf('.') === -1 ? 0 : a.indexOf('.') + 1 - a.length,
        number: BigInt(a.split('.').join('').replace('-', '')),
        sign: a.indexOf('-') > -1
      });
    case 'object':
      let x = String(a.number);
      const sign = !(x.indexOf('-') > -1 === a.sign);
      x = x.replace('-', '');
      const arr = x.split('');
      for (;;) {
        if (a.comma >= 0) {
          break;
        }
        if (arr[arr.length - 1] === '0') {
          a.comma++;
          arr.pop();
        } else {
          break;
        }
      }
      x = arr.join('');
      return {
        comma: a.comma,
        number: BigInt(x),
        sign
      };
  }
  throw new TypeError('Placeholder');
};

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

const multiply = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);
  return normalize({
    comma: a.comma + b.comma,
    number: a.number * b.number,
    sign: a.sign !== b.sign
  });
};

const divide = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);

  if (b.number === BigInt(0)) {
    throw new RangeError('Range error!');
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

const ln = (a: T) => {
  a = normalize(a);

  const tens = String(a.number).length + a.comma;
  const ten = multiply(tens, LOG10);

  a.comma -= tens;

  let sum = divide(subtract(a, 1), add(a, 1));
  let p = normalize(sum);
  const k = multiply(sum, sum);

  for (let i = 1; i < 20; i++) {
    p = multiply(p, k);
    sum = add(sum, divide(p, 2 * i + 1));
  }

  return normalize(add(ten, multiply(sum, 2)));
};

const power = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);

  if (b.comma > -1) {
    if (b.sign) {
      b.sign = false;
      b = divide(1, b);
    }
    a.comma = a.comma * Number(b.number);
    a.number = a.number ** BigInt(b.number);
    return a;
  }
  return exp(multiply(b, ln(a)));
};

const sqrt = (a: T): BigNumber => {
  a = normalize(a);

  let aprox = normalize(BigInt(10) ** BigInt(Math.floor((String(a.number).length + a.comma) / 2)));

  for (let i = 0; i < 20; i++) {
    aprox = multiply(add(divide(a, aprox), aprox), 0.5);
  }

  return aprox;
};

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

const sin = (a: T): BigNumber => {
  a = normalize(a);

  const r = divide(a, PI2);
  const tens = String(r.number).length + r.comma;
  const d = BigInt(String(r.number).substring(0, tens) || 0);
  const reduce = subtract(a, multiply(d, PI2));
  let s = normalize(reduce);
  let k = normalize(reduce);

  let f = BigInt(1);

  for (let i = 1; i < 20; i++) {
    f *= BigInt(i * 2) * BigInt(2 * i + 1);
    k = multiply(k, multiply(reduce, reduce));
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

  return s;
};

const cos = (a: T): BigNumber => sin(subtract(PI2, a));

const tan = (a: T): BigNumber => divide(sin(a), cos(a));

const cot = (a: T): BigNumber => divide(cos(a), sin(a));

const sec = (a: T): BigNumber => divide(1, cos(a));

const csc = (a: T): BigNumber => divide(1, sin(a));

const asin = (a: T): BigNumber => {
  a = normalize(a);
  if (String(a.number).length > Math.abs(a.comma)) {
    throw new RangeError('Number out of range');
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

const acos = (a: T): BigNumber => asin(subtract(PI2, a));

const atan = (a: T): BigNumber => {
  a = normalize(a);

  let s = normalize(a);
  let k = normalize(a);

  let b = normalize(1);

  for (let i = 0; i < 30; i++) {
    k = multiply(k, multiply(a, a));
    b = multiply(b, divide(i * 2 + 1, i * 2 + 2));

    s = add(s, divide(multiply(k, b), 2 * i + 3));
  }

  return s;
};

const acot = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign) {
    return add(PI, atan(divide(1, a)));
  } else {
    return atan(divide(1, a));
  }
};

const asec = (a: T): BigNumber => acos(divide(PI2, a));

const acsc = (a: T): BigNumber => asin(divide(PI2, a));

const sinh = (a: T): BigNumber => {
  a = exp(a);
  return divide(subtract(a, divide(1, a)), 2);
};

const cosh = (a: T): BigNumber => {
  a = exp(a);
  return divide(add(a, divide(1, a)), 2);
};

const tanh = (a: T): BigNumber => {
  a = exp(a);
  return divide(subtract(a, divide(1, a)), add(a, divide(1, a)));
};

const coth = (a: T): BigNumber => {
  a = exp(a);
  return divide(add(a, divide(1, a)), subtract(a, divide(1, a)));
};

const sech = (a: T): BigNumber => {
  a = exp(a);
  return divide(2, add(a, divide(1, a)));
};

const csch = (a: T): BigNumber => {
  a = exp(a);
  return divide(2, subtract(a, divide(1, a)));
};

const asinh = (a: T): BigNumber => {
  a = normalize(a);
  return ln(add(a, sqrt(add(power(a, 2), 1))));
};

const acosh = (a: T): BigNumber => {
  a = normalize(a);
  return ln(add(a, sqrt(subtract(power(a, 2), 1))));
};

const atanh = (a: T): BigNumber => {
  a = normalize(a);
  return divide(ln(divide(add(1, a), subtract(1, a))), 2);
};

const acoth = (a: T): BigNumber => {
  a = normalize(a);
  return divide(ln(divide(add(a, 1), subtract(a, 1))), 2);
};

const asech = (a: T): BigNumber => {
  a = normalize(a);
  return ln(divide(add(1, sqrt(subtract(1, power(a, 2)))), a));
};

const acsch = (a: T): BigNumber => {
  a = normalize(a);
  const b = divide(1, a);
  return ln(add(b, sqrt(add(divide(b, a), 1))));
};

const LOG10 = Object.freeze({
  comma: -57,
  number: BigInt('2302585092994045684017991454684364207601101488628772976033'),
  sign: false
});

const PI2 = Object.freeze({
  comma: -57,
  number: BigInt('1570796326794896619231321691639751442098584699687552910487'),
  sign: false
});

const PI = Object.freeze({
  comma: -57,
  number: BigInt('3141592653589793238462643383279502884197169399375105820974'),
  sign: false
});

const E = Object.freeze({
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
  multiply,
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
