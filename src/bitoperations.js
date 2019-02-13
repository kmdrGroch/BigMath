"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
/**
 * bitwise <<
 */
exports.bitLeft = (a, b) => util_1.normalize(BigInt(util_1.stringify(a)) << BigInt(util_1.stringify(b)));
/**
 * bitwise >>
 */
exports.bitRight = (a, b) => util_1.normalize(BigInt(util_1.stringify(a)) >> BigInt(util_1.stringify(b)));
/**
 * bitwise &
 */
exports.bitAND = (a, b) => util_1.normalize(BigInt(util_1.stringify(a)) & BigInt(util_1.stringify(b)));
/**
 * bitwise |
 */
exports.bitOR = (a, b) => util_1.normalize(BigInt(util_1.stringify(a)) | BigInt(util_1.stringify(b)));
/**
 * bitwise ^
 */
exports.bitXOR = (a, b) => util_1.normalize(BigInt(util_1.stringify(a)) ^ BigInt(util_1.stringify(b)));
/**
 * bitwise ~
 */
exports.bitNOT = (a) => util_1.normalize(~BigInt(util_1.stringify(a)));
//# sourceMappingURL=bitOperations.js.map
