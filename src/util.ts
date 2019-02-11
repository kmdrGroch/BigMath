import { add, subtract } from './basic';
import { Config } from './config';
import { BigNumber, T } from './interfaces';

/**
 * Custom error to handle invalid domain
 */
export class DomainError extends RangeError {
  public constructor(given: string, expected: string) {
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
      const s = a.indexOf('-') !== -1;

      return normalize({
        comma: a.indexOf('.') === -1 ? 0 : a.indexOf('.') + 1 - a.length,
        number: BigInt(s ? a.split('.').join('').substr(1) : a.split('.').join('')),
        sign: s
      });
    case 'object':
      let x = a.number;
      if (x === BigInt(0)) {
        return {
          comma: 0,
          number: BigInt(0),
          sign: false
        };
      }
      const sign = !(x < BigInt(0) === a.sign);
      let comma = a.comma;
      x = x < BigInt(0) ? -x : x;
      while (true) {
        if (x % BigInt(10) === BigInt(0)) {
          comma += 1;
          x /= BigInt(10);
        } else {
          break;
        }
      }

      return {
        comma,
        number: x,
        sign
      };
  }
};

/**
 * Stringify given number
 */
export const stringify = (a: T): string => {
  switch (typeof a) {
    case 'string':
      return a;
    case 'bigint':
    case 'number':
      return String(a);
    default:
      const s: string = String(a.number);
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
  }
};

export const round = (a: T, precision: number = Config.precision, rounding: number = Config.rounding): BigNumber => {
  a = normalize(a);
  if (a.comma < -precision) {
    const b = stringify(a).split('.');
    const c = Number(b[1][precision]);
    b[1] = b[1].substring(0, precision);
    if (c >= rounding) {
      return add(b.join('.'), {
        comma: -precision,
        number: BigInt(1),
        sign: false
      });
    }

    return normalize(b.join('.'));
  }

  return a;
};

export const floor = (a: T): BigNumber => {
  a = normalize(a);
  if (a.sign) {
    const b = stringify(a).split('.');

    return b[1] ? subtract(b[0], 1) : normalize(b[0]);
  }

  return normalize(stringify(a).split('.')[0]);
};

export const ceil = (a: T): BigNumber => {
  a = normalize(a);
  if (!a.sign) {
    const b = stringify(a).split('.');

    return b[1] ? add(b[0], 1) : normalize(b[0]);
  }

  return normalize(stringify(a).split('.')[0]);
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
