import { BigNumber } from './interfaces';
/**
 * @returns Arithmetic–geometric mean of parameters
 */
export declare const AGM: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * @returns Complete elliptic integral of the first kind
 */
export declare const K: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @returns Omega function (product logarithm)
 */
export declare const W: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @returns y for the equation: y = x ** y [y = x ** x ** x ** ...]
 */
export declare const XY: (a: string | number | bigint | BigNumber) => BigNumber;
export declare const erf: (a: string | number | bigint | BigNumber) => BigNumber;
