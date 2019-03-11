"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./basic");
const comparison_1 = require("./comparison");
const constants_1 = require("./constants");
const util_1 = require("./util");
/**
 * @domain Real numbers
 * @range [-1, 1]
 * @returns Sine of parameter
 */
exports.sin = (a) => {
    a = util_1.normalize(a);
    const r = basic_1.divide(a, constants_1.PI2);
    const tens = `${r.number}`.length + r.comma;
    const d = BigInt(`${r.number}`.substring(0, tens) || 0);
    const reduce = basic_1.subtract(a, basic_1.multiply(d, constants_1.PI2));
    let s = { ...reduce };
    let k = { ...reduce };
    const k2 = basic_1.multiply(reduce, reduce);
    let f = 1n;
    let i = 1n;
    while (true) {
        f *= i * (i * 4n + 2n);
        k = basic_1.multiply(k, k2);
        const s1 = (i % 2n === 0n) ? basic_1.add(s, basic_1.divide(k, f)) : basic_1.subtract(s, basic_1.divide(k, f));
        if (comparison_1.lt(util_1.abs(basic_1.subtract(s1, s)), constants_1.ErrorConst)) {
            return s1;
        }
        s = s1;
        i += 1n;
    }
};
/**
 * @domain Real numbers
 * @range [-1, 1]
 * @returns Cosine of parameter
 */
exports.cos = (a) => exports.sin(basic_1.subtract(constants_1.PI2, a));
/**
 * @domain Real numbers & x != PI/2 + k*PI (k - integer)
 * @range Real numbers
 * @returns Tangent of parameter
 */
exports.tan = (a) => {
    const c = exports.cos(a);
    if (c.number === 0n) {
        throw new util_1.DomainError(util_1.stringify(a), 'real numbers & x != PI/2 + k*PI (k - integer)');
    }
    return basic_1.divide(exports.sin(a), c);
};
/**
 * @domain Real numbers & x != k*PI (k - integer)
 * @range Real numbers
 * @returns Cotangent of parameter
 */
exports.cot = (a) => {
    const s = exports.sin(a);
    if (s.number === 0n) {
        throw new util_1.DomainError(util_1.stringify(a), 'real numbers & x != k*PI (k - integer)');
    }
    return basic_1.divide(exports.cos(a), s);
};
/**
 * @domain Real numbers & x != PI/2 + k*PI (k - integer)
 * @range Real numbers
 * @returns Secant of parameter
 */
exports.sec = (a) => {
    const c = exports.cos(a);
    if (c.number === 0n) {
        throw new util_1.DomainError(util_1.stringify(a), 'real numbers & x != PI/2 + k*PI (k - integer)');
    }
    return basic_1.divide(1n, c);
};
/**
 * @domain Real numbers & x != k*PI (k - integer)
 * @range Real numbers
 * @returns Cosecant of parameter
 */
exports.csc = (a) => {
    const s = exports.sin(a);
    if (s.number === 0n) {
        throw new util_1.DomainError(util_1.stringify(a), 'real numbers & x != k*PI (k - integer)');
    }
    return basic_1.divide(1n, s);
};
/**
 * @domain [-1, 1]
 * @range [-PI/2, PI/2]
 * @returns Inverse sine of parameter
 */
exports.asin = (a) => {
    a = util_1.normalize(a);
    if (`${a.number}`.length > Math.abs(a.comma)) {
        if (a.number === 1n) {
            return { ...constants_1.PI2 };
        }
        throw new util_1.DomainError(util_1.stringify(a), 'numbers from range [-1, 1]');
    }
    return exports.atan(basic_1.divide(a, basic_1.sqrt(basic_1.subtract(1n, basic_1.multiply(a, a)))));
};
/**
 * @domain [-1, 1]
 * @range [0, PI]
 * @returns Inverse cosine of parameter
 */
exports.acos = (a) => basic_1.subtract(constants_1.PI2, exports.asin(a));
/**
 * @domain Real numbers
 * @range [-PI/2, PI/2]
 * @returns Inverse tangent of parameter
 */
