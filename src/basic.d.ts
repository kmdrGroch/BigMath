import { BigNumber } from './interfaces';
/**
 * @domain Real numbers, Real numbers
 * @returns Sum of parameters
 */
export declare const add: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers, Real numbers
 * @returns Difference of parameters
 */
export declare const subtract: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @returns Product of parameters
 */
export declare const multiply: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers, Real numbers other than 0
 * @returns Quotient of parameters
 */
export declare const divide: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Numbers greater than 0
 * @returns Natural logarithm (base e) of a number
 */
export declare const ln: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers, Real numbers | both can't be 0 at the same time | not negative ^ non-integer
 * @returns Result of the exponentiation of parameters
 */
export declare const power: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Numbers greater or equal 0
 * @returns Square root of number
 */
export declare const sqrt: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @returns Result of the exponentiation of e ^ parameter
 */
export declare const exp: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Integers
 * @returns Product of all integers until given number
 */
export declare const factorial: (a: string | number | bigint | BigNumber) => BigNumber;
export declare const gamma: (a: string | number | bigint | BigNumber) => BigNumber;
