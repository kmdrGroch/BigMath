"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./basic");
/**
 * Custom error to handle invalid domain
 */
class DomainError extends RangeError {
    constructor(given, expected) {
        super(`Number out of domain. Given: ${given}. Expected: ${expected}`);
        this.name = 'DomainError';
    }
}
exports.DomainError = DomainError;
/**
 * Convert other types to BigNumber and normalize it
 */
exports.normalize = (a) => {
    switch (typeof a) {
        case 'number':
            a = `${a}`;
            return exports.normalize({
                comma: a.indexOf('.') === -1 ? 0 : a.indexOf('.') + 1 - a.length,
                number: BigInt(a.split('.').join('')),
                sign: false
            });
        case 'bigint':
            return {
                comma: 0,
                number: a < 0n ? -a : a,
                sign: a < 0n
            };
        case 'string':
            return exports.normalize({
                comma: a.indexOf('.') === -1 ? 0 : a.indexOf('.') + 1 - a.length,
                number: BigInt(a.split('.').join('')),
                sign: false
            });
        case 'object':
            if (a.number < 0n) {
                a.sign = !a.sign;
                a.number = -a.number;
            }
            if (a.comma === 0) {
                return { ...a };
            }
            let x = a.number;
            let comma = a.comma;
            while (true) {
                if (x % 10n === 0n && comma < 0) {
                    comma += 1;
                    x /= 10n;
                }
                else {
                    break;
                }
            }
            return {
                comma,
                number: x,
                sign: a.sign
            };
    }
};
/**
 * Stringify given number
 */
exports.stringify = (a) => {
    switch (typeof a) {
        case 'string':
        case 'bigint':
        case 'number':
            return `${a}`;
        default:
            const s = `${a.number}`;
            if (a.comma < 0) {
                const len = s.length + a.comma;
                if (len > 0) {
                    return `${a.sign ? '-' : ''}${s.substring(0, len)}.${s.substring(len)}`;
                }
                return `${a.sign ? '-' : ''}0.${'0'.repeat(-len) + s}`;
            }
            return `${a.sign ? '-' : ''}${s}${'0'.repeat(a.comma)}`;
    }
};
exports.round = (a) => {
    a = exports.normalize(a);
    if (a.comma < 0) {
        const b = exports.stringify(a).split('.');
        if (a.sign) {
            return +b[1][0] > 5 ? basic_1.subtract(b[0], 1n) : exports.normalize(b[0]);
        }
        return +b[1][0] >= 5 ? basic_1.add(b[0], 1n) : exports.normalize(b[0]);
    }
    return a;
};
exports.floor = (a) => {
    a = exports.normalize(a);
    if (a.sign) {
        const b = exports.stringify(a).split('.');
        return b[1] ? basic_1.subtract(b[0], 1) : exports.normalize(b[0]);
    }
    return exports.normalize(exports.stringify(a).split('.')[0]);
};
exports.ceil = (a) => {
    a = exports.normalize(a);
    if (!a.sign) {
        const b = exports.stringify(a).split('.');
        return b[1] ? basic_1.add(b[0], 1) : exports.normalize(b[0]);
    }
    return exports.normalize(exports.stringify(a).split('.')[0]);
};
/**
 * @returns Absolute value
 */
exports.abs = (a) => {
    a = exports.normalize(a);
    a.sign = false;
    return a;
};
/**
 * Checks if number is an integer
 */
exports.isInteger = (a) => exports.normalize(a).comma >= 0;
//# sourceMappingURL=util.js.map