exports.atan = (a) => {
    a = util_1.normalize(a);
    let x = 2n;
    while (true) {
        a = basic_1.divide(a, basic_1.add(1n, basic_1.sqrt(basic_1.add(1n, basic_1.multiply(a, a)))));
        if (comparison_1.lte(util_1.abs(a), 0.5)) {
            break;
        }
        x *= 2n;
    }
    let s = { ...a };
    let k = { ...a };
    const d2 = basic_1.multiply(a, a);
    let i = 1n;
    let s1;
    while (true) {
        k = basic_1.multiply(k, d2);
        s1 = (i % 2n === 1n) ? basic_1.subtract(s, basic_1.divide(k, i * 2n + 1n)) : basic_1.add(s, basic_1.divide(k, i * 2n + 1n));
        if (comparison_1.lt(util_1.abs(basic_1.subtract(s1, s)), constants_1.ErrorConst)) {
            return basic_1.multiply(s1, x);
        }
        s = s1;
        i += 1n;
    }
};
/**
 * @domain Real numbers | Both can't be 0
 * @range [-PI/2, PI/2]
 * @returns 2-argument inverse tangent
 */
exports.atan2 = (a, b) => {
    a = util_1.normalize(a);
    b = util_1.normalize(b);
    if (a.number === 0n) {
        if (b.number === 0n) {
            throw new util_1.DomainError('atan(0, 0)', 'Real numbers | Both can\'t be 0');
        }
        const k = { ...constants_1.PI2 };
        k.sign = b.sign;
        return k;
    }
    if (!a.sign) {
        return exports.atan(basic_1.divide(b, a));
    }
    if (b.number === 0n) {
        return { ...constants_1.PI };
    }
    if (b.sign) {
        return basic_1.subtract(exports.atan(basic_1.divide(b, a)), constants_1.PI);
    }
    return basic_1.add(exports.atan(basic_1.divide(b, a)), constants_1.PI);
};
/**
 * @domain Real numbers
 * @range [0, PI]
 * @returns Inverse cotangent of parameter
 */
exports.acot = (a) => basic_1.subtract(constants_1.PI2, exports.atan(a));
/**
 * @domain Real numbers without (-1, 1)
 * @range [0, PI] \ {PI/2}
 * @returns Inverse secant of parameter
 */
exports.asec = (a) => {
    a = util_1.normalize(a);
    if (`${a.number}`.length <= Math.abs(a.comma)) {
        throw new util_1.DomainError(util_1.stringify(a), 'numbers not from range (-1, 1)');
    }
    return basic_1.subtract(constants_1.PI2, exports.asin(basic_1.divide(1n, a)));
};
/**
 * @domain Real numbers without (-1, 1)
 * @range [-PI/2, PI/2] \ {0}
 * @returns Inverse cosecant of parameter
 */
exports.acsc = (a) => {
    a = util_1.normalize(a);
    if (`${a.number}`.length <= Math.abs(a.comma)) {
        throw new util_1.DomainError(util_1.stringify(a), 'numbers not from range (-1, 1)');
    }
    return exports.asin(basic_1.divide(1n, a));
};
/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Hyperbolic sine of parameter
 */
exports.sinh = (a) => {
    a = util_1.normalize(a);
    const x2 = basic_1.multiply(a, a);
    let sum = { ...a };
    let fact = 1n;
    let i = 2n;
    let sum1;
    while (true) {
        fact *= i * (i + 1n);
        a = basic_1.multiply(a, x2);
        sum1 = basic_1.add(sum, basic_1.divide(a, fact));
        if (comparison_1.lt(util_1.abs(basic_1.subtract(sum1, sum)), constants_1.ErrorConst)) {
            return sum1;
        }
        sum = sum1;
        i += 2n;
    }
};
/**
 * @domain Real numbers
 * @range Numbers greater or equal 1
 * @returns Hyperbolic cosine of parameter
 */
exports.cosh = (a) => {
    a = basic_1.exp(a);
    return basic_1.multiply(basic_1.add(a, basic_1.divide(1n, a)), 0.5);
};
/**
 * @domain Real numbers
 * @range (-1, 1)
 * @returns Hyperbolic tangent of parameter
 */
exports.tanh = (a) => {
    a = basic_1.exp(a);
    return basic_1.subtract(1n, basic_1.divide(2n, basic_1.add(basic_1.multiply(a, a), 1n)));
};
/**
 * @domain Real numbers without 0
 * @range Real numbers without [-1, 1]
 * @returns Hyperbolic cotangent of parameter
 */
exports.coth = (a) => {
    a = util_1.normalize(a);
    if (a.number === 0n) {
        throw new util_1.DomainError('0', 'real numbers without 0');
    }
    a = basic_1.exp(a);
    return basic_1.add(1n, basic_1.divide(2n, basic_1.subtract(basic_1.multiply(a, a), 1n)));
};
/**
 * @domain Real numbers
 * @range (0, 1)
 * @returns Hyperbolic secant of parameter
 */
