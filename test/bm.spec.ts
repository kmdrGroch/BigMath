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
});

describe('ln', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.ln(8))).to.be.equal(
      '2.0794415416798359282516963643745297042265008398857456461438779361291253064601910241762191044'
    );
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.ln(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
    expect(() => BigMath.stringify(BigMath.ln(-123.423))).to.throw(
      DomainError,
      'Number out of domain. Given: -123.423. Expected: numbers greater than 0'
    );
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.ln(0.04))).to.be.equal(
      '-3.2188758248682007492015186664523752790512022717320555600421220638708746935398089758237808956'
    );
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.ln(0.1))).to.be.equal(
      '-2.3025850929940456840179914546843642076011010518237930922511220638708746935398089758237808956'
    );
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.ln(0.5))).to.be.equal('-0.69314718055994530941723212145817656807550013436025525412');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.ln(0.2))).to.be.equal(
      '-1.6094379124341003746007593332261876395256009174635378381291220638708746935398089758237808956'
    );
  });
});

describe('log2', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.log2(8))).to.be.equal('3.0000000000000000000000000000000000000000006301763');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.log2(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
    expect(() => BigMath.stringify(BigMath.log2(-123.423))).to.throw(
      DomainError,
      'Number out of domain. Given: -123.423. Expected: numbers greater than 0'
    );
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.log2(0.04))).to.be.equal('-4.6438561897747246957406388589787803517296621558727');
  });
});

describe('log10', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.log10(8))).to.be.equal('0.90308998699194358564121668417347908030456983408831');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.log10(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: numbers greater than 0');
    expect(() => BigMath.stringify(BigMath.log10(-123.423))).to.throw(
      DomainError,
      'Number out of domain. Given: -123.423. Expected: numbers greater than 0'
    );
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.log10(0.04))).to.be.equal('-1.39794000867203760957252221055101394646362004737379');
  });
});

describe('log1p', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.ln1p(8))).to.be.equal(
      '2.197224577336219382790490473845051409294981154085466651848636605770876959713049334181888287'
    );
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.ln1p(-1))).to.throw(DomainError, 'Number out of domain. Given: -1. Expected: numbers greater than -1');
    expect(() => BigMath.stringify(BigMath.ln1p(-123.423))).to.throw(
      DomainError,
      'Number out of domain. Given: -123.423. Expected: numbers greater than -1'
    );
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.ln1p(0.04))).to.be.equal(
      '0.0392207131532812962692008965711198938295653846918623394861827469463323122737949287409460554'
    );
  });
});

describe('exp', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.exp(0.43242))).to.be.equal(
      '1.5409821917860738933829323161090366019199690283787678674548750116118517106499841522229360078'
    );
  });
});

describe('expm1', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.expm1(0.43242))).to.be.equal(
      '0.5409821917860738933829323161090366019199690283787678674548750116118517106499841522229360078'
    );
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
    expect(BigMath.stringify(BigMath.power(1.74, 3.14))).to.be.equal(
      '5.69278313249561028952140592115895686170578485983175490178811053264547398360224498329398094382953454758421056238019480788945517537932813048821026546006266334634284974570502104107026576'
    );
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
    expect(BigMath.stringify(BigMath.sqrt(2))).to.be.equal('1.41421356237309504880168872420969807856967187537694671875');
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
    expect(BigMath.stringify(BigMath.sqrt(0.1))).to.be.equal('0.31622776601683793319988935444327185337195551393252078125');
  });
  it('7', () => {
    expect(BigMath.stringify(BigMath.sqrt(0.14))).to.be.equal('0.374165738677394138558374873231654930175601980777869140625');
  });
});

describe('sin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.sin(1.523))).to.be.equal(
      '0.99885797300962142098088581364210398014209386927547169166455979390567973243038978179133656379'
    );
  });
});

describe('cos', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.cos(0.43223))).to.be.equal(
      '0.9080338684590022306625164663612605645158839907593712904466546671495053586552954512606015581'
    );
  });
});

