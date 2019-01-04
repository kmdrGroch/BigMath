import { add } from './basic';
import { Config } from './config';

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
      const s = a.indexOf('-') > -1;

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
 * Stringify BigNumber
 */
export const stringify = (a: BigNumber): string => {
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
