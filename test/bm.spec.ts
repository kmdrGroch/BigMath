import { expect } from 'chai';

import BigMath, { DomainError } from '../index';

describe('add', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.add(12.54354, 6.423525))).to.be.equal('18.967065');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.add(-12.54354, '-6.423525'))).to.be.equal('-18.967065');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.add(12.54354, 6.623525))).to.be.equal('19.167065');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.add(0.54354, 0.423525))).to.be.equal('0.967065');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.add(0.54354, 0.0423505))).to.be.equal('0.5858905');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.add(92.54354, 8.423525))).to.be.equal('100.967065');
  });
  it('7', () => {
    expect(BigMath.stringify(BigMath.add(BigInt(-5), '3'))).to.be.equal('-2');
  });
});

describe('subtract', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.subtract(12.54354, 6.423525))).to.be.equal('6.120015');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.subtract(-12.54354, -6.423525))).to.be.equal('-6.120015');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.subtract(0.54354, 0.423525))).to.be.equal('0.120015');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.subtract(0.44354, 0.423525))).to.be.equal('0.020015');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.subtract(0.54354, 0.0423505))).to.be.equal('0.5011895');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.subtract(100.54354, 8.423525))).to.be.equal('92.120015');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.subtract(8.423525, 100.54354))).to.be.equal('-92.120015');
  });
  it('7', () => {
    expect(BigMath.stringify(BigMath.subtract(-4.34, 1.34))).to.be.equal('-5.68');
  });
  it('8', () => {
    expect(BigMath.stringify(BigMath.subtract(4.34, -1.34))).to.be.equal('5.68');
  });
});

describe('multiply', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.multiply(8.423525, 100.54354))).to.be.equal('846.9310227785');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.multiply(8.423525, 100))).to.be.equal('842.3525');
  });
});

describe('divide', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.divide(8.423525, 100.54354))).to.be.equal('0.0837798728789537348694903720318580388158204893123914');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.divide(8.423525, 100))).to.be.equal('0.08423525');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.divide(1, 2))).to.be.equal('0.5');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.divide(2, 1.5))).to.be.equal('1.33333333333333333333333333333333333333333333333333');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.divide(2, '1.41666666666666666665'))).to.be.equal('1.41176470588235294119307958477508650519050681864441');
  });
  it('6', () => {
    expect(() => BigMath.stringify(BigMath.divide(2, BigMath.add(10, -10)))).to.throw(
      DomainError,
      'Number out of domain. Given: 0. Expected: numbers other than 0'
    );
  });
  it('7', () => {
    expect(BigMath.stringify(BigMath.divide(1, 0.0625))).to.be.equal('16');
  });
  it('8', () => {
    expect(BigMath.stringify(BigMath.divide(1432.543, '0.0000000000000000000000000000000000000000000000625'))).to.be.equal(
      '22920688000000000000000000000000000000000000000000'
    );
  });
  it('9', () => {
    expect(BigMath.stringify(BigMath.divide(-3, '2.0'))).to.be.equal('-1.5');
  });
});

describe('ln', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.ln(8))).to.be.equal('2.0794415416798359282516963643745297042265');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.ln(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
    expect(() => BigMath.stringify(BigMath.ln(-123.423))).to.throw(
      DomainError,
      'Number out of domain. Given: -123.423. Expected: numbers greater than 0'
    );
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.ln(0.04))).to.be.equal('-3.2188758248682007492015186664523752790512');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.ln(0.1))).to.be.equal('-2.3025850929940456840179914546843642076011');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.ln(0.5))).to.be.equal('-0.6931471805599453094172321214581765680755');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.ln(0.2))).to.be.equal('-1.6094379124341003746007593332261876395256');
  });
});

describe('log2', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.log2(8))).to.be.equal('3');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.log2(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
    expect(() => BigMath.stringify(BigMath.log2(-123.423))).to.throw(
      DomainError,
      'Number out of domain. Given: -123.423. Expected: numbers greater than 0'
    );
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.log2(0.04))).to.be.equal('-4.6438561897747246957406388589787803517297');
  });
});

