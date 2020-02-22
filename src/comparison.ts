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
export const lt = (a: BigNumber, b: BigNumber): boolean => {
  if (a.sign !== b.sign) {
    return a.sign;
  }

  if (a.comma === b.comma) {
    return a.sign ? a.number > b.number : a.number < b.number;
  }

  const f = a.comma > b.comma ? a.number * 10n ** BigInt(a.comma - b.comma) - b.number : a.number - b.number * 10n ** BigInt(b.comma - a.comma);

  return a.sign ? f > 0n : f < 0n;
};

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
