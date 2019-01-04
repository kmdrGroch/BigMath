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
 * Stringify BigNumber
 */
export declare const stringify: (a: BigNumber) => string;
export declare const round: (a: string | number | bigint | BigNumber, precision?: number, rounding?: number) => BigNumber;
