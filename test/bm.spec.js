"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../index");
describe('add', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.add(12.54354, 6.423525))).to.be.equal('18.967065');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.add(-12.54354, '-6.423525'))).to.be.equal('-18.967065');
    });
    it('3', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.add(12.54354, 6.623525))).to.be.equal('19.167065');
    });
    it('4', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.add(0.54354, 0.423525))).to.be.equal('0.967065');
    });
    it('5', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.add(0.54354, 0.0423505))).to.be.equal('0.5858905');
    });
    it('6', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.add(92.54354, 8.423525))).to.be.equal('100.967065');
    });
    it('7', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.add(BigInt(-5), '3'))).to.be.equal('-2');
    });
});
describe('subtract', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.subtract(12.54354, 6.423525))).to.be.equal('6.120015');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.subtract(-12.54354, -6.423525))).to.be.equal('-6.120015');
    });
    it('3', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.subtract(0.54354, 0.423525))).to.be.equal('0.120015');
    });
    it('4', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.subtract(0.44354, 0.423525))).to.be.equal('0.020015');
    });
    it('5', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.subtract(0.54354, 0.0423505))).to.be.equal('0.5011895');
    });
    it('6', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.subtract(100.54354, 8.423525))).to.be.equal('92.120015');
    });
    it('6', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.subtract(8.423525, 100.54354))).to.be.equal('-92.120015');
    });
    it('7', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.subtract(-4.34, 1.34))).to.be.equal('-5.68');
    });
    it('8', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.subtract(4.34, -1.34))).to.be.equal('5.68');
    });
});
describe('multiply', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.multiply(8.423525, 100.54354))).to.be.equal('846.9310227785');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.multiply(8.423525, 100))).to.be.equal('842.3525');
    });
});
describe('divide', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.divide(8.423525, 100.54354))).to.be.equal('0.0837798728789537348694903720318580388158204893123914');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.divide(8.423525, 100))).to.be.equal('0.08423525');
    });
    it('3', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.divide(1, 2))).to.be.equal('0.5');
    });
    it('4', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.divide(2, 1.5))).to.be.equal('1.33333333333333333333333333333333333333333333333333');
    });
    it('5', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.divide(2, '1.41666666666666666665'))).to.be.equal('1.41176470588235294119307958477508650519050681864441');
    });
    it('6', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.divide(2, index_1.default.add(10, -10)))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0. Expected: numbers other than 0');
    });
    it('7', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.divide(1, 0.0625))).to.be.equal('16');
    });
    it('8', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.divide(1432.543, '0.0000000000000000000000000000000000000000000000625'))).to.be.equal('22920688000000000000000000000000000000000000000000');
    });
});
describe('ln', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.ln(8))).to.be.equal('2.07944154167983592825169636437452970422653750923913960482499725303578184039854048805428672');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.ln(0))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
        chai_1.expect(() => index_1.default.stringify(index_1.default.ln(-123.423))).to.throw(index_1.DomainError, 'Number out of domain. Given: -123.423. Expected: numbers greater than 0');
    });
    it('3', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.ln(0.04))).to.be.equal('-3.21887582486820074920151866645237527905116560237866160136100274696421815960145951194571328');
    });
    it('4', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.ln(0.1))).to.be.equal('-2.30258509299404568401799145468436420760106438247039913357000274696421815960145951194571328');
    });
    it('5', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.ln(0.5))).to.be.equal('-0.69314718055994530941723212145817656807550013436025525412');
    });
    it('6', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.ln(0.2))).to.be.equal('-1.60943791243410037460075933322618763952556424811014387944800274696421815960145951194571328');
    });
});
describe('exp', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.exp(0.43242))).to.be.equal('1.540982191786073893382932316109036601919969074046665713783843665307777247178473303229901052383241349996726091757');
    });
});
describe('factorial', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.factorial(43))).to.be.equal('60415263063373835637355132068513997507264512000000000');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.factorial(1.2))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1.2. Expected: positive integers');
    });
    it('3', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.factorial(-12))).to.throw(index_1.DomainError, 'Number out of domain. Given: -12. Expected: positive integers');
    });
});
describe('power', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.power(2, 3))).to.be.equal('8');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.power(0, 0))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0 ^ 0. Expected: real numbers | both can\'t be 0 at the same time');
    });
    it('3', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.power(1.74, 3.14))).to.be.equal('5.69278313249561028952140592115895686170537303181160604557982514074642100873258667788913618614148591133757055286690531876');
    });
    it('4', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.power(10, -3))).to.be.equal('0.001');
    });
    it('5', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.power(-2, 3))).to.be.equal('-8');
    });
    it('6', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.power(-2, 0.5))).to.throw(index_1.DomainError, 'Number out of domain. Given: -2 ^ 0.5. Expected: real numbers | not negative ^ non-integer');
    });
});
describe('sqrt', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.sqrt(2))).to.be.equal('1.414213562373095048801688724209698078569671875376943333339691162109375');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.sqrt(0))).to.be.equal('0');
    });
    it('3', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.sqrt(-54.23))).to.throw(index_1.DomainError, 'Number out of domain. Given: -54.23. Expected: numbers greater or equal 0');
    });
    it('4', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.sqrt(4))).to.be.equal('2');
    });
    it('5', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.sqrt(2.25))).to.be.equal('1.5');
    });
    it('6', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.sqrt(0.1))).to.be.equal('0.3162277660168379331998893544432718533719555139325200003814697265625');
    });
});
describe('sin', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.sin(1.523))).to.be.equal('0.998857973009621420980885813642');
    });
});
describe('cos', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.cos(0.43223))).to.be.equal('0.908033868459002230662516466361');
    });
});
describe('tan', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.tan(0.1243))).to.be.equal('0.1249441465473435240536545319294927779679461833189');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.tan(index_1.default.PI2))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1.570796326794896619231321691639751442098584699687552910487. Expected: real numbers & x != PI/2 + k*PI (k - integer)');
    });
});
describe('cot', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.cot(0.1243))).to.be.equal('8.00357621892340908314694191873854312223338968683236');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.cot(index_1.default.PI))).to.throw(index_1.DomainError, 'Number out of domain. Given: 3.141592653589793238462643383279502884197169399375105820974. Expected: real numbers & x != k*PI (k - integer)');
    });
});
describe('sec', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.sec(0.1243))).to.be.equal('1.0077752922931004536756918747324428154464855530288');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.sec(index_1.default.PI2))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1.570796326794896619231321691639751442098584699687552910487. Expected: real numbers & x != PI/2 + k*PI (k - integer)');
    });
});
describe('csc', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.csc(0.1243))).to.be.equal('8.0658063634156463351982914655668133538992803364967');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.csc(index_1.default.PI))).to.throw(index_1.DomainError, 'Number out of domain. Given: 3.141592653589793238462643383279502884197169399375105820974. Expected: real numbers & x != k*PI (k - integer)');
    });
});
describe('asin', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.asin(0.533))).to.be.equal('0.56214223826934260709715228425762629753379541230891640249904946045346');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.asin(1))).to.be.equal('1.570796326794896619231321691639751442098584699687552910487');
    });
    it('3', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.asin(1.0001))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1.0001. Expected: numbers from range [-1, 1]');
    });
});
describe('acos', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acos(0.43223))).to.be.equal('1.123832078732756669980357550790666080374815373090286086814849095313534793664');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acos(-1))).to.be.equal('0');
    });
    it('3', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acos(1))).to.be.equal('0');
    });
    it('4', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.acos(1.0001))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1.0001. Expected: numbers from range [-1, 1]');
    });
});
describe('atan', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.atan(0.1243))).to.be.equal('0.123665704501698121889591916190592703247886768171934122311633382388679795389562243935320728604465377450233911639634454125464');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.atan(0))).to.be.equal('0');
    });
});
describe('atan2', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.atan2(0.1243, 0))).to.be.equal('0');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.atan2(0.1243, 2.321))).to.be.equal('1.517292936115139214045688649657370422774761407558037873262469618530219640756');
    });
    it('3', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.atan2(-0.1243, 0))).to.be.equal('3.141592653589793238462643383279502884197169399375105820974');
    });
    it('4', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.atan2(-0.1243, 1.432))).to.be.equal('1.65738097972629396514526036521699398074627379103258766261650447931746820587');
    });
    it('5', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.atan2(-0.1243, -0.32))).to.be.equal('-1.9412954646797114524920248307038809219970427177339947125992919186177037470328950304');
    });
    it('6', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.atan2(0, -0.32))).to.be.equal('-1.570796326794896619231321691639751442098584699687552910487');
    });
    it('7', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.atan2(0, 0))).to.throw(index_1.DomainError, 'Number out of domain. Given: atan(0, 0). Expected: Real numbers | Both can\'t be 0');
    });
});
describe('acot', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acot(0.1243))).to.be.equal('1.447130622293198497341729775449158738850697931515618788175366617611320204610437756064679271395534622549766088360365545874536');
    });
});
describe('asec', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.asec(1.43223))).to.be.equal('0.79789963739814751217330445635810389554401076890435469631104343');
        chai_1.expect(index_1.default.stringify(index_1.default.asec(1))).to.be.equal('0');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.asec(0.4535))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0.4535. Expected: numbers not from range (-1, 1)');
    });
});
describe('acsc', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acsc(1.523))).to.be.equal('0.7163004434721918334757721117682129528349423371738704816709211805');
        chai_1.expect(index_1.default.stringify(index_1.default.acsc(1))).to.be.equal('1.570796326794896619231321691639751442098584699687552910487');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.acsc(0.543))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0.543. Expected: numbers not from range (-1, 1)');
    });
});
describe('sinh', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.sinh(1.523))).to.be.equal('2.1839528659100170527374504125151073756727575391028342447427021606192557376828453705236473');
    });
});
describe('cosh', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.cosh(1.523))).to.be.equal('2.40200960042140067314888632238568536553032188456241378902212317503619036884142268526182365');
    });
});
describe('tanh', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.tanh(1.523))).to.be.equal('0.90921904122567684022793462935011266170636524820524');
    });
});
describe('coth', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.coth(1.523))).to.be.equal('1.0998449819660018093806759222035306381996482011032');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.coth(0))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0. Expected: real numbers without 0');
    });
});
describe('sech', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.sech(1.523))).to.be.equal('0.41631806959662579417998037371642784543161980096239');
    });
});
describe('csch', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.csch(1.523))).to.be.equal('0.45788533974762158277220110725812937032866923541846');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.csch(0))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0. Expected: real numbers without 0');
    });
});
describe('asinh', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.asinh(1.523))).to.be.equal('1.207453977155062072703114492267693420810850735404269404934312840297609776085793267677236351401971115683894603690565441860366636117707298045446426013256794765594');
    });
});
describe('acosh', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acosh(1))).to.be.equal('0');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acosh(3.132))).to.be.equal('1.8082998177870715751270911211065463627810607353325804408574689899487013807992');
    });
    it('3', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.acosh(0.99))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0.99. Expected: numbers greater or equal 1');
    });
    it('4', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.acosh(-3))).to.throw(index_1.DomainError, 'Number out of domain. Given: -3. Expected: numbers greater or equal 1');
    });
});
describe('atanh', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.atanh(-0.12))).to.be.equal('-0.120581028408444035230320643468113498945002839118501294522202911457241015687722355963547');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.atanh(0.423))).to.be.equal('0.4513401657908764038337940150785025308505313601111261041852613814060398570329528346807057115807381401694020970037313108458062984598722418');
    });
    it('3', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.atanh(1))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1. Expected: numbers from range (-1, 1)');
    });
    it('4', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.atanh(-1))).to.throw(index_1.DomainError, 'Number out of domain. Given: -1. Expected: numbers from range (-1, 1)');
    });
    it('5', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.atanh(-1.523))).to.throw(index_1.DomainError, 'Number out of domain. Given: -1.523. Expected: numbers from range (-1, 1)');
    });
    it('6', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.atanh(1.523))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1.523. Expected: numbers from range (-1, 1)');
    });
});
describe('acoth', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acoth(-1.12))).to.be.equal('-1.435839812442006071374611951053266032856243597544243047360385432771104476672687710060857143825205036');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acoth(1.423))).to.be.equal('0.872694770885123881197980091442851219085525067102803444610261800842086268757571552354881497279226');
    });
    it('3', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.acoth(0.543))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0.543. Expected: numbers not from range [-1, 1]');
    });
    it('4', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.acoth(0))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0. Expected: numbers not from range [-1, 1]');
    });
    it('5', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.acoth(-1))).to.throw(index_1.DomainError, 'Number out of domain. Given: -1. Expected: numbers not from range [-1, 1]');
    });
    it('6', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.acoth(1))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1. Expected: numbers not from range [-1, 1]');
    });
});
describe('asech', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.asech(1))).to.be.equal('0');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.asech(0.543))).to.be.equal('1.2202662459660493460899849844983009086217894834031683724731807685395757388858176606604616653028886699604108100872392392590285550922026');
    });
    it('3', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.asech(-0.543))).to.throw(index_1.DomainError, 'Number out of domain. Given: -0.543. Expected: numbers from range (0,1]');
    });
    it('4', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.asech(0))).to.throw(index_1.DomainError, 'Number out of domain. Given: 0. Expected: numbers from range (0,1]');
    });
    it('5', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.asech(-1))).to.throw(index_1.DomainError, 'Number out of domain. Given: -1. Expected: numbers from range (0,1]');
    });
    it('6', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.asech(1.342))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1.342. Expected: numbers from range (0,1]');
    });
});
describe('acsch', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acsch(-1.12))).to.be.equal('-0.80354825484545079130751235970961014459423636189300844408976646204076531494373058561051986802840396282');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.acsch(1.423))).to.be.equal('0.65491038024859147045714403478325217264921540095528608390515653631556705113526298525535867195868');
    });
});
describe('AGM', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.AGM(12, 6))).to.be.equal('8.740746186281441215118594299590491849843183659327704283469133079051971435546875');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.AGM(-12, 6))).to.throw(index_1.DomainError, 'Number out of domain. Given: AGM(-12, 6). Expected: arguments have to be positive');
    });
    it('3', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.AGM(12, -6))).to.throw(index_1.DomainError, 'Number out of domain. Given: AGM(12, -6). Expected: arguments have to be positive');
    });
});
describe('K', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.K(0.32))).to.be.equal('1.6135037415649716545922387873211206083943862678789');
    });
    it('2', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.K(1.32))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1.32. Expected: number from range [-1, 1]');
        chai_1.expect(() => index_1.default.stringify(index_1.default.K(-1.32))).to.throw(index_1.DomainError, 'Number out of domain. Given: -1.32. Expected: number from range [-1, 1]');
        chai_1.expect(() => index_1.default.stringify(index_1.default.K(1))).to.throw(index_1.DomainError, 'Number out of domain. Given: 1. Expected: number from range [-1, 1]');
        chai_1.expect(() => index_1.default.stringify(index_1.default.K(-1))).to.throw(index_1.DomainError, 'Number out of domain. Given: -1. Expected: number from range [-1, 1]');
    });
});
describe('Comparison', () => {
    it('1', () => {
        chai_1.expect(index_1.default.gte(12, 5)).to.be.true;
    });
    it('2', () => {
        chai_1.expect(index_1.default.lte(12, 5)).to.be.false;
    });
    it('3', () => {
        chai_1.expect(index_1.default.gte(5, 5)).to.be.true;
    });
    it('4', () => {
        chai_1.expect(index_1.default.lte(5, 5)).to.be.true;
    });
    it('5', () => {
        chai_1.expect(index_1.default.gt(5, 5)).to.be.false;
        chai_1.expect(index_1.default.gt(12, 5)).to.be.true;
    });
    it('6', () => {
        chai_1.expect(index_1.default.lt(5, 5)).to.be.false;
        chai_1.expect(index_1.default.lt(2, 5)).to.be.true;
    });
    it('7', () => {
        chai_1.expect(index_1.default.eq(5, 5)).to.be.true;
        chai_1.expect(index_1.default.eq(2, 5)).to.be.false;
        chai_1.expect(index_1.default.eq(-2, 2)).to.be.false;
        chai_1.expect(index_1.default.eq(0.2, 2)).to.be.false;
    });
    it('8', () => {
        chai_1.expect(index_1.default.neq(5, 5)).to.be.false;
        chai_1.expect(index_1.default.neq(2, 5)).to.be.true;
        chai_1.expect(index_1.default.neq(0.2, 2)).to.be.true;
        chai_1.expect(index_1.default.neq(-2, 2)).to.be.true;
    });
});
describe('Rounding', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.round(0.78))).to.be.equal('1');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.round(43242))).to.be.equal('43242');
    });
    it('3', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.round(0.356))).to.be.equal('0');
    });
    it('4', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.floor(43242))).to.be.equal('43242');
    });
    it('5', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.floor(12.32))).to.be.equal('12');
    });
    it('6', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.floor(-12.32))).to.be.equal('-13');
    });
    it('7', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.floor(-12))).to.be.equal('-12');
    });
    it('8', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.ceil(43242))).to.be.equal('43242');
    });
    it('9', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.ceil(12.32))).to.be.equal('13');
    });
    it('10', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.ceil(-12.32))).to.be.equal('-12');
    });
    it('11', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.ceil(-12))).to.be.equal('-12');
    });
});
describe('abs', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.abs(-12.32))).to.be.equal('12.32');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.abs(12.32))).to.be.equal('12.32');
    });
});
describe('isInteger', () => {
    it('1', () => {
        chai_1.expect(index_1.default.isInteger(-12)).to.be.equal(true);
    });
    it('2', () => {
        chai_1.expect(index_1.default.isInteger(12)).to.be.equal(true);
    });
    it('2', () => {
        chai_1.expect(index_1.default.isInteger(-12.32)).to.be.equal(false);
    });
    it('3', () => {
        chai_1.expect(index_1.default.isInteger(12.32)).to.be.equal(false);
    });
});
describe('gamma', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.gamma(1.24))).to.be.equal('0.90852105833995950017936149490276840952505395959157750262770689555647993914729833618074490981280661435587416214377641693077750803379629325018713521068401033249408436268660581255206743325275700938994383618970484569254051852426516448811492864973473665211675676988198317606008052825927734375');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.gamma(0.24))).to.be.equal('3.7855044097498307983938579893681122086461460249074');
    });
    it('3', () => {
        chai_1.expect(() => index_1.default.stringify(index_1.default.gamma(-2))).to.throw(index_1.DomainError, 'Number out of domain. Given: -2. Expected: not negative multiplications of 2');
    });
});
describe('stringify', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(234.24234)).to.be.equal('234.24234');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify('-423.34234')).to.be.equal('-423.34234');
    });
    it('3', () => {
        chai_1.expect(index_1.default.stringify(BigInt(43254235))).to.be.equal('43254235');
    });
});
describe('bit operations', () => {
    it('1', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.bitLeft(4325, 3))).to.be.equal('34600');
    });
    it('2', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.bitRight(4325, 3))).to.be.equal('540');
    });
    it('3', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.bitOR(4325, 5433))).to.be.equal('5629');
    });
    it('4', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.bitXOR(4325, 3243))).to.be.equal('7246');
    });
    it('5', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.bitNOT(4325))).to.be.equal('-4326');
    });
    it('6', () => {
        chai_1.expect(index_1.default.stringify(index_1.default.bitAND(4325, 1235))).to.be.equal('193');
    });
});
//# sourceMappingURL=bm.spec.js.map