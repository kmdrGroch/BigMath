import { DomainError } from '../index';
import { BigMath } from '../index';
import './pluginTest';
import './pluginTest2';

import { expect } from 'chai';

describe('constructor', () => {
  it('empty constructor should return BigMath(0)', () => {
    expect(new BigMath().toString()).to.be.equal('0');
  });
});

describe('add', () => {
  it('1', () => {
    expect(BigMath.add(12.54354, 6.423525).toString()).to.be.equal('18.967065');
  });
  it('2', () => {
    expect(new BigMath(-12.54354).add('-6.423525').toString()).to.be.equal('-18.967065');
  });
  it('3', () => {
    expect(BigMath.add(12.54354, 6.623525).toString()).to.be.equal('19.167065');
  });
  it('4', () => {
    expect(BigMath.add(0.54354, 0.423525).toString()).to.be.equal('0.967065');
  });
  it('5', () => {
    expect(BigMath.add(0.54354, 0.0423505).toString()).to.be.equal('0.5858905');
  });
  it('6', () => {
    expect(BigMath.add(92.54354, 8.423525).toString()).to.be.equal('100.967065');
  });
  it('7', () => {
    expect(BigMath.add(BigInt(-5), '3').toString()).to.be.equal('-2');
  });
});

describe('subtract', () => {
  it('1', () => {
    expect(BigMath.minus(12.54354, 6.423525).toString()).to.be.equal('6.120015');
  });
  it('2', () => {
    expect(BigMath.sub(-12.54354, -6.423525).toString()).to.be.equal('-6.120015');
  });
  it('3', () => {
    expect(new BigMath(0.54354).minus(0.423525).toString()).to.be.equal('0.120015');
  });
  it('4', () => {
    expect(new BigMath(0.44354).sub(0.423525).toString()).to.be.equal('0.020015');
  });
  it('5', () => {
    expect(BigMath.minus(0.54354, 0.0423505).toString()).to.be.equal('0.5011895');
  });
  it('6', () => {
    expect(BigMath.minus(100.54354, 8.423525).toString()).to.be.equal('92.120015');
  });
  it('6', () => {
    expect(BigMath.minus(8.423525, 100.54354).toString()).to.be.equal('-92.120015');
  });
  it('7', () => {
    expect(BigMath.minus(-4.34, 1.34).toString()).to.be.equal('-5.68');
  });
  it('8', () => {
    expect(BigMath.minus(4.34, -1.34).toString()).to.be.equal('5.68');
  });
});

describe('multiply', () => {
  it('1', () => {
    expect(new BigMath(8.423525).mul(100.54354).toString()).to.be.equal('846.9310227785');
  });
  it('2', () => {
    expect(BigMath.mul(8.423525, 100).toString()).to.be.equal('842.3525');
  });
});

describe('divide', () => {
  it('1', () => {
    expect(BigMath.dividedBy(8.423525, 100.54354).toString()).to.be.equal('0.0837798728789537348694903720318580388158');
  });
  it('2', () => {
    expect(BigMath.div(8.423525, 100).toString()).to.be.equal('0.08423525');
  });
  it('3', () => {
    expect(new BigMath(1).dividedBy(2).toString()).to.be.equal('0.5');
  });
  it('4', () => {
    expect(new BigMath(2).div(1.5).toString()).to.be.equal('1.3333333333333333333333333333333333333333');
  });
  it('5', () => {
    expect(BigMath.dividedBy(2, '1.41666666666666666665').toString()).to.be.equal('1.4117647058823529411930795847750865051905');
  });
  it('6', () => {
    expect(() => BigMath.dividedBy(2, BigMath.sum(10, -10)).toString()).to.throw(
      DomainError,
      'Number out of domain. Given: 0. Expected: numbers other than 0'
    );
  });
  it('7', () => {
    expect(BigMath.dividedBy(1, 0.0625).toString()).to.be.equal('16');
  });
  it('8', () => {
    expect(BigMath.dividedBy(1432.543, '0.0000000000000000000000000000000000000000000000625').toString()).to.be.equal(
      '22920688000000000000000000000000000000000000000000'
    );
  });
  it('9', () => {
    expect(BigMath.dividedBy(-3, '2.0').toString()).to.be.equal('-1.5');
  });
});

describe('ln', () => {
  it('1', () => {
    expect(BigMath.ln(8).toString()).to.be.equal('2.0794415416798359282516963643745297042265');
  });
  it('2', () => {
    expect(() => BigMath.ln(0).toString()).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
    expect(() => BigMath.ln(-123.423).toString()).to.throw(DomainError, 'Number out of domain. Given: -123.423. Expected: numbers greater than 0');
  });
  it('3', () => {
    expect(new BigMath(0.04).ln().toString()).to.be.equal('-3.2188758248682007492015186664523752790512');
  });
  it('4', () => {
    expect(BigMath.ln(0.1).toString()).to.be.equal('-2.3025850929940456840179914546843642076011');
  });
  it('5', () => {
    expect(BigMath.ln(0.5).toString()).to.be.equal('-0.6931471805599453094172321214581765680755');
  });
  it('6', () => {
    expect(BigMath.ln(0.2).toString()).to.be.equal('-1.6094379124341003746007593332261876395256');
  });
});

describe('log2', () => {
  it('1', () => {
    expect(new BigMath(8).log2().toString()).to.be.equal('3');
  });
  it('2', () => {
    expect(() => BigMath.log2(0).toString()).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
    expect(() => BigMath.log2(-123.423).toString()).to.throw(DomainError, 'Number out of domain. Given: -123.423. Expected: numbers greater than 0');
  });
  it('3', () => {
    expect(BigMath.log2(0.04).toString()).to.be.equal('-4.6438561897747246957406388589787803517297');
  });
});

