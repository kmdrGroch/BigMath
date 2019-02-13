import { BigNumber, T } from './interfaces';
import { normalize, stringify } from './util';

/**
 * bitwise <<
 */
export const bitLeft = (a: T, b: T): BigNumber => normalize(BigInt(stringify(a)) << BigInt(stringify(b)));

/**
 * bitwise >>
 */
export const bitRight = (a: T, b: T): BigNumber => normalize(BigInt(stringify(a)) >> BigInt(stringify(b)));

/**
 * bitwise &
 */
export const bitAND = (a: T, b: T): BigNumber => normalize(BigInt(stringify(a)) & BigInt(stringify(b)));

/**
 * bitwise |
 */
export const bitOR = (a: T, b: T): BigNumber => normalize(BigInt(stringify(a)) | BigInt(stringify(b)));

/**
 * bitwise ^
 */
export const bitXOR = (a: T, b: T): BigNumber => normalize(BigInt(stringify(a)) ^ BigInt(stringify(b)));

/**
 * bitwise ~
 */
export const bitNOT = (a: T): BigNumber => normalize(~BigInt(stringify(a)));
