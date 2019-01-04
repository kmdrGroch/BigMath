/**
 * @domain Real numbers
 * @range [-1, 1]
 * @returns Sine of parameter
 */
export declare const sin: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @range [-1, 1]
 * @returns Cosine of parameter
 */
export declare const cos: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers & x != PI/2 + k*PI (k - integer)
 * @range Real numbers
 * @returns Tangent of parameter
 */
export declare const tan: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers & x != k*PI (k - integer)
 * @range Real numbers
 * @returns Cotangent of parameter
 */
export declare const cot: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers & x != PI/2 + k*PI (k - integer)
 * @range Real numbers
 * @returns Secant of parameter
 */
export declare const sec: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers & x != k*PI (k - integer)
 * @range Real numbers
 * @returns Cosecant of parameter
 */
export declare const csc: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain [-1, 1]
 * @range [-PI/2, PI/2]
 * @returns Inverse sine of parameter
 */
export declare const asin: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain [-1, 1]
 * @range [0, PI]
 * @returns Inverse cosine of parameter
 */
export declare const acos: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @range [-PI/2, PI/2]
 * @returns Inverse tangent of parameter
 */
export declare const atan: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers | Both can't be 0
 * @range [-PI/2, PI/2]
 * @returns 2-argument inverse tangent
 */
export declare const atan2: (a: string | number | bigint | BigNumber, b: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @range [0, PI]
 * @returns Inverse cotangent of parameter
 */
export declare const acot: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers without (-1, 1)
 * @range [0, PI] \ {PI/2}
 * @returns Inverse secant of parameter
 */
export declare const asec: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers without (-1, 1)
 * @range [-PI/2, PI/2] \ {0}
 * @returns Inverse cosecant of parameter
 */
export declare const acsc: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Hyperbolic sine of parameter
 */
export declare const sinh: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @range Numbers greater or equal 1
 * @returns Hyperbolic cosine of parameter
 */
export declare const cosh: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @range (-1, 1)
 * @returns Hyperbolic tangent of parameter
 */
export declare const tanh: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers without 0
 * @range Real numbers without [-1, 1]
 * @returns Hyperbolic cotangent of parameter
 */
export declare const coth: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @range (0, 1)
 * @returns Hyperbolic secant of parameter
 */
export declare const sech: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers without 0
 * @range Real numbers without 0
 * @returns Hyperbolic cosecant of parameter
 */
export declare const csch: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Inverse hyperbolic sine of parameter
 */
export declare const asinh: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers greater or equal 1
 * @range Real numbers greater or equal 0
 * @returns Inverse hyperbolic cosine of parameter
 */
export declare const acosh: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain (-1, 1)
 * @range Real numbers
 * @returns Inverse hyperbolic tangent of parameter
 */
export declare const atanh: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers without [-1, 1]
 * @range Real numbers
 * @returns Inverse hyperbolic cotangent of parameter
 */
export declare const acoth: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain (0, 1]
 * @range Real numbers greater of equal 0
 * @returns Inverse hyperbolic secant of parameter
 */
export declare const asech: (a: string | number | bigint | BigNumber) => BigNumber;
/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Inverse hyperbolic cosecant of parameter
 */
export declare const acsch: (a: string | number | bigint | BigNumber) => BigNumber;
