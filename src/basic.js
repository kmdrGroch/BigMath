"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const trigonometry_1 = require("./trigonometry");
const util_1 = require("./util");
/**
 * @domain Real numbers, Real numbers
 * @returns Sum of parameters
 */
exports.add = (a, b) => {
    a = util_1.normalize(a);
    b = util_1.normalize(b);
    if (a.sign !== b.sign) {
        if (a.sign) {
            a.sign = false;
            return exports.subtract(b, a);
        }
        b.sign = false;
        return exports.subtract(a, b);
    }
    const max = Math.max(a.comma, b.comma);
    const min = Math.min(a.comma, b.comma);
    if (a.comma > b.comma) {
        a.number *= BigInt(10) ** BigInt(max - min);
    }
    else {
        b.number *= BigInt(10) ** BigInt(max - min);
    }
    return util_1.normalize({
        comma: min,
        number: a.number + b.number,
        sign: a.sign
    });
};
/**
 * @domain Real numbers, Real numbers
 * @returns Difference of parameters
 */
exports.subtract = (a, b) => {
    a = util_1.normalize(a);
    b = util_1.normalize(b);
    if (a.sign !== b.sign) {
        if (a.sign) {
            b.sign = true;
            return exports.add(a, b);
        }
        b.sign = false;
        return exports.add(a, b);
    }
    const max = Math.max(a.comma, b.comma);
    const min = Math.min(a.comma, b.comma);
    if (a.comma > b.comma) {
        a.number *= BigInt(10) ** BigInt(max - min);
    }
    else {
        b.number *= BigInt(10) ** BigInt(max - min);
    }
    return util_1.normalize({
        comma: min,
        number: a.number - b.number,
        sign: a.sign
    });
};
/**
 * @domain Real numbers
 * @returns Product of parameters
 */
exports.multiply = (a, b) => {
    a = util_1.normalize(a);
    b = util_1.normalize(b);
    return util_1.normalize({
        comma: a.comma + b.comma,
        number: a.number * b.number,
        sign: a.sign !== b.sign
    });
};
/**
 * @domain Real numbers, Real numbers other than 0
 * @returns Quotient of parameters
 */
exports.divide = (a, b) => {
    a = util_1.normalize(a);
    b = util_1.normalize(b);
    if (b.number === BigInt(0)) {
        throw new util_1.DomainError('0', 'numbers other than 0');
    }
    const len = String(a.number).length - String(b.number).length;
    if (len > 0) {
        b.number *= BigInt(10) ** BigInt(len);
        b.comma -= len;
    }
    else {
        a.number *= BigInt(10) ** BigInt(-len);
        a.comma += len;
    }
    const n = a.number / b.number;
    let d = '';
    let c = a.comma - b.comma;
    a.number = (a.number - n * b.number) * BigInt(10);
    while (d.length !== 50) {
        if (a.number === BigInt(0)) {
            break;
        }
        d += String(a.number / b.number);
        a.number = (a.number - (a.number / b.number) * b.number) * BigInt(10);
        c -= 1;
    }
    if (c > 0) {
        return util_1.normalize({
            comma: 0,
            number: BigInt(n + d) * BigInt(10) ** BigInt(c),
            sign: a.sign !== b.sign
        });
    }
    return util_1.normalize({
        comma: c,
        number: BigInt(n + d),
        sign: a.sign !== b.sign
    });
};
/**
 * @domain Numbers greater than 0
 * @returns Natural logarithm (base e) of a number
 */
exports.ln = (a) => {
    a = util_1.normalize(a);
    if (a.sign || a.number === BigInt(0)) {
        throw new util_1.DomainError(util_1.stringify(a), 'numbers greater than 0');
    }
    const tens = String(a.number).length + a.comma;
    let ten = exports.multiply(tens, constants_1.LOG10);
    a.comma -= tens;
    switch (String(a.number)[0]) {
        case '5':
        case '4':
            ten = exports.subtract(ten, constants_1.LOG2);
            a = exports.multiply(a, 2);
            break;
        case '3':
            ten = exports.subtract(ten, {
                comma: -57,
                number: BigInt('1098612288668109691395245236922525704647490557822749451734'),
                sign: false
            });
            a = exports.multiply(a, 3);
            break;
        case '2':
            ten = exports.subtract(ten, exports.multiply(constants_1.LOG2, 2));
            a = exports.multiply(a, 4);
            break;
        case '1':
            if (Number(String(a.number)[1] || 0) > 5) {
                ten = exports.subtract(ten, {
                    comma: -57,
                    number: BigInt('1791759469228055000812477358380702272722990692183004705855'),
                    sign: false
                });
                a = exports.multiply(a, 6);
            }
            else {
                ten = exports.subtract(ten, {
                    comma: -57,
                    number: BigInt('2079441541679835928251696364374529704226500403080765762362'),
                    sign: false
                });
                a = exports.multiply(a, 8);
            }
    }
    let sum = exports.divide(exports.subtract(a, 1), exports.add(a, 1));
    let p = util_1.normalize(sum);
    const k = exports.multiply(sum, sum);
    for (let i = 1; i < 20; i += 1) {
        p = exports.multiply(p, k);
        sum = exports.add(sum, exports.divide(p, i * 2 + 1));
    }
    return exports.add(ten, exports.multiply(sum, 2));
};
/**
 * @domain Real numbers, Real numbers | both can't be 0 at the same time | not negative ^ non-integer
 * @returns Result of the exponentiation of parameters
 */
exports.power = (a, b) => {
    a = util_1.normalize(a);
    b = util_1.normalize(b);
    if (a.number === BigInt(0) && b.number === BigInt(0)) {
        throw new util_1.DomainError('0 ^ 0', 'real numbers | both can\'t be 0 at the same time');
    }
    if (b.comma > -1) {
        if (b.sign) {
            a = exports.divide(1, a);
        }
        if (a.sign) {
            a.sign = Number(b.number) % 2 === 1;
        }
        a.comma = a.comma * Number(b.number);
        a.number = a.number ** BigInt(b.number);
        return a;
    }
    if (a.sign) {
        throw new util_1.DomainError(`${util_1.stringify(a)} ^ ${util_1.stringify(b)}`, 'real numbers | not negative ^ non-integer');
    }
    return exports.exp(exports.multiply(b, exports.ln(a)));
};
/**
 * @domain Numbers greater or equal 0
 * @returns Square root of number
 */
exports.sqrt = (a) => {
    a = util_1.normalize(a);
    if (a.sign) {
        throw new util_1.DomainError(util_1.stringify(a), 'numbers greater or equal 0');
    }
    if (a.number === BigInt(0)) {
        return util_1.normalize(0);
    }
    let aprox = exports.power(10, BigInt(Math.floor((String(a.number).length + a.comma) / 2)));
    for (let i = 0; i < 20; i += 1) {
        aprox = exports.multiply(exports.add(exports.divide(a, aprox), aprox), 0.5);
    }
    return aprox;
};
/**
 * @domain Real numbers
 * @returns Result of the exponentiation of e ^ parameter
 */
exports.exp = (a) => {
    const sh = trigonometry_1.sinh(a);
    return exports.add(sh, exports.sqrt(exports.add(1, exports.multiply(sh, sh))));
};
//# sourceMappingURL=basic.js.map