describe('log10', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.log10(8))).to.be.equal('0.9030899869919435856412166841734790803046');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.log10(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
    expect(() => BigMath.stringify(BigMath.log10(-123.423))).to.throw(
      DomainError,
      'Number out of domain. Given: -123.423. Expected: numbers greater than 0'
    );
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.log10(0.04))).to.be.equal('-1.3979400086720376095725222105510139464636');
  });
});

describe('log1p', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.ln1p(8))).to.be.equal('2.197224577336219382790490473845051409295');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.ln1p(-1))).to.throw(DomainError, 'Number out of domain. Given: -1. Expected: numbers greater than -1');
    expect(() => BigMath.stringify(BigMath.ln1p(-123.423))).to.throw(
      DomainError,
      'Number out of domain. Given: -123.423. Expected: numbers greater than -1'
    );
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.ln1p(0.04))).to.be.equal('0.0392207131532812962692008965711198938296');
  });
});

describe('exp', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.exp(0.43242))).to.be.equal('1.54098219178607389338293231610903660192');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.exp(0))).to.be.equal('1');
  });
});

describe('expm1', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.expm1(0.43242))).to.be.equal('0.54098219178607389338293231610903660192');
  });
});

describe('factorial', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.factorial(43))).to.be.equal('60415263063373835637355132068513997507264512000000000');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.factorial(84))).to.be.equal(
      '3314240134565353266999387579130131288000666286242049487118846032383059131291716864129885722968716753156177920000000000000000000'
    );
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.factorial(0))).to.be.equal('1');
  });
  it('4', () => {
    expect(() => BigMath.stringify(BigMath.factorial(1.2))).to.throw(DomainError, 'Number out of domain. Given: 1.2. Expected: positive integers');
  });
  it('5', () => {
    expect(() => BigMath.stringify(BigMath.factorial(-12))).to.throw(DomainError, 'Number out of domain. Given: -12. Expected: positive integers');
  });
});

describe('power', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.power(2, 3))).to.be.equal('8');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.power(0, 0))).to.throw(
      DomainError,
      "Number out of domain. Given: 0 ^ 0. Expected: real numbers | both can't be 0 at the same time"
    );
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.power(1.74, 3.14))).to.be.equal('5.6927831324956102895214059211589568617058');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.power(10, -3))).to.be.equal('0.001');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.power(-2, 3))).to.be.equal('-8');
  });
  it('6', () => {
    expect(() => BigMath.stringify(BigMath.power(-2, 0.5))).to.throw(
      DomainError,
      'Number out of domain. Given: -2 ^ 0.5. Expected: real numbers | not negative ^ non-integer'
    );
  });
});

describe('sqrt', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.sqrt(2))).to.be.equal('1.4142135623730950488016887242096980785697');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.sqrt(0))).to.be.equal('0');
  });
  it('3', () => {
    expect(() => BigMath.stringify(BigMath.sqrt(-54.23))).to.throw(
      DomainError,
      'Number out of domain. Given: -54.23. Expected: numbers greater or equal 0'
    );
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.sqrt(4))).to.be.equal('2');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.sqrt(2.25))).to.be.equal('1.5');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.sqrt(0.1))).to.be.equal('0.316227766016837933199889354443271853372');
  });
  it('7', () => {
    expect(BigMath.stringify(BigMath.sqrt(0.14))).to.be.equal('0.3741657386773941385583748732316549301756');
  });
});

describe('sin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.sin(1.523))).to.be.equal('0.9988579730096214209808858136421039801421');
  });
});

describe('cos', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.cos(0.43223))).to.be.equal('0.9080338684590022306625164663612605645159');
  });
});

describe('tan', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.tan(0.1243))).to.be.equal('0.1249441465473435240536545319296487936837');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.tan(BigMath.PI2))).to.throw(
      DomainError,
      'Number out of domain. Given: 1.570796326794896619231321691639751442098584699687552910487. Expected: real numbers & x != PI/2 + k*PI (k - integer)'
    );
  });
});

