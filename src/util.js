"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./basic");
const config_1 = require("./config");
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
            a = String(a);
            return exports.normalize({
                comma: a.indexOf('.') === -1 ? 0 : a.indexOf('.') + 1 - a.length,
                number: BigInt(a.split('.').join('').replace('-', '')),
                sign: a.indexOf('-') > -1
            });
        case 'bigint':
            return {
                comma: 0,
                number: a < BigInt(0) ? -a : a,
                sign: a < BigInt(0)
            };
        case 'string':
            const s = a.indexOf('-') > -1;
            return exports.normalize({
                comma: a.indexOf('.') === -1 ? 0 : a.indexOf('.') + 1 - a.length,
                number: BigInt(s ? a.split('.').join('').substr(1) : a.split('.').join('')),
                sign: s
            });
        case 'object':
            let x = a.number;
            if (x === BigInt(0)) {
                return {
                    comma: 0,
                    number: BigInt(0),
                    sign: false
                };
            }
            const sign = !(x < BigInt(0) === a.sign);
            let comma = a.comma;
            x = x < BigInt(0) ? -x : x;
            while (true) {
                if (x % BigInt(10) === BigInt(0)) {
                    comma += 1;
                    x /= BigInt(10);
                }
                else {
                    break;
                }
            }
            return {
                comma,
                number: x,
                sign
            };
    }
};
/**
 * Stringify BigNumber
 */
exports.stringify = (a) => {
    const s = String(a.number);
    if (a.comma < 0) {
        const len = s.length + a.comma;
        if (len > 0) {
            return `${a.sign ? '-' : ''}${s.substring(0, len)}.${s.substring(len)}`;
        }
        else {
            return `${a.sign ? '-' : ''}0.${'0'.repeat(-len) + s}`;
        }
    }
    else {
        return `${a.sign ? '-' : ''}${s}${'0'.repeat(a.comma)}`;
    }
};
exports.round = (a, precision = config_1.Config.precision, rounding = config_1.Config.rounding) => {
    a = exports.normalize(a);
    if (a.comma < -precision) {
        const b = exports.stringify(a).split('.');
        const c = Number(b[1][precision]);
        b[1] = b[1].substring(0, precision);
        if (c >= rounding) {
            return basic_1.add(b.join('.'), {
                comma: -precision,
                number: BigInt(1),
                sign: false
            });
        }
        return exports.normalize(b.join('.'));
    }
    return a;
};
//# sourceMappingURL=util.js.map