describe('log10', () => {
  it('1', () => {
    expect(new BigMath(8).log().toString()).to.be.equal('0.9030899869919435856412166841734790803046');
  });
  it('2', () => {
    expect(() => BigMath.log10(0).toString()).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
    expect(() => BigMath.log(-123.423).toString()).to.throw(DomainError, 'Number out of domain. Given: -123.423. Expected: numbers greater than 0');
  });
  it('3', () => {
    expect(new BigMath(0.04).log10().toString()).to.be.equal('-1.3979400086720376095725222105510139464636');
  });
});

describe('log1p', () => {
  it('1', () => {
    expect(BigMath.ln1p(8).toString()).to.be.equal('2.197224577336219382790490473845051409295');
  });
  it('2', () => {
    expect(() => BigMath.ln1p(-1).toString()).to.throw(DomainError, 'Number out of domain. Given: -1. Expected: numbers greater than -1');
    expect(() => BigMath.ln1p(-123.423).toString()).to.throw(DomainError, 'Number out of domain. Given: -123.423. Expected: numbers greater than -1');
  });
  it('3', () => {
    expect(new BigMath(0.04).ln1p().toString()).to.be.equal('0.0392207131532812962692008965711198938296');
  });
});

describe('exp', () => {
  it('1', () => {
    expect(BigMath.exp(0.43242).toString()).to.be.equal('1.54098219178607389338293231610903660192');
  });
  it('2', () => {
    expect(new BigMath(0).exp().toString()).to.be.equal('1');
  });
});

describe('expm1', () => {
  it('1', () => {
    expect(BigMath.expm1(0.43242).toString()).to.be.equal('0.54098219178607389338293231610903660192');
  });
  it('1', () => {
    expect(new BigMath(0.43242).expm1().toString()).to.be.equal('0.54098219178607389338293231610903660192');
  });
});

describe('factorial', () => {
  it('1', () => {
    expect(BigMath.factorial(43).toString()).to.be.equal('60415263063373835637355132068513997507264512000000000');
  });
  it('2', () => {
    expect(BigMath.factorial(84).toString()).to.be.equal(
      '3314240134565353266999387579130131288000666286242049487118846032383059131291716864129885722968716753156177920000000000000000000'
    );
  });
  it('3', () => {
    expect(BigMath.factorial(0).toString()).to.be.equal('1');
  });
  it('4', () => {
    expect(() => BigMath.factorial(1.2).toString()).to.throw(DomainError, 'Number out of domain. Given: 1.2. Expected: positive integers');
  });
  it('5', () => {
    expect(() => BigMath.factorial(-12).toString()).to.throw(DomainError, 'Number out of domain. Given: -12. Expected: positive integers');
  });
});

describe('binomial', () => {
  it('1', () => {
    expect(new BigMath(15).binomial(6).toString()).to.be.equal('1816214400');
  });
  it('2', () => {
    expect(BigMath.binomial(15, 6).toString()).to.be.equal('1816214400');
  });
  it('3', () => {
    expect(() => BigMath.binomial(5, 20).toString()).to.throw(
      DomainError,
      'Number out of domain. Given: binomial(5, 20). Expected: first parameter bigger than second'
    );
  });
});

describe('double factorial', () => {
  it('1', () => {
    expect(BigMath.doubleFactorial(0).toString()).to.be.equal('1');
  });
  it('2', () => {
    expect(BigMath.doubleFactorial(1).toString()).to.be.equal('1');
  });
  it('3', () => {
    expect(BigMath.doubleFactorial(2).toString()).to.be.equal('2');
  });
  it('4', () => {
    expect(BigMath.doubleFactorial(33).toString()).to.be.equal('6332659870762850625');
  });
  it('5', () => {
    expect(BigMath.doubleFactorial(56).toString()).to.be.equal('81842841814930553085241614925824000000');
  });
  it('6', () => {
    expect(() => BigMath.doubleFactorial(1.2).toString()).to.throw(DomainError, 'Number out of domain. Given: 1.2. Expected: positive integers');
  });
  it('7', () => {
    expect(() => BigMath.doubleFactorial(-12).toString()).to.throw(DomainError, 'Number out of domain. Given: -12. Expected: positive integers');
  });
});

describe('superFactorial', () => {
  it('1', () => {
    expect(BigMath.superFactorial(0).toString()).to.be.equal('1');
  });
  it('2', () => {
    expect(BigMath.superFactorial(1).toString()).to.be.equal('1');
  });
  it('3', () => {
    expect(BigMath.superFactorial(2).toString()).to.be.equal('2');
  });
  it('4', () => {
    expect(BigMath.superFactorial(5).toString()).to.be.equal('34560');
  });
  it('5', () => {
    expect(BigMath.superFactorial(8).toString()).to.be.equal('5056584744960000');
  });
  it('6', () => {
    expect(() => BigMath.superFactorial(1.2).toString()).to.throw(DomainError, 'Number out of domain. Given: 1.2. Expected: positive integers');
  });
  it('7', () => {
    expect(() => BigMath.superFactorial(-12).toString()).to.throw(DomainError, 'Number out of domain. Given: -12. Expected: positive integers');
  });
});