describe('cot', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.cot(0.1243))).to.be.equal('8.0035762189234090831469419187285491872871');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.cot(BigMath.PI))).to.throw(
      DomainError,
      'Number out of domain. Given: 3.141592653589793238462643383279502884197169399375105820974. Expected: real numbers & x != k*PI (k - integer)'
    );
  });
});

describe('sec', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.sec(0.1243))).to.be.equal('1.0077752922931004536756918747321979887282');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.sec(BigMath.PI2))).to.throw(
      DomainError,
      'Number out of domain. Given: 1.570796326794896619231321691639751442098584699687552910487. Expected: real numbers & x != PI/2 + k*PI (k - integer)'
    );
  });
});

describe('csc', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.csc(0.1243))).to.be.equal('8.0658063634156463351982914655547822238875');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.csc(BigMath.PI))).to.throw(
      DomainError,
      'Number out of domain. Given: 3.141592653589793238462643383279502884197169399375105820974. Expected: real numbers & x != k*PI (k - integer)'
    );
  });
});

describe('asin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.asin(0.533))).to.be.equal('0.5621422382693426071105136373677509128263');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.asin(1))).to.be.equal('1.570796326794896619231321691639751442098584699687552910487');
  });
  it('3', () => {
    expect(() => BigMath.stringify(BigMath.asin(1.0001))).to.throw(
      DomainError,
      'Number out of domain. Given: 1.0001. Expected: numbers from range [-1, 1]'
    );
  });
});

describe('acos', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.acos(0.43223))).to.be.equal('1.123832078732756669980357528914145635922884699687552910487');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.acos(-1))).to.be.equal('0');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.acos(1))).to.be.equal('0');
  });
  it('4', () => {
    expect(() => BigMath.stringify(BigMath.acos(1.0001))).to.throw(
      DomainError,
      'Number out of domain. Given: 1.0001. Expected: numbers from range [-1, 1]'
    );
  });
});

describe('atan', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.atan(0.1243))).to.be.equal('0.1236657045016981218895919161905927032479');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.atan(0))).to.be.equal('0');
  });
});

describe('atan2', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.atan2(0.1243, 0))).to.be.equal('0');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.atan2(0.1243, 2.321))).to.be.equal('1.5172929361151392140456886741612160763981');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.atan2(-0.1243, 0))).to.be.equal('3.141592653589793238462643383279502884197169399375105820974');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.atan2(-0.1243, 1.432))).to.be.equal('1.6573809797262939651452603596017768413177');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.atan2(-0.1243, -0.32))).to.be.equal('-1.9412954646797114524920248307038758929791');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.atan2(0, -0.32))).to.be.equal('-1.570796326794896619231321691639751442098584699687552910487');
  });
  it('7', () => {
    expect(() => BigMath.stringify(BigMath.atan2(0, 0))).to.throw(
      DomainError,
      "Number out of domain. Given: atan(0, 0). Expected: Real numbers | Both can't be 0"
    );
  });
});

describe('acot', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.acot(0.1243))).to.be.equal('1.4471306222931984973417297754491587388507');
  });
});

describe('asec', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.asec(1.43223))).to.be.equal('0.7978996373977028411316596365555153767914');
    expect(BigMath.stringify(BigMath.asec(1))).to.be.equal('0');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.asec(0.4535))).to.throw(
      DomainError,
      'Number out of domain. Given: 0.4535. Expected: numbers not from range (-1, 1)'
    );
  });
});

describe('acsc', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.acsc(1.523))).to.be.equal('0.7163004434722002469910898336541666012824');
    expect(BigMath.stringify(BigMath.acsc(1))).to.be.equal('1.570796326794896619231321691639751442098584699687552910487');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.acsc(0.543))).to.throw(
      DomainError,
      'Number out of domain. Given: 0.543. Expected: numbers not from range (-1, 1)'
    );
  });
});

describe('sinh', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.sinh(1.523))).to.be.equal('2.1839528659100170527374504125151073756728');
  });
});

