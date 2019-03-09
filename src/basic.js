"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comparison_1 = require("./comparison");
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
    let max;
    let min;
    if (a.comma > b.comma) {
        max = a.comma;
        min = b.comma;
        a.number *= 10n ** BigInt(max - min);
    }
    else {
        max = b.comma;
        min = a.comma;
        b.number *= 10n ** BigInt(max - min);
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
    let max;
    let min;
    if (a.comma > b.comma) {
        max = a.comma;
        min = b.comma;
        a.number *= 10n ** BigInt(max - min);
    }
    else {
        max = b.comma;
        min = a.comma;
        b.number *= 10n ** BigInt(max - min);
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
    if (b.number === 0n) {
        throw new util_1.DomainError('0', 'numbers other than 0');
    }
    const len = `${a.number}`.length - `${b.number}`.length;
    if (len > 0) {
        b.number *= 10n ** BigInt(len);
        b.comma -= len;
    }
    else {
        a.number *= 10n ** BigInt(-len);
        a.comma += len;
    }
    const n = a.number / b.number;
    let d = '';
    a.number = (a.number - n * b.number) * 10n;
    let i = 0;
    let f;
    while (i !== 50) {
        f = a.number / b.number;
        if (a.number === 0n) {
            break;
        }
        d += `${f}`;
        a.number = (a.number - f * b.number) * 10n;
        i += 1;
    }
    const c = a.comma - b.comma - i;
    if (c > 0) {
        return {
            comma: 0,
            number: BigInt(n + d) * 10n ** BigInt(c),
            sign: a.sign !== b.sign
        };
    }
    a = {
        comma: c,
        number: BigInt(n + d),
        sign: a.sign !== b.sign
    };
    if (a.number % 10n === 0n && a.comma < 0) {
        a.comma += 1;
        a.number /= 10n;
    }
    return a;
};
/**
 * @domain Numbers greater than 0
 * @returns Natural logarithm (base e) of a number
 */
exports.ln = (a) => {
    a = util_1.normalize(a);
    if (a.sign || a.number === 0n) {
        throw new util_1.DomainError(util_1.stringify(a), 'numbers greater than 0');
    }
    const tens = `${a.number}`.length + a.comma;
    let ten = exports.multiply(tens, constants_1.LOG10);
    a.comma -= tens;
    switch (`${a.number}`[0]) {
        case '5':
        case '4':
            ten = exports.subtract(ten, constants_1.LOG2);
            a = exports.multiply(a, 2n);
            break;
        case '3':
            ten = exports.subtract(ten, {
                comma: -57,
                number: 1098612288668109691395245236922525704647490557822749451734n,
                sign: false
            });
            a = exports.multiply(a, 3n);
            break;
        case '2':
            ten = exports.subtract(ten, exports.multiply(constants_1.LOG2, 2n));
            a = exports.multiply(a, 4n);
            break;
        case '1':
            if (+(`${a.number}`[1] || 0) > 5) {
                ten = exports.subtract(ten, {
                    comma: -57,
                    number: 1791759469228055000812477358380702272722990692183004705855n,
                    sign: false
                });
                a = exports.multiply(a, 6n);
            }
            else {
                ten = exports.subtract(ten, {
                    comma: -57,
                    number: 2079441541679835928251696364374529704226500403080765762362n,
                    sign: false
                });
                a = exports.multiply(a, 8n);
            }
    }
    let sum = exports.divide(exports.subtract(a, 1n), exports.add(a, 1n));
    let p = util_1.normalize(sum);
    const k = exports.multiply(sum, sum);
    let i = 3n;
    while (true) {
        p = exports.multiply(p, k);
        const sum1 = exports.add(sum, exports.divide(p, i));
        if (comparison_1.lt(util_1.abs(exports.subtract(sum1, sum)), constants_1.ErrorConst)) {
            return exports.add(ten, exports.multiply(sum1, 2n));
        }
        sum = sum1;
        i += 2n;
    }
};
/**
 * @domain Real numbers, Real numbers | both can't be 0 at the same time | not negative ^ non-integer
 * @returns Result of the exponentiation of parameters
 */
exports.power = (a, b) => {
    a = util_1.normalize(a);
    b = util_1.normalize(b);
    if (a.number === 0n && b.number === 0n) {
        throw new util_1.DomainError('0 ^ 0', 'real numbers | both can\'t be 0 at the same time');
    }
    if (b.comma > -1) {
        if (b.sign) {
            a = exports.divide(1, a);
        }
        if (a.sign) {
            a.sign = b.number % 2n === 1n;
        }
        a.comma = a.comma * Number(b.number);
        a.number = a.number ** b.number;
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
    if (a.number === 0n) {
        return {
            comma: 0,
            number: 0n,
            sign: false
        };
    }
    const last = a.number % 10n;
    if (-a.comma % 2 === 0 && !(last === 2n || last === 3n || last === 7n || last === 8n)) {
        const len = BigInt(`${a.number}`.length);
        let k;
        let end;
        if (len % 2n === 1n) {
            k = 10n ** ((len - 1n) / 2n);
            end = 4n * k;
        }
        else {
            end = 10n ** (len / 2n - 1n);
            k = 3n * end;
        }
        let mid;
        while (k <= end) {
            mid = (k + end) / 2n;
            if (mid ** 2n === a.number) {
                return util_1.normalize({
                    comma: a.comma / 2,
                    number: mid,
                    sign: false
                });
            }
            if (mid ** 2n < a.number) {
                k = mid + 1n;
            }
            else {
                end = mid - 1n;
            }
        }
    }
    let aprox = util_1.normalize(10n ** BigInt(Math.floor((`${a.number}`.length + a.comma) / 2)));
    let aprox1;
    while (true) {
        aprox1 = exports.multiply(exports.add(exports.divide(a, aprox), aprox), 0.5);
        if (comparison_1.lt(util_1.abs(exports.subtract(aprox1, aprox)), constants_1.ErrorConst)) {
            return aprox1;
        }
        aprox = aprox1;
    }
};
/**
 * @domain Numbers greater or equal 0
 * @returns Cubic root of number
 */
exports.cbrt = (a) => {
    a = util_1.normalize(a);
    if (a.sign) {
        throw new util_1.DomainError(util_1.stringify(a), 'numbers greater or equal 0');
    }
    if (a.number === 0n) {
        return {
            comma: 0,
            number: 0n,
            sign: false
        };
    }
    if (-a.comma % 3 === 0) {
        const len = BigInt(`${a.number}`.length);
        let k;
        let end;
        if (len % 3n === 1n) {
            k = 10n ** ((len - 1n) / 3n);
            end = 3n * k;
        }
        else if (len % 3n === 2n) {
            k = 2n * 10n ** ((len - 2n) / 3n);
            end = 5n * 10n ** ((len - 2n) / 3n);
        }
        else {
            k = 4n * 10n ** (len / 3n);
            end = 10n ** (len / 3n + 1n);
        }
        let mid;
        while (k <= end) {
            mid = (k + end) / 2n;
            if (mid ** 3n === a.number) {
                return util_1.normalize({
                    comma: a.comma / 3,
                    number: mid,
                    sign: false
                });
            }
            if (mid ** 3n < a.number) {
                k = mid + 1n;
            }
            else {
                end = mid - 1n;
            }
        }
    }
    let aprox = util_1.normalize(10n ** BigInt(Math.floor((`${a.number}`.length + a.comma) / 3)));
    let aprox1;
    while (true) {
        aprox1 = exports.divide(exports.add(exports.divide(a, exports.multiply(aprox, aprox)), exports.multiply(aprox, 2n)), 3n);
        if (comparison_1.lt(util_1.abs(exports.subtract(aprox1, aprox)), constants_1.ErrorConst)) {
            return aprox1;
        }
        aprox = aprox1;
    }
};
/**
 * @domain Real numbers
 * @returns Result of the exponentiation of e ^ parameter
 */
exports.exp = (a) => {
    const sh = trigonometry_1.sinh(a);
    return exports.add(sh, exports.sqrt(exports.add(1n, exports.multiply(sh, sh))));
};
/**
 * @domain Integers
 * @returns Product of all integers until given number
 */
exports.factorial = (a) => {
    a = util_1.normalize(a);
    if (a.comma !== 0 || a.sign) {
        throw new util_1.DomainError(util_1.stringify(a), 'positive integers');
    }
    let k = 1n;
    for (let i = 2n; i <= a.number; i += 1n) {
        k *= i;
    }
    return util_1.normalize(k);
};
exports.gamma = (a) => {
    /*
      g = 7
      data taken from:
      http://my.fit.edu/~gabdo/gammacoeff.txt
    */
    const p1 = '0.9999999999998099322768470047347829718009602570498980962898849358';
    const p = [
        '676.5203681218850985670091904440190381974449058924722569853678707',
        '-1259.139216722402870471560787552828410476730722910298369550296701',
        '771.3234287776530788486528258894307395627292390168566479072763666',
        '-176.6150291621405990658455135399941244433015398373585840448427972',
        '12.50734327868690481445893685327163629939919667813089937179501692',
        '-0.1385710952657201168955470698506320982416866194189568573645197562',
        '0.000009984369578019570859562668995694018788834042365371027657733820183',
        '0.0000001505632735149311558338355775386439360927036032480858107693939127'
    ];
    a = util_1.normalize(a);
    if (a.sign && a.comma === 0 && a.number % 2n === 0n) {
        throw new util_1.DomainError(util_1.stringify(a), 'not negative multiplications of 2');
    }
    let y;
    if (comparison_1.lte(a, 0.5)) {
        y = exports.divide(constants_1.PI, exports.multiply(trigonometry_1.sin(exports.multiply(constants_1.PI, a)), exports.gamma(exports.subtract(1, a))));
    }
    else {
        a = exports.subtract(a, 1n);
        let x = util_1.normalize(p1);
        for (let i = 0; i < p.length; i += 1) {
            x = exports.add(x, exports.divide(p[i], exports.add(a, i + 1)));
        }
        const t = exports.add(a, p.length - 0.5);
        y = exports.multiply(exports.multiply(exports.multiply(exports.sqrt(exports.multiply(constants_1.PI, 2n)), exports.power(t, exports.add(a, 0.5))), exports.exp(exports.multiply(t, -1n))), x);
    }
    return y;
};
//# sourceMappingURL=basic.js.map