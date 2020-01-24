import { subtract } from './basic';
import { BigNumber } from './interfaces';
import { normalize } from './util';

/**
 * @returns If first parameter is greater than or equal second parameter
 */
export const gte = (a: BigNumber, b: BigNumber): boolean => !subtract(a, b).sign;

/**
 * @returns If first parameter is smaller than or equal second parameter
 */
export const lte = (a: BigNumber, b: BigNumber): boolean => {
  const k = subtract(a, b);

  return k.sign || k.number === 0n;
};

/**
 * @returns If first parameter is greater than second parameter
 */
export const gt = (a: BigNumber, b: BigNumber): boolean => {
  const x = subtract(a, b);

  return !x.sign && x.number !== 0n;
};

/**
 * @returns If first parameter is smaller than second parameter
 */
export const lt = (a: BigNumber, b: BigNumber): boolean => subtract(a, b).sign;

/**
 * @returns If first parameter is equal second parameter
 */
export const eq = (a: BigNumber, b: BigNumber): boolean => {
  a = normalize(a);
  b = normalize(b);

  return a.sign === b.sign && a.comma === b.comma && a.number === b.number;
};

/**
 * @returns If first parameter is not equal second parameter
 */
export const neq = (a: BigNumber, b: BigNumber): boolean => {
  a = normalize(a);
  b = normalize(b);

  return a.sign !== b.sign || a.comma !== b.comma || a.number !== b.number;
};