describe('cosh', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.cosh(1.523))).to.be.equal('2.4020096004214006731488863223856853655303');
  });
});

describe('tanh', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.tanh(1.523))).to.be.equal('0.9092190412256768402279346293501126617064');
  });
});

describe('coth', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.coth(1.523))).to.be.equal('1.0998449819660018093806759222035306381996');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.coth(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: real numbers without 0');
  });
});

describe('sech', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.sech(1.523))).to.be.equal('0.4163180695966257941799803737164278454316');
  });
});

describe('csch', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.csch(1.523))).to.be.equal('0.4578853397476215827722011072581293703287');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.csch(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: real numbers without 0');
  });
});

describe('asinh', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.asinh(1.523))).to.be.equal('1.2074539771550620727031144922676934208108');
  });
});

describe('acosh', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.acosh(1))).to.be.equal('0');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.acosh(3.132))).to.be.equal('1.8082998177870715751270911181779556033365');
  });
  it('3', () => {
    expect(() => BigMath.stringify(BigMath.acosh(0.99))).to.throw(
      DomainError,
      'Number out of domain. Given: 0.99. Expected: numbers greater or equal 1'
    );
  });
  it('4', () => {
    expect(() => BigMath.stringify(BigMath.acosh(-3))).to.throw(DomainError, 'Number out of domain. Given: -3. Expected: numbers greater or equal 1');
  });
});

describe('atanh', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.atanh(-0.12))).to.be.equal('-0.1205810284084440352303206434681134989455');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.atanh(0.423))).to.be.equal('0.4513401657908764038337940150785025308506');
  });
  it('3', () => {
    expect(() => BigMath.stringify(BigMath.atanh(1))).to.throw(DomainError, 'Number out of domain. Given: 1. Expected: numbers from range (-1, 1)');
  });
  it('4', () => {
    expect(() => BigMath.stringify(BigMath.atanh(-1))).to.throw(DomainError, 'Number out of domain. Given: -1. Expected: numbers from range (-1, 1)');
  });
  it('5', () => {
    expect(() => BigMath.stringify(BigMath.atanh(-1.523))).to.throw(
      DomainError,
      'Number out of domain. Given: -1.523. Expected: numbers from range (-1, 1)'
    );
  });
  it('6', () => {
    expect(() => BigMath.stringify(BigMath.atanh(1.523))).to.throw(
      DomainError,
      'Number out of domain. Given: 1.523. Expected: numbers from range (-1, 1)'
    );
  });
});

describe('acoth', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.acoth(-1.12))).to.be.equal('-1.4358398124420060713746119510532660328563');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.acoth(1.423))).to.be.equal('0.8726947708851238811979800914428512190856');
  });
  it('3', () => {
    expect(() => BigMath.stringify(BigMath.acoth(0.543))).to.throw(
      DomainError,
      'Number out of domain. Given: 0.543. Expected: numbers not from range [-1, 1]'
    );
  });
  it('4', () => {
    expect(() => BigMath.stringify(BigMath.acoth(0))).to.throw(
      DomainError,
      'Number out of domain. Given: 0. Expected: numbers not from range [-1, 1]'
    );
  });
  it('5', () => {
    expect(() => BigMath.stringify(BigMath.acoth(-1))).to.throw(
      DomainError,
      'Number out of domain. Given: -1. Expected: numbers not from range [-1, 1]'
    );
  });
  it('6', () => {
    expect(() => BigMath.stringify(BigMath.acoth(1))).to.throw(
      DomainError,
      'Number out of domain. Given: 1. Expected: numbers not from range [-1, 1]'
    );
  });
});