describe('power', () => {
  it('1', () => {
    expect(BigMath.pow(2, 3).toString()).to.be.equal('8');
  });
  it('2', () => {
    expect(() => BigMath.toPower(0, 0).toString()).to.throw(
      DomainError,
      "Number out of domain. Given: 0 ^ 0. Expected: real numbers | both can't be 0 at the same time"
    );
  });
  it('3', () => {
    expect(new BigMath(1.74).pow(3.14).toString()).to.be.equal('5.6927831324956102895214059211589568617058');
  });
  it('4', () => {
    expect(BigMath.toPower(10, -3).toString()).to.be.equal('0.001');
  });
  it('5', () => {
    expect(BigMath.toPower(-2, 3).toString()).to.be.equal('-8');
  });
  it('6', () => {
    expect(() => BigMath.toPower(-2, 0.5).toString()).to.throw(
      DomainError,
      'Number out of domain. Given: -2 ^ 0.5. Expected: real numbers | not negative ^ non-integer'
    );
  });
  it('7', () => {
    expect(BigMath.toPower(-32, 0.2).toString()).to.be.equal('-2');
  });
});

describe('sqrt', () => {
  it('1', () => {
    expect(new BigMath(2).sqrt().toString()).to.be.equal('1.4142135623730950488016887242096980785697');
  });
  it('2', () => {
    expect(BigMath.sqrt(0).toString()).to.be.equal('0');
  });
  it('3', () => {
    expect(() => BigMath.sqrt(-54.23).toString()).to.throw(DomainError, 'Number out of domain. Given: -54.23. Expected: numbers greater or equal 0');
  });
  it('4', () => {
    expect(BigMath.sqrt(4).toString()).to.be.equal('2');
  });
  it('5', () => {
    expect(BigMath.sqrt(2.25).toString()).to.be.equal('1.5');
  });
  it('6', () => {
    expect(BigMath.sqrt(0.1).toString()).to.be.equal('0.316227766016837933199889354443271853372');
  });
  it('7', () => {
    expect(BigMath.sqrt(0.14).toString()).to.be.equal('0.3741657386773941385583748732316549301756');
  });
});

describe('sin', () => {
  it('1', () => {
    expect(BigMath.sin(1.523).toString()).to.be.equal('0.9988579730096214209808858136421039801421');
  });
  it('2', () => {
    expect(new BigMath(1.523).sin().toString()).to.be.equal('0.9988579730096214209808858136421039801421');
  });
});

describe('cos', () => {
  it('1', () => {
    expect(BigMath.cos(0.43223).toString()).to.be.equal('0.9080338684590022306625164663612605645159');
  });
  it('2', () => {
    expect(new BigMath(0.43223).cos().toString()).to.be.equal('0.9080338684590022306625164663612605645159');
  });
});

describe('tan', () => {
  it('1', () => {
    expect(BigMath.tan(0.1243).toString()).to.be.equal('0.1249441465473435240536545319296487936837');
  });
  it('2', () => {
    expect(() => new BigMath(BigMath.PI2).tan().toString()).to.throw(
      DomainError,
      'Number out of domain. Given: 1.570796326794896619231321691639751442098584699687552910487. Expected: real numbers & x != PI/2 + k*PI (k - integer)'
    );
  });
});

describe('cot', () => {
  it('1', () => {
    expect(BigMath.cot(0.1243).toString()).to.be.equal('8.0035762189234090831469419187285491872871');
  });
  it('2', () => {
    expect(() => new BigMath(BigMath.PI).cot().toString()).to.throw(
      DomainError,
      'Number out of domain. Given: 3.141592653589793238462643383279502884197169399375105820974. Expected: real numbers & x != k*PI (k - integer)'
    );
  });
});

describe('sec', () => {
  it('1', () => {
    expect(BigMath.sec(0.1243).toString()).to.be.equal('1.0077752922931004536756918747321979887282');
  });
  it('2', () => {
    expect(() => new BigMath(BigMath.PI2).sec().toString()).to.throw(
      DomainError,
      'Number out of domain. Given: 1.570796326794896619231321691639751442098584699687552910487. Expected: real numbers & x != PI/2 + k*PI (k - integer)'
    );
  });
});

describe('csc', () => {
  it('1', () => {
    expect(BigMath.csc(0.1243).toString()).to.be.equal('8.0658063634156463351982914655547822238875');
  });
  it('2', () => {
    expect(() => new BigMath(BigMath.PI).csc().toString()).to.throw(
      DomainError,
      'Number out of domain. Given: 3.141592653589793238462643383279502884197169399375105820974. Expected: real numbers & x != k*PI (k - integer)'
    );
  });
});

describe('asin', () => {
  it('1', () => {
    expect(BigMath.asin(0.533).toString()).to.be.equal('0.5621422382693426071105136373677509128263');
  });
  it('2', () => {
    expect(new BigMath(1).asin().toString()).to.be.equal('1.570796326794896619231321691639751442098584699687552910487');
  });
  it('3', () => {
    expect(() => BigMath.asin(1.0001).toString()).to.throw(DomainError, 'Number out of domain. Given: 1.0001. Expected: numbers from range [-1, 1]');
  });
});

describe('acos', () => {
  it('1', () => {
    expect(BigMath.acos(0.43223).toString()).to.be.equal('1.123832078732756669980357528914145635922884699687552910487');
  });
  it('2', () => {
    expect(new BigMath(-1).acos().toString()).to.be.equal('0');
  });
  it('3', () => {
    expect(BigMath.acos(1).toString()).to.be.equal('0');
  });
  it('4', () => {
    expect(() => BigMath.acos(1.0001).toString()).to.throw(DomainError, 'Number out of domain. Given: 1.0001. Expected: numbers from range [-1, 1]');
  });
});

describe('atan', () => {
  it('1', () => {
    expect(BigMath.atan(0.1243).toString()).to.be.equal('0.1236657045016981218895919161905927032479');
  });
  it('2', () => {
    expect(new BigMath(0).atan().toString()).to.be.equal('0');
  });
});