exports.sech = (a) => {
    a = basic_1.exp(a);
    return basic_1.divide(2n, basic_1.add(a, basic_1.divide(1n, a)));
};
/**
 * @domain Real numbers without 0
 * @range Real numbers without 0
 * @returns Hyperbolic cosecant of parameter
 */
exports.csch = (a) => {
    a = util_1.normalize(a);
    if (a.number === 0n) {
        throw new util_1.DomainError('0', 'real numbers without 0');
    }
    a = basic_1.exp(a);
    return basic_1.divide(2n, basic_1.subtract(a, basic_1.divide(1n, a)));
};
/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Inverse hyperbolic sine of parameter
 */
exports.asinh = (a) => {
    a = util_1.normalize(a);
    return basic_1.ln(basic_1.add(a, basic_1.sqrt(basic_1.add(basic_1.multiply(a, a), 1n))));
};
/**
 * @domain Real numbers greater or equal 1
 * @range Real numbers greater or equal 0
 * @returns Inverse hyperbolic cosine of parameter
 */
exports.acosh = (a) => {
    a = util_1.normalize(a);
    if (a.sign || `${a.number}`.length <= Math.abs(a.comma)) {
        throw new util_1.DomainError(util_1.stringify(a), 'numbers greater or equal 1');
    }
    if (a.number === 1n) {
        return {
            comma: 0,
            number: 0n,
            sign: false
        };
    }
    return basic_1.ln(basic_1.add(a, basic_1.sqrt(basic_1.subtract(basic_1.multiply(a, a), 1n))));
};
/**
 * @domain (-1, 1)
 * @range Real numbers
 * @returns Inverse hyperbolic tangent of parameter
 */
exports.atanh = (a) => {
    a = util_1.normalize(a);
    if (`${a.number}`.length > Math.abs(a.comma)) {
        throw new util_1.DomainError(util_1.stringify(a), 'numbers from range (-1, 1)');
    }
    return basic_1.multiply(basic_1.ln(basic_1.divide(basic_1.add(1n, a), basic_1.subtract(1n, a))), 0.5);
};
/**
 * @domain Real numbers without [-1, 1]
 * @range Real numbers
 * @returns Inverse hyperbolic cotangent of parameter
 */
exports.acoth = (a) => {
    a = util_1.normalize(a);
    if (`${a.number}`.length <= Math.abs(a.comma) || a.number === 1n || a.number === 0n) {
        throw new util_1.DomainError(util_1.stringify(a), 'numbers not from range [-1, 1]');
    }
    return basic_1.multiply(basic_1.ln(basic_1.divide(basic_1.add(a, 1n), basic_1.subtract(a, 1n))), 0.5);
};
/**
 * @domain (0, 1]
 * @range Real numbers greater of equal 0
 * @returns Inverse hyperbolic secant of parameter
 */
exports.asech = (a) => {
    a = util_1.normalize(a);
    if (a.sign || `${a.number}`.length > Math.abs(a.comma)) {
        if (util_1.stringify(a) === '1') {
            return {
                comma: 0,
                number: 0n,
                sign: false
            };
        }
        throw new util_1.DomainError(util_1.stringify(a), 'numbers from range (0,1]');
    }
    return basic_1.ln(basic_1.divide(basic_1.add(1n, basic_1.sqrt(basic_1.subtract(1n, basic_1.multiply(a, a)))), a));
};
/**
 * @domain Real numbers
 * @range Real numbers
 * @returns Inverse hyperbolic cosecant of parameter
 */
exports.acsch = (a) => {
    const b = basic_1.divide(1n, a);
    return basic_1.ln(basic_1.add(b, basic_1.sqrt(basic_1.add(basic_1.divide(b, a), 1n))));
};
exports.versin = (a) => basic_1.subtract(1n, exports.cos(a));
exports.vercosin = (a) => basic_1.add(1n, exports.cos(a));
exports.coversin = (a) => basic_1.subtract(1n, exports.sin(a));
exports.covercosin = (a) => basic_1.add(1n, exports.sin(a));
exports.haversin = (a) => basic_1.divide(basic_1.subtract(1n, exports.cos(a)), 2n);
exports.havercosin = (a) => basic_1.divide(basic_1.add(1n, exports.cos(a)), 2n);
exports.hacoversin = (a) => basic_1.divide(basic_1.subtract(1n, exports.sin(a)), 2n);
exports.hacovercosin = (a) => basic_1.divide(basic_1.add(1n, exports.sin(a)), 2n);
exports.gd = (a) => basic_1.multiply(2n, exports.atan(exports.tanh(basic_1.divide(a, 2n))));
//# sourceMappingURL=trigonometry.js.map