describe('asech', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.asech(1))).to.be.equal('0');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.asech(0.543))).to.be.equal('1.2202662459660493460899849844983009086218');
  });
  it('3', () => {
    expect(() => BigMath.stringify(BigMath.asech(-0.543))).to.throw(
      DomainError,
      'Number out of domain. Given: -0.543. Expected: numbers from range (0,1]'
    );
  });
  it('4', () => {
    expect(() => BigMath.stringify(BigMath.asech(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers from range (0,1]');
  });
  it('5', () => {
    expect(() => BigMath.stringify(BigMath.asech(-1))).to.throw(DomainError, 'Number out of domain. Given: -1. Expected: numbers from range (0,1]');
  });
  it('6', () => {
    expect(() => BigMath.stringify(BigMath.asech(1.342))).to.throw(
      DomainError,
      'Number out of domain. Given: 1.342. Expected: numbers from range (0,1]'
    );
  });
});

describe('acsch', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.acsch(-1.12))).to.be.equal('-0.8035482548454507913075123597096101445943');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.acsch(1.423))).to.be.equal('0.6549103802485914704571440347832521726492');
  });
});

describe('AGM', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.AGM(12, 6))).to.be.equal('8.7407461862814412151185942995904918498432');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.AGM(-12, 6))).to.throw(
      DomainError,
      'Number out of domain. Given: AGM(-12, 6). Expected: arguments have to be positive'
    );
  });
  it('3', () => {
    expect(() => BigMath.stringify(BigMath.AGM(12, -6))).to.throw(
      DomainError,
      'Number out of domain. Given: AGM(12, -6). Expected: arguments have to be positive'
    );
  });
});

describe('K', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.K(0.32))).to.be.equal('1.6135037415649716545922387873211206083943');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.K(1.32))).to.throw(DomainError, 'Number out of domain. Given: 1.32. Expected: number from range [-1, 1]');
    expect(() => BigMath.stringify(BigMath.K(-1.32))).to.throw(
      DomainError,
      'Number out of domain. Given: -1.32. Expected: number from range [-1, 1]'
    );
    expect(() => BigMath.stringify(BigMath.K(1))).to.throw(DomainError, 'Number out of domain. Given: 1. Expected: number from range [-1, 1]');
    expect(() => BigMath.stringify(BigMath.K(-1))).to.throw(DomainError, 'Number out of domain. Given: -1. Expected: number from range [-1, 1]');
  });
});

describe('Comparison', () => {
  it('1', () => {
    expect(BigMath.gte(12, 5)).to.be.true;
  });
  it('2', () => {
    expect(BigMath.lte(12, 5)).to.be.false;
  });
  it('3', () => {
    expect(BigMath.gte(5, 5)).to.be.true;
  });
  it('4', () => {
    expect(BigMath.lte(5, 5)).to.be.true;
  });
  it('5', () => {
    expect(BigMath.gt(5, 5)).to.be.false;
    expect(BigMath.gt(12, 5)).to.be.true;
  });
  it('6', () => {
    expect(BigMath.lt(5, 5)).to.be.false;
    expect(BigMath.lt(2, 5)).to.be.true;
  });
  it('7', () => {
    expect(BigMath.eq(5, 5)).to.be.true;
    expect(BigMath.eq(2, 5)).to.be.false;
    expect(BigMath.eq(-2, 2)).to.be.false;
    expect(BigMath.eq(0.2, 2)).to.be.false;
  });
  it('8', () => {
    expect(BigMath.neq(5, 5)).to.be.false;
    expect(BigMath.neq(2, 5)).to.be.true;
    expect(BigMath.neq(0.2, 2)).to.be.true;
    expect(BigMath.neq(-2, 2)).to.be.true;
  });
});

