import { add, subtract } from './basic';
import { BigNumber, T } from './interfaces';
import BigMath, { config } from './BigMath';

/**
 * Custom error to handle invalid domain
 */
export class DomainError extends RangeError {
  constructor(given: string, expected: string) {
    super(`Number out of domain. Given: ${given}. Expected: ${expected}`);
    this.name = 'DomainError';
  }
}

/**
 * Convert other types to BigNumber and normalize it
 */
export const normalize = (a: T): BigNumber => {
  if (a instanceof BigMath) {
    return a.toBigNumber();
  }
  switch (typeof a) {
    case 'bigint':
      return {
        comma: 0,
        number: a < 0n ? -a : a,
        sign: a < 0n
      };
    case 'number':
      a = `${a}`;
    case 'string':
      const i = a.indexOf('.');

      if (i > -1) {
        return normalize({
          comma: i + 1 - a.length,
          number: BigInt(a.split('.').join('')),
          sign: false
        });
      }

      return normalize({
        comma: 0,
        number: BigInt(a),
        sign: false
      });
    case 'object':
      if (a.number < 0n) {
        a.sign = !a.sign;
        a.number = -a.number;
      }

      if (a.comma === 0) {
        return { ...a };
      }

      let x = a.number;
      let comma = a.comma;

      while (true) {
        if (x % 10n === 0n && comma < 0) {
          comma += 1;
          x /= 10n;
        } else {
          break;
        }
      }

      return {
        comma,
        number: x,
        sign: a.sign
      };
  }
};

/**
 * Stringify given number
 */
export const stringify = (a: T): string => {
  if (a instanceof BigMath) {
    a = a.toBigNumber();
  }
  switch (typeof a) {
    case 'string':
    case 'bigint':
    case 'number':
      return `${a}`;
    default:
      const s = `${a.number}`;
      if (a.comma < 0) {
        const len = s.length + a.comma;
        if (len > 0) {
          return `${a.sign ? '-' : ''}${s.substring(0, len)}.${s.substring(len)}`;
        }

        return `${a.sign ? '-' : ''}0.${'0'.repeat(-len) + s}`;
      }

      return `${a.sign ? '-' : ''}${s}`;
  }
};

export const round = (a: T): BigNumber => {
  a = normalize(a);
  if (a.comma < 0) {
    const b = stringify(a).split('.');
    if (a.sign) {
      return +b[1][0] > 5 ? subtract(normalize(BigInt(b[0])), normalize(1n)) : normalize(BigInt(b[0]));
    }

    return +b[1][0] >= 5 ? add(normalize(BigInt(b[0])), normalize(1n)) : normalize(BigInt(b[0]));
  }

  return a;
};

export const floor = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign) {
    const b = stringify(a).split('.');

    return b[1] ? subtract(normalize(BigInt(b[0])), normalize(1n)) : normalize(BigInt(b[0]));
  }

  return normalize(BigInt(stringify(a).split('.')[0]));
};

export const ceil = (a: T): BigNumber => {
  a = normalize(a);
  if (!a.sign) {
    const b = stringify(a).split('.');

    return b[1] ? add(normalize(BigInt(b[0])), normalize(1n)) : normalize(BigInt(b[0]));
  }

  return normalize(BigInt(stringify(a).split('.')[0]));
};

/**
 * @returns Absolute value
 */
export const abs = (a: T): BigNumber => {
  a = normalize(a);
  a.sign = false;

  return a;
};

/**
 * Checks if number is an integer
 */
export const isInteger = (a: T): boolean => normalize(a).comma >= 0;

/**
 * Remove following zeros
 */
export const trim = (a: BigNumber): BigNumber => {
  while (true) {
    if (a.number % 10n === 0n && a.comma < 0) {
      a.comma += 1;
      a.number /= 10n;
    } else {
      break;
    }
  }

  return a.number < 0n ? { comma: a.comma, number: -a.number, sign: !a.sign } : a;
};

/**
 * Round number to specific place and trims zeros
 */
export const finalize = (a: BigNumber, length?: number): BigNumber => {
  if (length === undefined) {
    length = -config.precision;
  }
  if (a.comma >= length) {
    return trim({ ...a });
  }
  const diff = length - a.comma - 1;

  const num = a.number / 10n ** BigInt(diff);

  const str = `${num}`;

  return trim({
    comma: length,
    number: +str[str.length - 1] > 4 ? num / 10n + 1n : num / 10n,
    sign: a.sign
  });
};