describe('tan', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.tan(0.1243))).to.be.equal('0.12494414654734352405365453192964879368374187342775');
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
    expect(BigMath.stringify(BigMath.cot(0.1243))).to.be.equal('8.00357621892340908314694191872854918728544436206623');
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
    expect(BigMath.stringify(BigMath.sec(0.1243))).to.be.equal('1.0077752922931004536756918747321979887282482524678');
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
    expect(BigMath.stringify(BigMath.csc(0.1243))).to.be.equal('8.065806363415646335198291465554782223886115384297');
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
    expect(BigMath.stringify(BigMath.asin(0.533))).to.be.equal('0.56214223826934260711051363736775091282632');
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
    expect(BigMath.stringify(BigMath.acos(0.43223))).to.be.equal('1.123832078732756669980357528914145635922864699687552910487');
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
    expect(BigMath.stringify(BigMath.atan(0.1243))).to.be.equal('0.12366570450169812188959191619059270324788');
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
    expect(BigMath.stringify(BigMath.atan2(0.1243, 2.321))).to.be.equal('1.517292936115139214045688674161216076398084699687552910487');
  });
  it('3', () => {
    expect(BigMath.stringify(BigMath.atan2(-0.1243, 0))).to.be.equal('3.141592653589793238462643383279502884197169399375105820974');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.atan2(-0.1243, 1.432))).to.be.equal('1.657380979726293965145260359601776841317644699687552910487');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.atan2(-0.1243, -0.32))).to.be.equal('-1.941295464679711452492024830703875892979084699687552910487');
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
    expect(BigMath.stringify(BigMath.acot(0.1243))).to.be.equal('1.447130622293198497341729775449158738850704699687552910487');
  });
});

describe('asec', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.asec(1.43223))).to.be.equal('0.797899637397702841131659636555515376791444699687552910487');
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
    expect(BigMath.stringify(BigMath.acsc(1.523))).to.be.equal('0.71630044347220024699108983365416660128242');
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
    expect(BigMath.stringify(BigMath.sinh(1.523))).to.be.equal(
      '2.18395286591001705273745041251510737567275846436991677328893173881387139549988953470066116379'
    );
  });
});

describe('cosh', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.cosh(1.523))).to.be.equal(
      '2.4020096004214006731488863223856853655303220574654146857505144059842769156381877287643350782270566792135635319690441872508133967730311493276429726495858621803031262062771127645261125'
    );
  });
});

describe('tanh', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.tanh(1.523))).to.be.equal('0.909219041225676840227934629350112661706365261927007');
  });
});

describe('coth', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.coth(1.523))).to.be.equal('1.099844981966001809380675922203530638199648184504556');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.coth(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: real numbers without 0');
  });
});

describe('sech', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.sech(1.523))).to.be.equal('0.41631806959662579417998037371642784543161977099471');
  });
});

describe('csch', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.csch(1.523))).to.be.equal('0.45788533974762158277220110725812937032866919554834');
  });
  it('2', () => {
    expect(() => BigMath.stringify(BigMath.csch(0))).to.throw(DomainError, 'Number out of domain. Given: 0. Expected: real numbers without 0');
  });
});

describe('asinh', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.asinh(1.523))).to.be.equal(
      '1.207453977155062072703114492267693420810850735402815935868969122819885160235057995704227058238'
    );
  });
});

describe('acosh', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.acosh(1))).to.be.equal('0');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.acosh(3.132))).to.be.equal(
      '1.80829981778707157512709111817795560333652881059393465779093698760412888534954023872783477'
    );
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
    expect(BigMath.stringify(BigMath.atanh(-0.12))).to.be.equal(
      '-0.1205810284084440352303206434681134989454389225936441169794835640794440403967719010529380806'
    );
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.atanh(0.423))).to.be.equal(
      '0.451340165790876403833794015078502530850531360125826100931735222001643658129988266726380978031'
    );
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
    expect(BigMath.stringify(BigMath.acoth(-1.12))).to.be.equal(
      '-1.4358398124420060713746119510532660328562436126171557323105007427483319303378687696992050697'
    );
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.acoth(1.423))).to.be.equal(
      '0.872694770885123881197980091442851219085524698255683717212877918855638139497012356309396144'
    );
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
    expect(BigMath.stringify(BigMath.asech(0.543))).to.be.equal(
      '1.2202662459660493460899849844983009086217894821170682981873328880317261643917722896803986466'
    );
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
    expect(BigMath.stringify(BigMath.acsch(-1.12))).to.be.equal(
      '-0.8035482548454507913075123597096101445942361826898286375391467924499756658641783274480875712'
    );
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.acsch(1.423))).to.be.equal(
      '0.65491038024859147045714403478325217264921537354298347196431660088209769691558862389611740286'
    );
  });
});