describe('Rounding', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.round(0.78))).to.be.equal('1');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.round(43242))).to.be.equal('43242');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.round(0.356))).to.be.equal('0');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.round(0.56))).to.be.equal('1');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.round(-1.2))).to.be.equal('-1');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.round(-1.5))).to.be.equal('-1');
  });
  it('7', () => {
    expect(BigMath.stringify(BigMath.round(-1.7))).to.be.equal('-2');
  });
  it('8', () => {
    expect(BigMath.stringify(BigMath.floor(43242))).to.be.equal('43242');
  });
  it('9', () => {
    expect(BigMath.stringify(BigMath.floor(12.32))).to.be.equal('12');
  });
  it('10', () => {
    expect(BigMath.stringify(BigMath.floor(-12.32))).to.be.equal('-13');
  });
  it('11', () => {
    expect(BigMath.stringify(BigMath.floor(-12))).to.be.equal('-12');
  });
  it('12', () => {
    expect(BigMath.stringify(BigMath.ceil(43242))).to.be.equal('43242');
  });
  it('13', () => {
    expect(BigMath.stringify(BigMath.ceil(12.32))).to.be.equal('13');
  });
  it('14', () => {
    expect(BigMath.stringify(BigMath.ceil(-12.32))).to.be.equal('-12');
  });
  it('15', () => {
    expect(BigMath.stringify(BigMath.ceil(-12))).to.be.equal('-12');
  });
});

describe('abs', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.abs(-12.32))).to.be.equal('12.32');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.abs(12.32))).to.be.equal('12.32');
  });
});

describe('isInteger', () => {
  it('1', () => {
    expect(BigMath.isInteger(-12)).to.be.equal(true);
  });
  it('2', () => {
    expect(BigMath.isInteger(12)).to.be.equal(true);
  });
  it('2', () => {
    expect(BigMath.isInteger(-12.32)).to.be.equal(false);
  });
  it('3', () => {
    expect(BigMath.isInteger(12.32)).to.be.equal(false);
  });
});

describe('gamma', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.gamma(1.24))).to.be.equal('0.9085210583399594331164916106437218477643');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.gamma(0.24))).to.be.equal('3.7855044097498308309758273555809824555702');
  });
  it('3', () => {
    expect(() => BigMath.stringify(BigMath.gamma(-2))).to.throw(
      DomainError,
      'Number out of domain. Given: -2. Expected: not negative multiplications of 2'
    );
  });
});

describe('stringify', () => {
  it('1', () => {
    expect(BigMath.stringify(234.24234)).to.be.equal('234.24234');
  });
  it('2', () => {
    expect(BigMath.stringify('-423.34234')).to.be.equal('-423.34234');
  });
  it('3', () => {
    expect(BigMath.stringify(BigInt(43254235))).to.be.equal('43254235');
  });
});

describe('bit operations', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.bitLeft(4325, 3))).to.be.equal('34600');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.bitRight(4325, 3))).to.be.equal('540');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.bitOR(4325, 5433))).to.be.equal('5629');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.bitXOR(4325, 3243))).to.be.equal('7246');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.bitNOT(4325))).to.be.equal('-4326');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.bitAND(4325, 1235))).to.be.equal('193');
  });
});

describe('W', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.W(0))).to.be.equal('0');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.W(1))).to.be.equal('0.56714329040978387299996866221035554975381578');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.W(0.1))).to.be.equal('0.0912765271608622642998957214231795686531');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.W(123))).to.be.equal('3.5462840473366787594615668102174339592395');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.W(5.321))).to.be.equal('1.3624077308379869368091588521095263646221');
  });
  it('6', () => {
    expect(() => BigMath.stringify(BigMath.W(-2))).to.throw(DomainError, 'Number out of domain. Given: -2. Expected: number bigger than -log(2) / 2');
  });
});

describe('XY', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.XY(0.1))).to.be.equal('0.3990129782602520715964708106240920239962');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.XY(1.21))).to.be.equal('1.2751596577217704514362596823249064058603');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.XY(1))).to.be.equal('1');
  });
  it('4', () => {
    expect(() => BigMath.stringify(BigMath.XY(-2))).to.throw(
      DomainError,
      'Number out of domain. Given: -2. Expected: number bigger than 0 and less than sqrt(2)'
    );
  });
  it('5', () => {
    expect(() => BigMath.stringify(BigMath.XY(1.5))).to.throw(
      DomainError,
      'Number out of domain. Given: 1.5. Expected: number bigger than 0 and less than sqrt(2)'
    );
  });
});

