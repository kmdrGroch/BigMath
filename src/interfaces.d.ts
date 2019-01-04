interface BigNumber {
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
declare type TypeName<Type> = Type;
declare type T = TypeName<bigint | BigNumber | number | string>;
