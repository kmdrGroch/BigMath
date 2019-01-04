"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./basic");
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
    for (let i = 0; i < 10; i += 1) {
        const c = util_1.normalize(a);
        a = basic_1.multiply(basic_1.add(c, b), 0.5);
        b = basic_1.sqrt(basic_1.multiply(c, b));
    }
    return a;
};
/**
 * @returns Complete elliptic integral of the first kind
 */
exports.K = (a) => {
    a = util_1.normalize(a);
    if (String(a.number).length > Math.abs(a.comma)) {
        throw new util_1.DomainError(util_1.stringify(a), 'number from range [-1, 1]');
    }
    return basic_1.divide(constants_1.PI2, exports.AGM(1, basic_1.sqrt(basic_1.subtract(1, basic_1.power(a, 2)))));
};
//# sourceMappingURL=other.js.map