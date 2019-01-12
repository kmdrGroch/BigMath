"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./src/basic");
const comparison_1 = require("./src/comparison");
const constants_1 = require("./src/constants");
const other_1 = require("./src/other");
const trigonometry_1 = require("./src/trigonometry");
const util_1 = require("./src/util");
exports.DomainError = util_1.DomainError;
exports.default = {
    acos: trigonometry_1.acos,
    acosh: trigonometry_1.acosh,
    acot: trigonometry_1.acot,
    acoth: trigonometry_1.acoth,
    acsc: trigonometry_1.acsc,
    acsch: trigonometry_1.acsch,
    add: basic_1.add,
    AGM: other_1.AGM,
    asec: trigonometry_1.asec,
    asech: trigonometry_1.asech,
    asin: trigonometry_1.asin,
    asinh: trigonometry_1.asinh,
    atan: trigonometry_1.atan,
    atan2: trigonometry_1.atan2,
    atanh: trigonometry_1.atanh,
    cos: trigonometry_1.cos,
    cosh: trigonometry_1.cosh,
    cot: trigonometry_1.cot,
    coth: trigonometry_1.coth,
    csc: trigonometry_1.csc,
    csch: trigonometry_1.csch,
    divide: basic_1.divide,
    E: constants_1.E,
    eq: comparison_1.eq,
    exp: basic_1.exp,
    floor: util_1.floor,
    gt: comparison_1.gt,
    gte: comparison_1.gte,
    K: other_1.K,
    ln: basic_1.ln,
    LOG10: constants_1.LOG10,
    LOG2: constants_1.LOG2,
    lt: comparison_1.lt,
    lte: comparison_1.lte,
    multiply: basic_1.multiply,
    neq: comparison_1.neq,
    normalize: util_1.normalize,
    PI: constants_1.PI,
    PI2: constants_1.PI2,
    power: basic_1.power,
    round: util_1.round,
    sec: trigonometry_1.sec,
    sech: trigonometry_1.sech,
    sin: trigonometry_1.sin,
    sinh: trigonometry_1.sinh,
    sqrt: basic_1.sqrt,
    stringify: util_1.stringify,
    subtract: basic_1.subtract,
    tan: trigonometry_1.tan,
    tanh: trigonometry_1.tanh
};
//# sourceMappingURL=index.js.map