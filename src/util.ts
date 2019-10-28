import { add, subtract } from './basic';
import { BigNumber, T } from './interfaces';

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
  switch (typeof a) {
    case 'number':
      a = `${a}`;

      return normalize({
        comma: a.includes('.') ? a.indexOf('.') + 1 - a.length : 0,
        number: BigInt(a.split('.').join('')),
        sign: false
      });
    case 'bigint':
      return {
        comma: 0,
        number: a < 0n ? -a : a,
        sign: a < 0n
      };
    case 'string':
      return normalize({
        comma: a.includes('.') ? a.indexOf('.') + 1 - a.length : 0,
        number: BigInt(a.split('.').join('')),
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
      return +b[1][0] > 5 ? subtract(BigInt(b[0]), 1n) : normalize(BigInt(b[0]));
    }

    return +b[1][0] >= 5 ? add(BigInt(b[0]), 1n) : normalize(BigInt(b[0]));
  }

  return a;
};

export const floor = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign) {
    const b = stringify(a).split('.');

    return b[1] ? subtract(BigInt(b[0]), 1n) : normalize(BigInt(b[0]));
  }

  return normalize(BigInt(stringify(a).split('.')[0]));
};

export const ceil = (a: T): BigNumber => {
  a = normalize(a);
  if (!a.sign) {
    const b = stringify(a).split('.');

    return b[1] ? add(BigInt(b[0]), 1n) : normalize(BigInt(b[0]));
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
 * Faster version of normalize
 */
export const finalize = (a: BigNumber): BigNumber => {
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