describe('atan2', () => {
  it('1', () => {
    expect(BigMath.atan2(0.1243, 0).toString()).to.be.equal('0');
  });
  it('2', () => {
    expect(new BigMath(0.1243).atan2(2.321).toString()).to.be.equal('1.5172929361151392140456886741612160763981');
  });
  it('3', () => {
    expect(BigMath.atan2(-0.1243, 0).toString()).to.be.equal('3.141592653589793238462643383279502884197169399375105820974');
  });
  it('4', () => {
    expect(BigMath.atan2(-0.1243, 1.432).toString()).to.be.equal('1.6573809797262939651452603596017768413177');
  });
  it('5', () => {
    expect(BigMath.atan2(-0.1243, -0.32).toString()).to.be.equal('-1.9412954646797114524920248307038758929791');
  });
  it('6', () => {
    expect(BigMath.atan2(0, -0.32).toString()).to.be.equal('-1.570796326794896619231321691639751442098584699687552910487');
  });
  it('7', () => {
    expect(() => BigMath.atan2(0, 0).toString()).to.throw(
      DomainError,
      "Number out of domain. Given: atan(0, 0). Expected: Real numbers | Both can't be 0"
    );
  });
});

describe('acot', () => {
  it('1', () => {
    expect(BigMath.acot(0.1243).toString()).to.be.equal('1.4471306222931984973417297754491587388507');
  });
  it('1', () => {
    expect(new BigMath(0.1243).acot().toString()).to.be.equal('1.4471306222931984973417297754491587388507');
  });
});

describe('asec', () => {
  it('1', () => {
    expect(BigMath.asec(1.43223).toString()).to.be.equal('0.7978996373977028411316596365555153767914');
    expect(new BigMath(1).asec().toString()).to.be.equal('0');
  });
  it('2', () => {
    expect(() => BigMath.asec(0.4535).toString()).to.throw(
      DomainError,
      'Number out of domain. Given: 0.4535. Expected: numbers not from range (-1, 1)'
    );
  });
});

describe('acsc', () => {
  it('1', () => {
    expect(BigMath.acsc(1.523).toString()).to.be.equal('0.7163004434722002469910898336541666012824');
    expect(new BigMath(1).acsc().toString()).to.be.equal('1.570796326794896619231321691639751442098584699687552910487');
  });
  it('2', () => {
    expect(() => BigMath.acsc(0.543).toString()).to.throw(
      DomainError,
      'Number out of domain. Given: 0.543. Expected: numbers not from range (-1, 1)'
    );
  });
});

describe('sinh', () => {
  it('1', () => {
    expect(BigMath.sinh(1.523).toString()).to.be.equal('2.1839528659100170527374504125151073756728');
  });
  it('2', () => {
    expect(new BigMath(1.523).sinh().toString()).to.be.equal('2.1839528659100170527374504125151073756728');
  });
});

describe('cosh', () => {
  it('1', () => {
    expect(BigMath.cosh(1.523).toString()).to.be.equal('2.4020096004214006731488863223856853655303');
  });
  it('2', () => {
    expect(new BigMath(1.523).cosh().toString()).to.be.equal('2.4020096004214006731488863223856853655303');
  });
});

describe('tanh', () => {
  it('1', () => {
    expect(BigMath.tanh(1.523).toString()).to.be.equal('0.9092190412256768402279346293501126617064');
  });
  it('2', () => {
    expect(new BigMath(1.523).tanh().toString()).to.be.equal('0.9092190412256768402279346293501126617064');
  });
});

describe('coth', () => {
  it('1', () => {
    expect(BigMath.coth(1.523).toString()).to.be.equal('1.0998449819660018093806759222035306381996');
  });
  it('2', () => {
    expect(() => new BigMath(0).coth().toString()).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: real numbers without 0');
  });
});

describe('sech', () => {
  it('1', () => {
    expect(BigMath.sech(1.523).toString()).to.be.equal('0.4163180695966257941799803737164278454316');
  });
  it('2', () => {
    expect(new BigMath(1.523).sech().toString()).to.be.equal('0.4163180695966257941799803737164278454316');
  });
});

describe('csch', () => {
  it('1', () => {
    expect(BigMath.csch(1.523).toString()).to.be.equal('0.4578853397476215827722011072581293703287');
  });
  it('2', () => {
    expect(() => new BigMath(0).csch().toString()).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: real numbers without 0');
  });
});

describe('asinh', () => {
  it('1', () => {
    expect(BigMath.asinh(1.523).toString()).to.be.equal('1.2074539771550620727031144922676934208108');
  });
  it('2', () => {
    expect(new BigMath(1.523).asinh().toString()).to.be.equal('1.2074539771550620727031144922676934208108');
  });
});

describe('acosh', () => {
  it('1', () => {
    expect(BigMath.acosh(1).toString()).to.be.equal('0');
  });
  it('2', () => {
    expect(new BigMath(3.132).acosh().toString()).to.be.equal('1.8082998177870715751270911181779556033365');
  });
  it('3', () => {
    expect(() => BigMath.acosh(0.99).toString()).to.throw(DomainError, 'Number out of domain. Given: 0.99. Expected: numbers greater or equal 1');
  });
  it('4', () => {
    expect(() => BigMath.acosh(-3).toString()).to.throw(DomainError, 'Number out of domain. Given: -3. Expected: numbers greater or equal 1');
  });
});

