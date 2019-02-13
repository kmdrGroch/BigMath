import { subtract } from './basic';
import { T } from './interfaces';
import { normalize } from './util';

/**
 * @returns If first parameter is greater than or equal second parameter
 */
export const gte = (a: T, b: T): boolean => !subtract(a, b).sign;

/**
 * @returns If first parameter is smaller than or equal second parameter
 */
export const lte = (a: T, b: T): boolean => {
  const k = subtract(a, b);

  return k.sign || k.number === 0n;
};

/**
 * @returns If first parameter is greater than second parameter
 */
export const gt = (a: T, b: T): boolean => {
  const x = subtract(a, b);

  return !x.sign && x.number !== 0n;
};

/**
 * @returns If first parameter is smaller than second parameter
 */
export const lt = (a: T, b: T): boolean => subtract(a, b).sign;

/**
 * @returns If first parameter is equal second parameter
 */
export const eq = (a: T, b: T): boolean => {
  a = normalize(a);
  b = normalize(b);

  return a.sign === b.sign && a.comma === b.comma && a.number === b.number;
};

/**
 * @returns If first parameter is not equal second parameter
 */
export const neq = (a: T, b: T): boolean => {
  a = normalize(a);
  b = normalize(b);

  return a.sign !== b.sign || a.comma !== b.comma || a.number !== b.number;
};