describe('AGM', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.AGM(12, 6))).to.be.equal('8.74074618628144121511859429959049184984318365932778542236328125');
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
    expect(BigMath.stringify(BigMath.K(0.32))).to.be.equal('1.6135037415649716545922387873211206083943862678789');
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
    expect(BigMath.stringify(BigMath.gamma(1.24))).to.be.equal(
      '0.908521058339959433116491610643721847660277058012917673491400226707765927910520723252501389236749613194301091722979290427131800312251832124957306011221224771048553983989284278338601358565293659804998566929144592030914648539128508723663574259761424400041153035932800108229449965996372109394495057609646804016079968075152545198426497239381930682034312969251112967099008553377060719631665759687433871723537896782417106031379697306250530512182425003909533743472807874220935725925611588583096481601324367506593802042334197854862389439837652016844722719808950540344742035035774765923544518698875508583660999943814311485207006403515791129873143069535914124098952373955050899434156640537255553553759191035346711819905318017178174773318038508183081993933381554666208913408510626264065197950406933570232180018216697485970939285597932980275032662928161211710953134811855960172645623180611405189894447330202068937656393497019432209163119353936447186536164515943683965016121389072010732895188647665225953725241782636777258487874322073125'
    );
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.gamma(0.24))).to.be.equal('3.7855044097498308309758273555809824557813097250267');
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
    expect(BigMath.stringify(BigMath.W(0.1))).to.be.equal(
      '0.091276527160862264299895721423179568653119224966941460877532441245073248414005439814740880765068'
    );
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.W(123))).to.be.equal(
      '3.54628404733667875946156681021743395923947735961670981325441622760047834223659153439022918906107419185'
    );
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.W(5.321))).to.be.equal(
      '1.3624077308379869368091588521095263646221369867291744202937346148415251997425411813291546304272570399082'
    );
  });
  it('6', () => {
    expect(() => BigMath.stringify(BigMath.W(-2))).to.throw(DomainError, 'Number out of domain. Given: -2. Expected: number bigger than -log(2) / 2');
  });
});

describe('XY', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.XY(0.1))).to.be.equal('0.399012978260252071596470810624092023996201915529345');
  });
  it('2', () => {
    expect(BigMath.stringify(BigMath.XY(1.21))).to.be.equal('1.27515965772177045143625968232490640586040661659652');
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
    expect(BigMath.stringify(BigMath.cbrt(-54.233))).to.be.equal('-3.7851916754719890277586141982554378185635875255032');
  });
  it('4', () => {
    expect(BigMath.stringify(BigMath.cbrt(33168.984597))).to.be.equal('32.13');
  });
  it('5', () => {
    expect(BigMath.stringify(BigMath.cbrt(239830.305597))).to.be.equal('62.13');
  });
  it('6', () => {
    expect(BigMath.stringify(BigMath.cbrt(12.43))).to.be.equal('2.31645415529626827534897141335692672367800276385054');
  });
  it('7', () => {
    expect(BigMath.stringify(BigMath.cbrt(0))).to.be.equal('0');
  });
  it('8', () => {
    expect(BigMath.stringify(BigMath.cbrt(12.432))).to.be.equal('2.31657838859883922732638440088481734150382610225031');
  });
});

describe('versin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.versin(0.32))).to.be.equal(
      '0.050764581917559132424692726233908258844071886990283001772877077288421357905100689651220820567'
    );
  });
});

describe('vercosin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.vercosin(0.32))).to.be.equal(
      '1.949235418082440867575307273766091741155928113009716998227122922711578642094899310348779179433'
    );
  });
});

describe('coversin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.coversin(0.32))).to.be.equal(
      '0.68543343938388223333824245658285216569571179729855345379440838460732321240969987647168586235'
    );
  });
});

describe('covercosin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.covercosin(0.32))).to.be.equal(
      '1.31456656061611776666175754341714783430428820270144654620559161539267678759030012352831413765'
    );
  });
});

describe('haversin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.haversin(0.32))).to.be.equal('0.0253822909587795662123463631169541294220359434951415');
  });
});

describe('havercosin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.havercosin(0.32))).to.be.equal('0.97461770904122043378765363688304587057796405650485');
  });
});

describe('hacoversin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.hacoversin(0.32))).to.be.equal('0.342716719691941116669121228291426082847855898649276');
  });
});

describe('hacovercosin', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.hacovercosin(0.32))).to.be.equal('0.65728328030805888333087877170857391715214410135072');
  });
});

describe('gd', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.gd(0.32))).to.be.equal('0.31467444806323160053161483374873070282984');
  });
});

describe('erf', () => {
  it('1', () => {
    expect(BigMath.stringify(BigMath.erf(0.5))).to.be.equal(
      '0.52049987781304653768274665389196452873645220339457530386137576762468944253839581778626941367999268066792216130840796461412101765913651565951'
    );
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