describe('cbrt', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.cbrt(1000))).to.be.equal('10');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.cbrt(1.728))).to.be.equal('1.2');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.cbrt(-54.233))).to.be.equal('-3.7851916754719890277586141982554378185636');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.cbrt(33168.984597))).to.be.equal('32.13');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.cbrt(239830.305597))).to.be.equal('62.13');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.cbrt(12.43))).to.be.equal('2.316454155296268275348971413356926723678');
  });
  it('7', () => {
    expect(BigMath.stringify(BigMath.cbrt(0))).to.be.equal('0');
  });
  it('8', () => {
    expect(BigMath.stringify(BigMath.cbrt(12.432))).to.be.equal('2.3165783885988392273263844008848173415038');
  });
});

describe('versin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.versin(0.32))).to.be.equal('0.0507645819175591324246927262339082588441');
  });
});

describe('vercosin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.vercosin(0.32))).to.be.equal('1.9492354180824408675753072737660917411559');
  });
});

describe('coversin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.coversin(0.32))).to.be.equal('0.6854334393838822333382424565828521656957');
  });
});

describe('covercosin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.covercosin(0.32))).to.be.equal('1.3145665606161177666617575434171478343043');
  });
});

describe('haversin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.haversin(0.32))).to.be.equal('0.0253822909587795662123463631169541294221');
  });
});

describe('havercosin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.havercosin(0.32))).to.be.equal('0.974617709041220433787653636883045870578');
  });
});

describe('hacoversin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.hacoversin(0.32))).to.be.equal('0.3427167196919411166691212282914260828479');
  });
});

describe('hacovercosin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.hacovercosin(0.32))).to.be.equal('0.6572832803080588833308787717085739171522');
  });
});

describe('gd', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.gd(0.32))).to.be.equal('0.3146744480632316005316148337487307028298');
  });
});

describe('erf', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.erf(0.5))).to.be.equal('0.5204998778130465376827466538919645287365');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.erf(10))).to.be.equal('1');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.erf(-9.6))).to.be.equal('-1');
  });
});

describe('constants', () => {
  it('LOG10', () => {
    expect(BigMath.stringify(BigMath.LOG10)).to.be.equal('2.302585092994045684017991454684364207601101488628772976033');
  });
  it('LOG2', () => {
    expect(BigMath.stringify(BigMath.LOG2)).to.be.equal('0.693147180559945309417232121458176568075500134360255254120');
  });
  it('PI2', () => {
    expect(BigMath.stringify(BigMath.PI2)).to.be.equal('1.570796326794896619231321691639751442098584699687552910487');
  });
  it('PI', () => {
    expect(BigMath.stringify(BigMath.PI)).to.be.equal('3.141592653589793238462643383279502884197169399375105820974');
  });
  it('E', () => {
    expect(BigMath.stringify(BigMath.E)).to.be.equal('2.718281828459045235360287471352662497757247093699959574966');
  });
  it('SQRT2', () => {
    expect(BigMath.stringify(BigMath.SQRT2)).to.be.equal('1.414213562373095048801688724209698078569671875376948073176');
  });
  it('LOG10E', () => {
    expect(BigMath.stringify(BigMath.LOG10E)).to.be.equal('0.434294481903251827651128918916605082294397005803666566114');
  });
  it('LOG2E', () => {
    expect(BigMath.stringify(BigMath.LOG2E)).to.be.equal('1.442695040888963407359924681001892137426645954152985934135');
  });
  it('SQRT1_2', () => {
    expect(BigMath.stringify(BigMath.SQRT1_2)).to.be.equal('0.707106781186547524400844362104849039284835937688474036588');
  });
});

describe('shrink', () => {
  it('1', () => {
    expect(
      BigMath.finalize({
        comma: -5,
        number: 10000n,
        sign: false
      })
    ).to.be.deep.equal({
      comma: -1,
      number: 1n,
      sign: false
    });
  });
  it('2', () => {
    expect(
      BigMath.finalize({
        comma: -5,
        number: -10000n,
        sign: false
      })
    ).to.be.deep.equal({
      comma: -1,
      number: 1n,
      sign: true
    });
  });
});
