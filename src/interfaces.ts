export interface BigNumber {
  /**
   * 10 ^ comma
   */
  comma: number;
  /**
   * Absolute value
   */
  number: bigint;
  /**
   * Indication of `-`
   */
  sign: boolean;
}

type TypeName<Type> = Type;
export type T = TypeName<bigint | BigNumber | number | string>;
