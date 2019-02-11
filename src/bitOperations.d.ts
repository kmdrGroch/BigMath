import { BigNumber } from './interfaces';
/**
 * bitwise <<
 */
export declare const bitLeft: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * bitwise >>
 */
export declare const bitRight: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * bitwise &
 */
export declare const bitAND: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * bitwise |
 */
export declare const bitOR: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * bitwise ^
 */
export declare const bitXOR: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * bitwise ~
 */
export declare const bitNOT: (a: string | number | bigint | BigNumber) => BigNumber;