describe('atanh', () => {
  it('1', () => {
    expect(BigMath.atanh(-0.12).toString()).to.be.equal('-0.1205810284084440352303206434681134989455');
  });
  it('2', () => {
    expect(new BigMath(0.423).atanh().toString()).to.be.equal('0.4513401657908764038337940150785025308506');
  });
  it('3', () => {
    expect(() => BigMath.atanh(1).toString()).to.throw(DomainError, 'Number out of domain. Given: 1. Expected: numbers from range (-1, 1)');
  });
  it('4', () => {
    expect(() => BigMath.atanh(-1).toString()).to.throw(DomainError, 'Number out of domain. Given: -1. Expected: numbers from range (-1, 1)');
  });
  it('5', () => {
    expect(() => BigMath.atanh(-1.523).toString()).to.throw(DomainError, 'Number out of domain. Given: -1.523. Expected: numbers from range (-1, 1)');
  });
  it('6', () => {
    expect(() => BigMath.atanh(1.523).toString()).to.throw(DomainError, 'Number out of domain. Given: 1.523. Expected: numbers from range (-1, 1)');
  });
});

describe('acoth', () => {
  it('1', () => {
    expect(BigMath.acoth(-1.12).toString()).to.be.equal('-1.4358398124420060713746119510532660328563');
  });
  it('2', () => {
    expect(new BigMath(1.423).acoth().toString()).to.be.equal('0.8726947708851238811979800914428512190856');
  });
  it('3', () => {
    expect(() => BigMath.acoth(0.543).toString()).to.throw(
      DomainError,
      'Number out of domain. Given: 0.543. Expected: numbers not from range [-1, 1]'
    );
  });
  it('4', () => {
    expect(() => BigMath.acoth(0).toString()).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers not from range [-1, 1]');
  });
  it('5', () => {
    expect(() => BigMath.acoth(-1).toString()).to.throw(DomainError, 'Number out of domain. Given: -1. Expected: numbers not from range [-1, 1]');
  });
  it('6', () => {
    expect(() => BigMath.acoth(1).toString()).to.throw(DomainError, 'Number out of domain. Given: 1. Expected: numbers not from range [-1, 1]');
  });
});

describe('asech', () => {
  it('1', () => {
    expect(BigMath.asech(1).toString()).to.be.equal('0');
  });
  it('2', () => {
    expect(new BigMath(0.543).asech().toString()).to.be.equal('1.2202662459660493460899849844983009086218');
  });
  it('3', () => {
    expect(() => BigMath.asech(-0.543).toString()).to.throw(DomainError, 'Number out of domain. Given: -0.543. Expected: numbers from range (0,1]');
  });
  it('4', () => {
    expect(() => BigMath.asech(0).toString()).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers from range (0,1]');
  });
  it('5', () => {
    expect(() => BigMath.asech(-1).toString()).to.throw(DomainError, 'Number out of domain. Given: -1. Expected: numbers from range (0,1]');
  });
  it('6', () => {
    expect(() => BigMath.asech(1.342).toString()).to.throw(DomainError, 'Number out of domain. Given: 1.342. Expected: numbers from range (0,1]');
  });
});

describe('acsch', () => {
  it('1', () => {
    expect(BigMath.acsch(-1.12).toString()).to.be.equal('-0.8035482548454507913075123597096101445943');
  });
  it('2', () => {
    expect(new BigMath(1.423).acsch().toString()).to.be.equal('0.6549103802485914704571440347832521726492');
  });
});

describe('AGM', () => {
  it('1', () => {
    expect(BigMath.AGM(12, 6).toString()).to.be.equal('8.7407461862814412151185942995904918498432');
  });
  it('2', () => {
    expect(() => new BigMath(-12).AGM(6).toString()).to.throw(
      DomainError,
      'Number out of domain. Given: AGM(-12, 6). Expected: arguments have to be positive'
    );
  });
  it('3', () => {
    expect(() => BigMath.arithmeticGeometricMean(12, -6).toString()).to.throw(
      DomainError,
      'Number out of domain. Given: AGM(12, -6). Expected: arguments have to be positive'
    );
  });
});

describe('K', () => {
  it('1', () => {
    expect(new BigMath(0.32).K().toString()).to.be.equal('1.6135037415649716545922387873211206083943');
  });
  it('2', () => {
    expect(() => BigMath.KFunction(1.32).toString()).to.throw(DomainError, 'Number out of domain. Given: 1.32. Expected: number from range [-1, 1]');
    expect(() => BigMath.K(-1.32).toString()).to.throw(DomainError, 'Number out of domain. Given: -1.32. Expected: number from range [-1, 1]');
    expect(() => BigMath.K(1).toString()).to.throw(DomainError, 'Number out of domain. Given: 1. Expected: number from range [-1, 1]');
    expect(() => BigMath.K(-1).toString()).to.throw(DomainError, 'Number out of domain. Given: -1. Expected: number from range [-1, 1]');
  });
});

