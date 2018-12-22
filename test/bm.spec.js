"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bm_1 = require("../src/bm");
const chai_1 = require("chai");
describe('add', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.add(12.54354, 6.423525))).to.be.equal('18.967065');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.add(-12.54354, '-6.423525'))).to.be.equal('-18.967065');
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
    it('7', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.add(BigInt(-5), '3'))).to.be.equal('-2');
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
    it('7', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.subtract(-4.34, 1.34))).to.be.equal('-5.68');
    });
    it('8', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.subtract(4.34, -1.34))).to.be.equal('5.68');
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
        chai_1.expect(bm_1.default.stringify(bm_1.default.divide(8.423525, 100.54354))).to.be.equal('0.0837798728789537348694903720318580388158204893');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.divide(8.423525, 100))).to.be.equal('0.08423525');
    });
    it('3', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.divide(1, 2))).to.be.equal('0.5');
    });
    it('4', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.divide(2, 1.5))).to.be.equal('1.333333333333333333333333333333333333333333');
    });
    it('5', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.divide(2, '1.41666666666666666665'))).to.be.equal('1.411764705882352941193079584775086505190506');
    });
    it('6', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.divide(2, bm_1.default.add(10, -10)))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0. Expected: numbers other than 0');
    });
});
describe('ln', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.ln(8))).to.be.equal('2.0794415416798359282516963643745297042265375331861173223768630983240904193677859358');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.ln(0))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.ln(-123.423))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -123.423. Expected: numbers greater than 0');
    });
    it('3', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.ln(0.04))).to.be.equal('-3.2188758248682007492015186664523752790511655784316838838091369016759095806322140642');
    });
    it('4', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.ln(0.1))).to.be.equal('-2.30258509299404568401799144395745971490492285906510749665471812987932');
    });
    it('5', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.ln(0.5))).to.be.equal('-0.69314718055994530941723212145817656807550013436025525412');
    });
    it('6', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.ln(0.2))).to.be.equal('-1.6094379124341003746007593332261876395255642241631661618961369016759095806322140642');
    });
});
describe('exp', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.exp(0.43242))).to.be.equal('1.5409821917860738933829323161090366019199690740466656906283255569813516597957280819739584277016062507684783008388145764073385112810926001428758644412595763321128324887331972544231960974');
    });
});
describe('power', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.power(2, 3))).to.be.equal('8');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.power(0, 0))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0 ^ 0. Expected: real numbers | both can\'t be 0 at the same time');
    });
    it('3', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.power(1.74, 3.14))).to.be.equal('5.6927831324956102895214059211589568617057878582903846189892632198106893374127248823242712042771792855717479732660380303447262726811803422352403981187587586642792035715523571224277396271183355294945004980979654650350291873593574928365189496027554002425337215208439057362615787600548812920381630983608258973447193872611095599874017945540463752118065090492572853991568276066069028035196218466395004907786');
    });
    it('4', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.power(10, -3))).to.be.equal('0.001');
    });
    it('5', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.power(-2, 3))).to.be.equal('-8');
    });
    it('6', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.power(-2, 0.5))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -2 ^ 0.5. Expected: real numbers | not negative ^ non-integer');
    });
});
describe('sqrt', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.sqrt(2))).to.be.equal('1.4142135623730950488016887242096980785696717142810821533203125');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.sqrt(0))).to.be.equal('0');
    });
    it('3', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.sqrt(-54.23))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -54.23. Expected: numbers greater or equal 0');
    });
});
describe('sin', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.sin(1.523))).to.be.equal('0.998857973009621420980885813642');
    });
});
describe('cos', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.cos(0.43223))).to.be.equal('0.908033868459002230662516466361');
    });
});
describe('tan', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.tan(0.1243))).to.be.equal('0.12494414654734352405365453192949277796794');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.tan(bm_1.default.PI2))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 1.570796326794896619231321691639751442098584699687552910487. Expected: real numbers & x != PI/2 + k*PI (k - integer)');
    });
});
describe('cot', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.cot(0.1243))).to.be.equal('8.00357621892340908314694191873854312223338');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.cot(bm_1.default.PI))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 3.141592653589793238462643383279502884197169399375105820974. Expected: real numbers & x != k*PI (k - integer)');
    });
});
describe('sec', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.sec(0.1243))).to.be.equal('1.0077752922931004536756918747324428154464');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.sec(bm_1.default.PI2))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 1.570796326794896619231321691639751442098584699687552910487. Expected: real numbers & x != PI/2 + k*PI (k - integer)');
    });
});
describe('csc', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.csc(0.1243))).to.be.equal('8.0658063634156463351982914655668133538992');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.csc(bm_1.default.PI))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 3.141592653589793238462643383279502884197169399375105820974. Expected: real numbers & x != k*PI (k - integer)');
    });
});
describe('asin', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.asin(0.533))).to.be.equal('0.5621422382693426070971522842576262975337954080503320499385457');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.asin(1))).to.be.equal('1.570796326794896619231321691639751442098584699687552910487');
    });
    it('3', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.asin(1.0001))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 1.0001. Expected: numbers from range [-1, 1]');
    });
});
describe('acos', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acos(0.43223))).to.be.equal('1.12383207873275666998035755079066608037481537659971833748793077868497');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acos(-1))).to.be.equal('0');
    });
    it('3', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acos(1))).to.be.equal('0');
    });
    it('4', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.acos(1.0001))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 1.0001. Expected: numbers from range [-1, 1]');
    });
});
describe('atan', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.atan(0.1243))).to.be.equal('0.12366570450169812188959191619059270324788673471160668062023120112196937617757270759575611428884658365320873868462294');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.atan(0))).to.be.equal('0');
    });
});
describe('atan2', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.atan2(0.1243, 0))).to.be.equal('0');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.atan2(0.1243, 2.321))).to.be.equal('1.51729293611513921404568864965737042277476147190619535661884715396272');
    });
    it('3', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.atan2(-0.1243, 0))).to.be.equal('3.141592653589793238462643383279502884197169399375105820974');
    });
    it('4', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.atan2(-0.1243, 1.432))).to.be.equal('1.657380979726293965145260365216993980746274182752793127058498817593508');
    });
    it('5', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.atan2(-0.1243, -0.32))).to.be.equal('-1.941295464679711452492024830703880921997043032396204468999930621106755977204');
    });
    it('5', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.atan2(0, -0.32))).to.be.equal('-1.570796326794896619231321691639751442098584699687552910487');
    });
    it('6', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.atan2(0, 0))).to.throw(bm_1.DomainError, 'Number out of domain. Given: atan(0, 0). Expected: Real numbers | Both can\'t be 0');
    });
});
describe('acot', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acot(0.1243))).to.be.equal('1.44713062229319849734172977544915873885069796497594622986676879887803062382242729240424388571115341634679126131537706');
    });
});
describe('asec', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.asec(1.43223))).to.be.equal('0.797899637398147512173304456358103895544011835216796115387');
        chai_1.expect(bm_1.default.stringify(bm_1.default.asec(1))).to.be.equal('0');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.asec(0.4535))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0.4535. Expected: numbers not from range (-1, 1)');
    });
});
describe('acsc', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acsc(1.523))).to.be.equal('0.716300443472191833475772111768212952834942144649275768889');
        chai_1.expect(bm_1.default.stringify(bm_1.default.acsc(1))).to.be.equal('1.570796326794896619231321691639751442098584699687552910487');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.acsc(0.543))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0.543. Expected: numbers not from range (-1, 1)');
    });
});
describe('sinh', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.sinh(1.523))).to.be.equal('2.183952865910017052737450412515107375672758');
    });
});
describe('cosh', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.cosh(1.523))).to.be.equal('2.402009600421400673148886322385685365530322');
    });
});
describe('tanh', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.tanh(1.523))).to.be.equal('0.909219041225676840227934629350112661706365');
    });
});
describe('coth', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.coth(1.523))).to.be.equal('1.099844981966001809380675922203530638199647');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.coth(0))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0. Expected: real numbers without 0');
    });
});
describe('sech', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.sech(1.523))).to.be.equal('0.416318069596625794179980373716427845431619');
    });
});
describe('csch', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.csch(1.523))).to.be.equal('0.457885339747621582772201107258129370328669');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.csch(0))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0. Expected: real numbers without 0');
    });
});
describe('asinh', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.asinh(1.523))).to.be.equal('1.2074539771550620727031144922676934208108506906010682987550215457602430026933423687804129749516905457888901207979935689947404441501945172782533274733429');
    });
});
describe('acosh', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acosh(1))).to.be.equal('0');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acosh(3.132))).to.be.equal('1.808299817787071575127091121106546362781060882730228422328707933779054');
    });
    it('3', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.acosh(0.99))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0.99. Expected: numbers greater or equal 1');
    });
    it('4', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.acosh(-3))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -3. Expected: numbers greater or equal 1');
    });
});
describe('atanh', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.atanh(-0.12))).to.be.equal('-0.1205810284084440352303206434681134989450028');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.atanh(0.423))).to.be.equal('0.4513401657908764038337940150785025308505299');
    });
    it('3', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.atanh(1))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 1. Expected: numbers from range (-1, 1)');
    });
    it('4', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.atanh(-1))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -1. Expected: numbers from range (-1, 1)');
    });
    it('5', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.atanh(-1.523))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -1.523. Expected: numbers from range (-1, 1)');
    });
    it('6', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.atanh(1.523))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 1.523. Expected: numbers from range (-1, 1)');
    });
});
describe('acoth', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acoth(-1.12))).to.be.equal('-1.435839812442006071374611951053266032856243');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acoth(1.423))).to.be.equal('0.872694770885123881197980091442851219085524');
    });
    it('3', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.acoth(0.543))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0.543. Expected: numbers not from range [-1, 1]');
    });
    it('4', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.acoth(0))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0. Expected: numbers not from range [-1, 1]');
    });
    it('5', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.acoth(-1))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -1. Expected: numbers not from range [-1, 1]');
    });
    it('6', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.acoth(1))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 1. Expected: numbers not from range [-1, 1]');
    });
});
describe('asech', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.asech(1))).to.be.equal('0');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.asech(0.543))).to.be.equal('1.220266245966049346089984984498300908621782354208342794286783547992007187167712820788245893253133133032339278737719414082423472');
    });
    it('3', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.asech(-0.543))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -0.543. Expected: numbers from range (0,1]');
    });
    it('4', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.asech(0))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 0. Expected: numbers from range (0,1]');
    });
    it('5', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.asech(-1))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -1. Expected: numbers from range (0,1]');
    });
    it('6', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.asech(1.342))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 1.342. Expected: numbers from range (0,1]');
    });
});
describe('acsch', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acsch(-1.12))).to.be.equal('-0.803548254845450791307512359709610144594236146263149955326626138350106758417690851559836042899');
    });
    it('2', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.acsch(1.423))).to.be.equal('0.65491038024859147045714403478325217264921474059191977968513408834423816352632913519880766');
    });
});
describe('AGM', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.AGM(12, 6))).to.be.equal('8.7407461862814412151185942995904918498431707731706552207469940185546875');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.AGM(-12, 6))).to.throw(bm_1.DomainError, 'Number out of domain. Given: AGM(-12, 6). Expected: arguments have to be positive');
    });
    it('3', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.AGM(12, -6))).to.throw(bm_1.DomainError, 'Number out of domain. Given: AGM(12, -6). Expected: arguments have to be positive');
    });
});
describe('K', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.stringify(bm_1.default.K(0.32))).to.be.equal('1.6135037415649716545922387873211206083943');
    });
    it('2', () => {
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.K(1.32))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 1.32. Expected: number from range [-1, 1]');
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.K(-1.32))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -1.32. Expected: number from range [-1, 1]');
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.K(1))).to.throw(bm_1.DomainError, 'Number out of domain. Given: 1. Expected: number from range [-1, 1]');
        chai_1.expect(() => bm_1.default.stringify(bm_1.default.K(-1))).to.throw(bm_1.DomainError, 'Number out of domain. Given: -1. Expected: number from range [-1, 1]');
    });
});
describe('Comparison', () => {
    it('1', () => {
        chai_1.expect(bm_1.default.gte(12, 5)).to.be.true;
    });
    it('2', () => {
        chai_1.expect(bm_1.default.lte(12, 5)).to.be.false;
    });
    it('3', () => {
        chai_1.expect(bm_1.default.gte(5, 5)).to.be.true;
    });
    it('4', () => {
        chai_1.expect(bm_1.default.lte(5, 5)).to.be.true;
    });
    it('5', () => {
        chai_1.expect(bm_1.default.gt(5, 5)).to.be.false;
        chai_1.expect(bm_1.default.gt(12, 5)).to.be.true;
    });
    it('6', () => {
        chai_1.expect(bm_1.default.lt(5, 5)).to.be.false;
        chai_1.expect(bm_1.default.lt(2, 5)).to.be.true;
    });
    it('7', () => {
        chai_1.expect(bm_1.default.eq(5, 5)).to.be.true;
        chai_1.expect(bm_1.default.eq(2, 5)).to.be.false;
        chai_1.expect(bm_1.default.eq(-2, 5)).to.be.false;
        chai_1.expect(bm_1.default.eq(0.2, 1)).to.be.false;
    });
    it('8', () => {
        chai_1.expect(bm_1.default.neq(5, 5)).to.be.false;
        chai_1.expect(bm_1.default.neq(2, 5)).to.be.true;
        chai_1.expect(bm_1.default.neq(-2, 5)).to.be.true;
        chai_1.expect(bm_1.default.neq(2, 0.5)).to.be.true;
    });
});
//# sourceMappingURL=bm.spec.js.map