"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./basic");
const comparison_1 = require("./comparison");
const constants_1 = require("./constants");
const util_1 = require("./util");
/**
 * @returns Arithmetic–geometric mean of parameters
 */
exports.AGM = (a, b) => {
    a = util_1.normalize(a);
    b = util_1.normalize(b);
    if (a.sign || b.sign) {
        throw new util_1.DomainError(`AGM(${util_1.stringify(a)}, ${util_1.stringify(b)})`, 'arguments have to be positive');
    }
    while (true) {
        const c = util_1.normalize(a);
        const a1 = basic_1.multiply(basic_1.add(c, b), 0.5);
        if (comparison_1.lt(util_1.abs(basic_1.subtract(a1, a)), constants_1.ErrorConst)) {
            return a1;
        }
        a = a1;
        b = basic_1.sqrt(basic_1.multiply(c, b));
    }
};
/**
 * @returns Complete elliptic integral of the first kind
 */
exports.K = (a) => {
    a = util_1.normalize(a);
    if (`${a.number}`.length > Math.abs(a.comma)) {
        throw new util_1.DomainError(util_1.stringify(a), 'number from range [-1, 1]');
    }
    return basic_1.divide(constants_1.PI2, exports.AGM(1n, basic_1.sqrt(basic_1.subtract(1n, basic_1.power(a, 2n)))));
};
/**
 * @returns Omega function (product logarithm)
 */
exports.W = (a) => {
    a = util_1.normalize(a);
    if (a.number === 0n) {
        return a;
    }
    let w = util_1.normalize('0.56714329040978387299996866221035554975381578');
    if (a.number === 1n && a.comma === 0 && !a.sign) {
        return w;
    }
    if (comparison_1.lt(a, basic_1.divide(constants_1.LOG2, -2n))) {
        throw new util_1.DomainError(util_1.stringify(a), 'number bigger than -log(2) / 2');
    }
    let ex;
    let wjewj;
    let w1;
    while (true) {
        ex = basic_1.exp(w);
        wjewj = basic_1.multiply(w, ex);
        w1 = basic_1.subtract(w, basic_1.divide(basic_1.subtract(wjewj, a), basic_1.subtract(basic_1.add(wjewj, ex), basic_1.divide(basic_1.multiply(basic_1.add(w, 2n), basic_1.subtract(wjewj, a)), basic_1.multiply(basic_1.add(w, 1n), 2n)))));
        if (comparison_1.lt(util_1.abs(basic_1.subtract(w, w1)), constants_1.ErrorConst)) {
            return w1;
        }
        w = w1;
    }
};
/**
 * @returns y for the equation: y = x ** y [y = x ** x ** x ** ...]
 */
exports.XY = (a) => {
    a = util_1.normalize(a);
    if (a.sign || a.number === 0n || comparison_1.gt(a, basic_1.sqrt(2n))) {
        throw new util_1.DomainError(util_1.stringify(a), 'number bigger than 0 and less than sqrt(2)');
    }
    if (!a.sign && a.number === 1n && a.comma === 0) {
        return a;
    }
    a = basic_1.ln(a);
    const b = util_1.normalize(a);
    b.sign = !b.sign;
    a = basic_1.divide(exports.W(b), a);
    a.sign = !a.sign;
    return a;
};
exports.erf = (a) => {
    a = util_1.normalize(a);
    if (comparison_1.gt(util_1.abs(a), 9.5)) {
        return {
            comma: 0,
            number: 1n,
            sign: a.sign
        };
    }
    const a2 = basic_1.multiply(a, a);
    let sum = util_1.normalize(a);
    let fact = 1n;
    let k = 1n;
    let sum1;
    for (let i = 1n;; i += 1n) {
        fact *= i;
        k += 2n;
        a = basic_1.multiply(a, a2);
        sum1 = i % 2n === 1n ? basic_1.subtract(sum, basic_1.divide(a, basic_1.multiply(fact, k))) : basic_1.add(sum, basic_1.divide(a, basic_1.multiply(fact, k)));
        if (comparison_1.lt(util_1.abs(basic_1.subtract(sum, sum1)), constants_1.ErrorConst)) {
            return basic_1.multiply(sum1, basic_1.divide(2n, basic_1.sqrt(constants_1.PI)));
        }
        sum = sum1;
    }
};
//# sourceMappingURL=other.js.map