describe('Comparison', () => {
  it('1', () => {
    expect(BigMath.gte(12, 5)).to.be.true;
    expect(new BigMath(12).gte(5)).to.be.true;
  });
  it('2', () => {
    expect(BigMath.lte(12, 5)).to.be.false;
    expect(new BigMath(12).lte(5)).to.be.false;
  });
  it('3', () => {
    expect(BigMath.gte(5, 5)).to.be.true;
    expect(new BigMath(5).gte(5)).to.be.true;
    expect(BigMath.greaterThanOrEqualTo(5, 5)).to.be.true;
  });
  it('4', () => {
    expect(BigMath.lte(5, 5)).to.be.true;
    expect(new BigMath(5).lte(5)).to.be.true;
    expect(BigMath.lessThanOrEqualTo(5, 5)).to.be.true;
  });
  it('5', () => {
    expect(BigMath.gt(5, 5)).to.be.false;
    expect(BigMath.greaterThan(12, 5)).to.be.true;
    expect(new BigMath(12).gt(5)).to.be.true;
  });
  it('6', () => {
    expect(new BigMath(5).lessThan(5)).to.be.false;
    expect(BigMath.lt(2, 5)).to.be.true;
    expect(BigMath.lessThan(2, 5)).to.be.true;
    expect(new BigMath(2).lt(5)).to.be.true;
    expect(new BigMath(-2).lt(-5)).to.be.false;
  });
  it('7', () => {
    expect(BigMath.eq(5, 5)).to.be.true;
    expect(BigMath.eq(2, 5)).to.be.false;
    expect(BigMath.eq(-2, 2)).to.be.false;
    expect(BigMath.equals(0.2, 2)).to.be.false;
    expect(new BigMath(0.2).eq(2)).to.be.false;
  });
  it('8', () => {
    expect(BigMath.neq(5, 5)).to.be.false;
    expect(BigMath.neq(2, 5)).to.be.true;
    expect(BigMath.neq(0.2, 2)).to.be.true;
    expect(BigMath.notEquals(-2, 2)).to.be.true;
    expect(new BigMath(0.2).neq(2)).to.be.true;
  });
});

describe('Rounding', () => {
  it('1', () => {
    expect(BigMath.round(0.78).toString()).to.be.equal('1');
  });
  it('2', () => {
    expect(BigMath.round(43242).toString()).to.be.equal('43242');
  });
  it('3', () => {
    expect(BigMath.round(0.356).toString()).to.be.equal('0');
  });
  it('4', () => {
    expect(BigMath.round(0.56).toString()).to.be.equal('1');
  });
  it('5', () => {
    expect(BigMath.round(-1.2).toString()).to.be.equal('-1');
  });
  it('6', () => {
    expect(BigMath.round(-1.5).toString()).to.be.equal('-1');
  });
  it('7', () => {
    expect(BigMath.round(-1.7).toString()).to.be.equal('-2');
  });
  it('8', () => {
    expect(BigMath.floor(43242).toString()).to.be.equal('43242');
  });
  it('9', () => {
    expect(BigMath.floor(12.32).toString()).to.be.equal('12');
  });
  it('10', () => {
    expect(BigMath.floor(-12.32).toString()).to.be.equal('-13');
  });
  it('11', () => {
    expect(BigMath.floor(-12).toString()).to.be.equal('-12');
  });
  it('12', () => {
    expect(BigMath.ceil(43242).toString()).to.be.equal('43242');
  });
  it('13', () => {
    expect(BigMath.ceil(12.32).toString()).to.be.equal('13');
  });
  it('14', () => {
    expect(BigMath.ceil(-12.32).toString()).to.be.equal('-12');
  });
  it('15', () => {
    expect(BigMath.ceil(-12).toString()).to.be.equal('-12');
  });
});

describe('abs', () => {
  it('1', () => {
    expect(BigMath.abs(-12.32).toString()).to.be.equal('12.32');
  });
  it('2', () => {
    expect(BigMath.absoluteValue(12.32).toString()).to.be.equal('12.32');
  });
  it('3', () => {
    expect(new BigMath(12.32).abs().toString()).to.be.equal('12.32');
  });
});

