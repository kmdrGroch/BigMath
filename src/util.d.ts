import { BigNumber } from './interfaces';
/**
 * Custom error to handle invalid domain
 */
export declare class DomainError extends RangeError {
    constructor(given: string, expected: string);
}
/**
 * Convert other types to BigNumber and normalize it
 */
export declare const normalize: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * Stringify given number
 */
export declare const stringify: (a: string | number | bigint | BigNumber) => string;
export declare const round: (a: string | number | bigint | BigNumber, precision?: number, rounding?: number) => BigNumber;
export declare const floor: (a: string | number | bigint | BigNumber) => BigNumber;
export declare const ceil: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @returns Absolute value
 */
export declare const abs: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * Checks if number is an integer
 */
export declare const isInteger: (a: string | number | bigint | BigNumber) => boolean;
