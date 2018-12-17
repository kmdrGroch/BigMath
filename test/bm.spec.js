"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bm_1 = require("../src/bm");
const chai_1 = require("chai");
describe('add', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.add(12.54354, 6.423525))).to.be.equal('18.967065');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.add(-12.54354, -6.423525))).to.be.equal('-18.967065');
    });
    it('3', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.add(12.54354, 6.623525))).to.be.equal('19.167065');
    });
    it('4', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.add(0.54354, 0.423525))).to.be.equal('0.967065');
    });
    it('5', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.add(0.54354, 0.0423505))).to.be.equal('0.5858905');
    });
    it('6', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.add(92.54354, 8.423525))).to.be.equal('100.967065');
    });
});
describe('subtract', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.subtract(12.54354, 6.423525))).to.be.equal('6.120015');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.subtract(-12.54354, -6.423525))).to.be.equal('-6.120015');
    });
    it('3', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.subtract(0.54354, 0.423525))).to.be.equal('0.120015');
    });
    it('4', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.subtract(0.44354, 0.423525))).to.be.equal('0.020015');
    });
    it('5', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.subtract(0.54354, 0.0423505))).to.be.equal('0.5011895');
    });
    it('6', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.subtract(100.54354, 8.423525))).to.be.equal('92.120015');
    });
    it('6', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.subtract(8.423525, 100.54354))).to.be.equal('-92.120015');
    });
});
describe('multiply', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.multiply(8.423525, 100.54354))).to.be.equal('846.9310227785');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.multiply(8.423525, 100))).to.be.equal('842.3525');
    });
});
describe('divide', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.divide(8.423525, 100.54354))).to.be.equal('0.08377987287895373486949037203185803881582');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.divide(8.423525, 100))).to.be.equal('0.08423525');
    });
    it('3', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.divide(1, 2))).to.be.equal('0.5');
    });
    it('4', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.divide(2, 1.5))).to.be.equal('1.3333333333333333333333333333333333333333');
    });
    it('5', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.divide(2, '1.41666666666666666665'))).to.be.equal('1.4117647058823529411930795847750865051905');
    });
});
describe('ln', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.ln(8))).to.be.equal('2.0794415416798359282516963643745297042265397901929500114378491728346877242848862');
    });
});
describe('exp', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.exp(0.43242))).to.be.equal('1.54098219178607389338293231610903660191996907395949397751810090996714634384071234040050003579243116452471074325714198461');
    });
});
describe('power', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.power(2, 3))).to.be.equal('8');
    });
});
describe('sqrt', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.sqrt(2))).to.be.equal('1.41421356237309504880168872420969807856963333301544189453125');
    });
});
describe('sin', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.sin(1.523))).to.be.equal('0.998857973009621420980885813642');
    });
});
describe('asin', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.asin(0.533))).to.be.equal('0.56214223826934260709715228425762629753379502801831404218567');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.asin(1.0001))).to.throw(RangeError, 'Number out of domain. Given: 1.0001. Expected: numbers from range [-1, 1]');
    });
});
describe('sinh', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.sinh(1.523))).to.be.equal('2.1839528659100170527374504125151073756727');
    });
});
describe('asinh', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.asinh(1.523))).to.be.equal('1.207453977155088198078061994822606339279278262743314776033');
    });
});
//# sourceMappingURL=bm.spec.js.map