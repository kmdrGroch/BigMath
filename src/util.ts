import { BigMath, config } from './BigMath';
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
        return trim({
          comma: i + 1 - a.length,
          number: a.startsWith('-') ? -BigInt(a.split('.').join('')) : BigInt(a.split('.').join('')),
          sign: a.startsWith('-')
        });
      }

      return {
        comma: 0,
        number: a.startsWith('-') ? -BigInt(a) : BigInt(a),
        sign: a.startsWith('-')
      };
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
          comma++;
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

export const round = (a: BigNumber): BigNumber => {
  if (a.comma < 0) {
    const b = stringify(a).split('.');
    if (a.sign) {
      return +b[1][0] > 5 ? normalize(BigInt(b[0]) - 1n) : normalize(BigInt(b[0]));
    }

    return +b[1][0] >= 5 ? normalize(BigInt(b[0]) + 1n) : normalize(BigInt(b[0]));
  }

  return a;
};

export const floor = (a: BigNumber): BigNumber => {
  if (a.sign) {
    const b = stringify(a).split('.');

    return b[1] ? normalize(BigInt(b[0]) - 1n) : normalize(BigInt(b[0]));
  }

  return normalize(BigInt(stringify(a).split('.')[0]));
};

export const ceil = (a: BigNumber): BigNumber => {
  if (!a.sign) {
    const b = stringify(a).split('.');

    return b[1] ? normalize(BigInt(b[0]) + 1n) : normalize(BigInt(b[0]));
  }

  return normalize(BigInt(stringify(a).split('.')[0]));
};

/**
 * @returns Absolute value
 */
export const abs = (a: BigNumber): BigNumber => ({
  comma: a.comma,
  number: a.number,
  sign: false
});

/**
 * Checks if number is an integer
 */
export const isInteger = (a: BigNumber): boolean => a.comma >= 0;

/**
 * Remove following zeros
 */
export const trim = (a: BigNumber): BigNumber => {
  while (true) {
    if (a.number % 10n === 0n && a.comma < 0) {
      a.comma++;
      a.number /= 10n;
    } else {
      break;
    }
  }

  if (a.number < 0n) {
    a.number = -a.number;
    a.sign = !a.sign;
  }

  return a;
};

/**
 * Round number to specific place and trims zeros
 */
export const finalize = (a: BigNumber, length: number = -config.precision): BigNumber => {
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

export const gcd = (a: bigint, b: bigint): bigint => (b === 0n ? a : gcd(b, a % b));