describe('negate', () => {
  it('1', () => {
    expect(BigMath.negate(-12.32).toString()).to.be.equal('12.32');
  });
  it('2', () => {
    expect(BigMath.neg(12.32).toString()).to.be.equal('-12.32');
  });
  it('3', () => {
    expect(new BigMath(12.32).neg().toString()).to.be.equal('-12.32');
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

describe('isNegative', () => {
  it('1', () => {
    expect(BigMath.isNegative(-12)).to.be.equal(true);
  });
  it('2', () => {
    expect(BigMath.isNeg(12)).to.be.equal(false);
  });
  it('2', () => {
    expect(new BigMath(-12.32).isNegative()).to.be.equal(true);
  });
  it('3', () => {
    expect(new BigMath(12.32).isNeg()).to.be.equal(false);
  });
});

describe('isPositive', () => {
  it('1', () => {
    expect(BigMath.isPositive(-12)).to.be.equal(false);
  });
  it('2', () => {
    expect(BigMath.isPos(12)).to.be.equal(true);
  });
  it('2', () => {
    expect(new BigMath(-12.32).isPositive()).to.be.equal(false);
  });
  it('3', () => {
    expect(new BigMath(12.32).isPos()).to.be.equal(true);
  });
});

describe('isPositive', () => {
  it('1', () => {
    expect(BigMath.isZero(-12)).to.be.equal(false);
  });
  it('2', () => {
    expect(new BigMath(0).isZero()).to.be.equal(true);
  });
});

describe('toNumber', () => {
  it('1', () => {
    expect(BigMath.toNumber('-12.3')).to.be.equal(-12.3);
  });
  it('2', () => {
    expect(new BigMath('-12.3').toNumber()).to.be.equal(-12.3);
  });
});

describe('toPrecision', () => {
  it('1', () => {
    expect(BigMath.toPrecision(BigMath.div(12, 7), 0)).to.be.equal('2');
  });
});

describe('toBigNumber', () => {
  it('1', () => {
    expect(BigMath.toBigNumber(234.31)).to.be.deep.equal({
      comma: -2,
      number: 23431n,
      sign: false
    });
  });
});

describe('clone', () => {
  it('1', () => {
    const big = new BigMath(12);
    expect(big.clone().toBigNumber()).to.be.deep.equal({
      comma: 0,
      number: 12n,
      sign: false
    });
    expect(big.clone()).not.to.equal(big);
  });
});

describe('toBigNumber', () => {
  it('1', () => {
    expect(BigMath.toBigNumber(234.31)).to.be.deep.equal({
      comma: -2,
      number: 23431n,
      sign: false
    });
  });
});

describe('configure', () => {
  before(() => {
    BigMath.configure({ precision: 0 });
  });
  after(() => {
    BigMath.configure({ precision: 40 });
  });
  it('1', () => {
    expect(BigMath.div(5, 2).toString()).to.be.equal('3');
  });
});

describe('gamma', () => {
  it('1', () => {
    expect(BigMath.gamma(1.24).toString()).to.be.equal('0.9085210583399594331164916106437218477643');
  });
  it('2', () => {
    expect(BigMath.gamma(0.24).toString()).to.be.equal('3.7855044097498308309758273555809824555702');
  });
  it('3', () => {
    expect(() => BigMath.gamma(-2).toString()).to.throw(DomainError, 'Number out of domain. Given: -2. Expected: not negative multiplications of 2');
  });
  it('4', () => {
    expect(BigMath.gamma(7).toString()).to.be.equal('720');
  });
});

describe('stringify', () => {
  it('1', () => {
    expect(BigMath.toString(234.24234)).to.be.equal('234.24234');
  });
  it('2', () => {
    expect(BigMath.toString('-423.34234')).to.be.equal('-423.34234');
  });
  it('3', () => {
    expect(BigMath.toString(43254235n)).to.be.equal('43254235');
  });
  it('3', () => {
    expect(BigMath.toString(new BigMath(20.65))).to.be.equal('20.65');
  });
});

describe('bit operations', () => {
  it('1', () => {
    expect(BigMath.bitLeft(4325, 3).toString()).to.be.equal('34600');
  });
  it('2', () => {
    expect(BigMath.bitRight(4325, new BigMath(3)).toString()).to.be.equal('540');
  });
  it('3', () => {
    expect(BigMath.bitOR(4325, 5433n).toString()).to.be.equal('5629');
  });
  it('4', () => {
    expect(BigMath.bitXOR(4325, '3243').toString()).to.be.equal('7246');
  });
  it('5', () => {
    expect(BigMath.bitNOT(4325).toString()).to.be.equal('-4326');
  });
  it('6', () => {
    expect(BigMath.bitAND(4325, 1235).toString()).to.be.equal('193');
  });
});

describe('W', () => {
  it('1', () => {
    expect(BigMath.W(0).toString()).to.be.equal('0');
  });
  it('2', () => {
    expect(BigMath.W(1).toString()).to.be.equal('0.56714329040978387299996866221035554975381578');
  });
  it('3', () => {
    expect(BigMath.W(0.1).toString()).to.be.equal('0.0912765271608622642998957214231795686531');
  });
  it('4', () => {
    expect(new BigMath(123).W().toString()).to.be.equal('3.5462840473366787594615668102174339592395');
  });
  it('5', () => {
    expect(BigMath.omegaFunction(5.321).toString()).to.be.equal('1.3624077308379869368091588521095263646221');
  });
  it('6', () => {
    expect(() => BigMath.W(-2).toString()).to.throw(DomainError, 'Number out of domain. Given: -2. Expected: number bigger than -log(2) / 2');
  });
});

describe('XY', () => {
  it('1', () => {
    expect(new BigMath(0.1).XY().toString()).to.be.equal('0.3990129782602520715964708106240920239962');
  });
  it('2', () => {
    expect(BigMath.tetrationXY(1.21).toString()).to.be.equal('1.2751596577217704514362596823249064058603');
  });
  it('3', () => {
    expect(BigMath.XY(1).toString()).to.be.equal('1');
  });
  it('4', () => {
    expect(() => BigMath.XY(-2).toString()).to.throw(
      DomainError,
      'Number out of domain. Given: -2. Expected: number bigger than 0 and less than sqrt(2)'
    );
  });
  it('5', () => {
    expect(() => BigMath.XY(1.5).toString()).to.throw(
      DomainError,
      'Number out of domain. Given: 1.5. Expected: number bigger than 0 and less than sqrt(2)'
    );
  });
});

describe('cbrt', () => {
  it('1', () => {
    expect(new BigMath(1000).cbrt().toString()).to.be.equal('10');
  });
  it('2', () => {
    expect(BigMath.cbrt(1.728).toString()).to.be.equal('1.2');
  });
  it('3', () => {
    expect(BigMath.cbrt(-54.233).toString()).to.be.equal('-3.7851916754719890277586141982554378185636');
  });
  it('4', () => {
    expect(BigMath.cbrt(33168.984597).toString()).to.be.equal('32.13');
  });
  it('5', () => {
    expect(BigMath.cbrt(239830.305597).toString()).to.be.equal('62.13');
  });
  it('6', () => {
    expect(BigMath.cbrt(12.43).toString()).to.be.equal('2.316454155296268275348971413356926723678');
  });
  it('7', () => {
    expect(BigMath.cbrt(0).toString()).to.be.equal('0');
  });
  it('8', () => {
    expect(BigMath.cbrt(12.432).toString()).to.be.equal('2.3165783885988392273263844008848173415038');
  });
});

describe('versin', () => {
  it('1', () => {
    expect(BigMath.versin(0.32).toString()).to.be.equal('0.0507645819175591324246927262339082588441');
  });
  it('2', () => {
    expect(new BigMath(0.32).versin().toString()).to.be.equal('0.0507645819175591324246927262339082588441');
  });
});

describe('vercosin', () => {
  it('1', () => {
    expect(BigMath.vercos(0.32).toString()).to.be.equal('1.9492354180824408675753072737660917411559');
  });
  it('2', () => {
    expect(new BigMath(0.32).vercos().toString()).to.be.equal('1.9492354180824408675753072737660917411559');
  });
});

describe('coversin', () => {
  it('1', () => {
    expect(BigMath.coversin(0.32).toString()).to.be.equal('0.6854334393838822333382424565828521656957');
  });
  it('2', () => {
    expect(new BigMath(0.32).coversin().toString()).to.be.equal('0.6854334393838822333382424565828521656957');
  });
});

describe('covercos', () => {
  it('1', () => {
    expect(BigMath.covercos(0.32).toString()).to.be.equal('1.3145665606161177666617575434171478343043');
  });
  it('2', () => {
    expect(new BigMath(0.32).covercos().toString()).to.be.equal('1.3145665606161177666617575434171478343043');
  });
});

describe('haversin', () => {
  it('1', () => {
    expect(BigMath.haversin(0.32).toString()).to.be.equal('0.0253822909587795662123463631169541294221');
  });
  it('2', () => {
    expect(new BigMath(0.32).haversin().toString()).to.be.equal('0.0253822909587795662123463631169541294221');
  });
});

describe('havercos', () => {
  it('1', () => {
    expect(BigMath.havercos(0.32).toString()).to.be.equal('0.974617709041220433787653636883045870578');
  });
  it('2', () => {
    expect(new BigMath(0.32).havercos().toString()).to.be.equal('0.974617709041220433787653636883045870578');
  });
});

describe('hacoversin', () => {
  it('1', () => {
    expect(BigMath.hacoversin(0.32).toString()).to.be.equal('0.3427167196919411166691212282914260828479');
  });
  it('2', () => {
    expect(new BigMath(0.32).hacoversin().toString()).to.be.equal('0.3427167196919411166691212282914260828479');
  });
});

describe('hacovercos', () => {
  it('1', () => {
    expect(BigMath.hacovercos(0.32).toString()).to.be.equal('0.6572832803080588833308787717085739171522');
  });
  it('2', () => {
    expect(new BigMath(0.32).hacovercos().toString()).to.be.equal('0.6572832803080588833308787717085739171522');
  });
});

describe('gd', () => {
  it('1', () => {
    expect(BigMath.gd(0.32).toString()).to.be.equal('0.3146744480632316005316148337487307028298');
  });
  it('2', () => {
    expect(new BigMath(0.32).gd().toString()).to.be.equal('0.3146744480632316005316148337487307028298');
  });
});

describe('erf', () => {
  it('1', () => {
    expect(BigMath.erf(0.5).toString()).to.be.equal('0.5204998778130465376827466538919645287365');
  });
  it('2', () => {
    expect(new BigMath(10).erf().toString()).to.be.equal('1');
  });
  it('3', () => {
    expect(BigMath.errorFunction(-9.6).toString()).to.be.equal('-1');
  });
});

describe('constants', () => {
  it('LOG10', () => {
    expect(new BigMath(BigMath.LOG10).toString()).to.be.equal('2.302585092994045684017991454684364207601101488628772976033');
  });
  it('LOG2', () => {
    expect(new BigMath(BigMath.LOG2).toString()).to.be.equal('0.69314718055994530941723212145817656807550013436025525412');
  });
  it('PI2', () => {
    expect(new BigMath(BigMath.PI2).toString()).to.be.equal('1.570796326794896619231321691639751442098584699687552910487');
  });
  it('PI', () => {
    expect(new BigMath(BigMath.PI).toString()).to.be.equal('3.141592653589793238462643383279502884197169399375105820974');
  });
  it('E', () => {
    expect(new BigMath(BigMath.E).toString()).to.be.equal('2.718281828459045235360287471352662497757247093699959574966');
  });
  it('SQRT2', () => {
    expect(new BigMath(BigMath.SQRT2).toString()).to.be.equal('1.414213562373095048801688724209698078569671875376948073176');
  });
  it('LOG10E', () => {
    expect(new BigMath(BigMath.LOG10E).toString()).to.be.equal('0.434294481903251827651128918916605082294397005803666566114');
  });
  it('LOG2E', () => {
    expect(new BigMath(BigMath.LOG2E).toString()).to.be.equal('1.442695040888963407359924681001892137426645954152985934135');
  });
  it('SQRT1_2', () => {
    expect(new BigMath(BigMath.SQRT1_2).toString()).to.be.equal('0.707106781186547524400844362104849039284835937688474036588');
  });
});

describe('shrink', () => {
  it('1', () => {
    expect(
      new BigMath({
        comma: -5,
        number: 10000n,
        sign: false
      }).toBigNumber()
    ).to.be.deep.equal({
      comma: -1,
      number: 1n,
      sign: false
    });
  });
  it('2', () => {
    expect(
      new BigMath({
        comma: -5,
        number: -10000n,
        sign: false
      }).toBigNumber()
    ).to.be.deep.equal({
      comma: -1,
      number: 1n,
      sign: true
    });
  });
});

describe('plugins', () => {
  it('1', () => {
    expect(BigMath.plugin1('-12.32').toString()).to.be.equal('12.32');
  });
  it('2', () => {
    expect(BigMath.plugin1('12.32').toString()).to.be.equal('12.32');
  });
  it('3', () => {
    expect(BigMath.plugin2('-12.32').toString()).to.be.equal('12.32');
  });
  it('4', () => {
    expect(BigMath.plugin2('12.32').toString()).to.be.equal('12.32');
  });
});
