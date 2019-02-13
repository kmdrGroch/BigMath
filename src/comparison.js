"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./basic");
const util_1 = require("./util");
/**
 * @returns If first parameter is greater than or equal second parameter
 */
exports.gte = (a, b) => !basic_1.subtract(a, b).sign;
/**
 * @returns If first parameter is smaller than or equal second parameter
 */
exports.lte = (a, b) => {
    const k = basic_1.subtract(a, b);
    return k.sign || k.number === 0n;
};
/**
 * @returns If first parameter is greater than second parameter
 */
exports.gt = (a, b) => {
    const x = basic_1.subtract(a, b);
    return !x.sign && x.number !== 0n;
};
/**
 * @returns If first parameter is smaller than second parameter
 */
exports.lt = (a, b) => basic_1.subtract(a, b).sign;
/**
 * @returns If first parameter is equal second parameter
 */
exports.eq = (a, b) => {
    a = util_1.normalize(a);
    b = util_1.normalize(b);
    return a.sign === b.sign && a.comma === b.comma && a.number === b.number;
};
/**
 * @returns If first parameter is not equal second parameter
 */
exports.neq = (a, b) => {
    a = util_1.normalize(a);
    b = util_1.normalize(b);
    return a.sign !== b.sign || a.comma !== b.comma || a.number !== b.number;
};
//# sourceMappingURL=comparison.js.map