import {
  add,
  cbrt,
  divide,
  exp,
  expm1,
  factorial,
  gamma,
  ln,
  ln1p,
  log10,
  log2,
  multiply,
  power,
  sqrt,
  subtract,
  doubleFactorial,
  superFactorial
} from './basic';
import { bitAND, bitLeft, bitNOT, bitOR, bitRight, bitXOR } from './bitOperations';
import { eq, gt, gte, lt, lte, neq } from './comparison';
import { E, LOG10, LOG10E, LOG2, LOG2E, PI, PI2, SQRT1_2, SQRT2 } from './constants';
import { AGM, erf, K, W, XY } from './other';
import {
  acos,
  acosh,
  acot,
  acoth,
  acsc,
  acsch,
  asec,
  asech,
  asin,
  asinh,
  atan,
  atan2,
  atanh,
  cos,
  cosh,
  cot,
  coth,
  covercos,
  coversin,
  csc,
  csch,
  gd,
  hacovercos,
  hacoversin,
  havercos,
  haversin,
  sec,
  sech,
  sin,
  sinh,
  tan,
  tanh,
  vercos,
  versin
} from './trigonometry';
import { ceil, floor, isInteger, normalize, round, stringify, finalize } from './util';
import { BigNumber, T } from './interfaces';

interface Config {
  precision: number;
}

export const config: Config = {
  precision: 40
};

export default class BigMath {
  private number: BigNumber = normalize(0n);

  constructor(value: T) {
    this.number = normalize(value);
  }

  public sum(value: T) {
    this.number = add(this.number, normalize(value));
    return this;
  }
  public add(value: T) {
    return this.sum(value);
  }
  public static sum(value1: T, value2: T) {
    return new BigMath(value1).sum(value2);
  }
  public static add(value1: T, value2: T) {
    return new BigMath(value1).sum(value2);
  }

  public minus(value: T) {
    this.number = subtract(this.number, normalize(value));
    return this;
  }
  public sub(value: T) {
    return this.minus(value);
  }
  public static minus(value1: T, value2: T) {
    return new BigMath(value1).minus(value2);
  }
  public static sub(value1: T, value2: T) {
    return new BigMath(value1).minus(value2);
  }

  public times(value: T) {
    this.number = multiply(this.number, normalize(value));
    return this;
  }
  public mul(value: T) {
    return this.times(value);
  }
  public static times(value1: T, value2: T) {
    return new BigMath(value1).times(value2);
  }
  public static mul(value1: T, value2: T) {
    return this.times(value1, value2);
  }

  public dividedBy(value: T) {
    this.number = divide(this.number, normalize(value), true);
    return this;
  }
  public div(value: T) {
    return this.dividedBy(value);
  }
  public static dividedBy(value1: T, value2: T) {
    return new BigMath(value1).dividedBy(value2);
  }
  public static div(value1: T, value2: T) {
    return this.dividedBy(value1, value2);
  }

  public naturalLogarithm() {
    this.number = ln(this.number);
    return this;
  }
  public ln() {
    return this.naturalLogarithm();
  }
  public static naturalLogarithm(value1: T) {
    return new BigMath(value1).naturalLogarithm();
  }
  public static ln(value1: T) {
    return this.naturalLogarithm(value1);
  }

  public naturalLogarithmPlusOne() {
    this.number = ln1p(this.number);
    return this;
  }
  public ln1p() {
    return this.naturalLogarithmPlusOne();
  }
  public static naturalLogarithmPlusOne(value1: T) {
    return new BigMath(value1).naturalLogarithmPlusOne();
  }
  public static ln1p(value1: T) {
    return this.naturalLogarithmPlusOne(value1);
  }

  public logarithm() {
    this.number = log10(this.number);
    return this;
  }
  public log10() {
    return this.logarithm();
  }
  public log() {
    return this.logarithm();
  }
  public static logarithm(value1: T) {
    return new BigMath(log10(value1));
  }
  public static log10(value1: T) {
    return this.logarithm(value1);
  }
  public static log(value1: T) {
    return this.logarithm(value1);
  }

  public logarithmBase2() {
    this.number = log2(this.number);
    return this;
  }
  public log2() {
    return this.logarithmBase2();
  }
  public static logarithmBase2(value1: T) {
    return new BigMath(log2(value1));
  }
  public static log2(value1: T) {
    return this.logarithmBase2(value1);
  }

  public toPower(value: T) {
    this.number = power(this.number, value);
    return this;
  }
  public pow(value: T) {
    return this.toPower(value);
  }
  public static toPower(value1: T, value2: T) {
    return new BigMath(power(value1, value2));
  }
  public static pow(value1: T, value2: T) {
    return this.toPower(value1, value2);
  }

  public squareRoot() {
    this.number = sqrt(this.number);
    return this;
  }
  public sqrt() {
    return this.squareRoot();
  }
  public static squareRoot(value1: T) {
    return new BigMath(sqrt(value1));
  }
  public static sqrt(value1: T) {
    return this.squareRoot(value1);
  }

  public cubeRoot() {
    this.number = cbrt(this.number);
    return this;
  }
  public cbrt() {
    return this.cubeRoot();
  }
  public static cubeRoot(value1: T) {
    return new BigMath(cbrt(value1));
  }
  public static cbrt(value1: T) {
    return this.cubeRoot(value1);
  }

  public naturalExponential() {
    this.number = exp(this.number);
    return this;
  }
  public exp() {
    return this.naturalExponential();
  }
  public static naturalExponential(value1: T) {
    return new BigMath(exp(value1));
  }
  public static exp(value1: T) {
    return this.naturalExponential(value1);
  }

  public naturalExponentialMinusOne() {
    this.number = expm1(this.number);
    return this;
  }
  public expm1() {
    return this.naturalExponentialMinusOne();
  }
  public static naturalExponentialMinusOne(value1: T) {
    return new BigMath(value1).naturalExponentialMinusOne();
  }
  public static expm1(value1: T) {
    return this.naturalExponentialMinusOne(value1);
  }

  public factorial() {
    this.number = factorial(this.number);
    return this;
  }
  public static factorial(value1: T) {
    return new BigMath(value1).factorial();
  }

  public doubleFactorial() {
    this.number = doubleFactorial(this.number);
    return this;
  }
  public static doubleFactorial(value1: T) {
    return new BigMath(value1).doubleFactorial();
  }

  public gamma() {
    this.number = gamma(this.number);
    return this;
  }
  public static gamma(value1: T) {
    return new BigMath(value1).gamma();
  }

  public superFactorial() {
    this.number = superFactorial(this.number);
    return this;
  }
  public static superFactorial(value1: T) {
    return new BigMath(value1).superFactorial();
  }

  public bitLeft(value: T) {
    this.number = bitLeft(this.number, value);
    return this;
  }
  public static bitLeft(value1: T, value2: T) {
    return new BigMath(value1).bitLeft(value2);
  }

  public bitRight(value: T) {
    this.number = bitRight(this.number, value);
    return this;
  }
  public static bitRight(value1: T, value2: T) {
    return new BigMath(value1).bitRight(value2);
  }

  public bitAND(value: T) {
    this.number = bitAND(this.number, value);
    return this;
  }
  public static bitAND(value1: T, value2: T) {
    return new BigMath(value1).bitAND(value2);
  }

  public bitOR(value: T) {
    this.number = bitOR(this.number, value);
    return this;
  }
  public static bitOR(value1: T, value2: T) {
    return new BigMath(value1).bitOR(value2);
  }

  public bitXOR(value: T) {
    this.number = bitXOR(this.number, value);
    return this;
  }
  public static bitXOR(value1: T, value2: T) {
    return new BigMath(value1).bitXOR(value2);
  }

  public bitNOT() {
    this.number = bitNOT(this.number);
    return this;
  }
  public static bitNOT(value1: T) {
    return new BigMath(value1).bitNOT();
  }

  public sine() {
    this.number = sin(this.number);
    return this;
  }
  public sin() {
    return this.sine();
  }
  public static sine(value1: T) {
    return new BigMath(value1).sine();
  }
  public static sin(value1: T) {
    return this.sine(value1);
  }

  public cosine() {
    this.number = cos(this.number);
    return this;
  }
  public cos() {
    return this.cosine();
  }
  public static cosine(value1: T) {
    return new BigMath(value1).cosine();
  }
  public static cos(value1: T) {
    return this.cosine(value1);
  }

  public tangent() {
    this.number = tan(this.number);
    return this;
  }
  public tan() {
    return this.tangent();
  }
  public static tangent(value1: T) {
    return new BigMath(value1).tangent();
  }
  public static tan(value1: T) {
    return this.tangent(value1);
  }

  public cotangent() {
    this.number = cot(this.number);
    return this;
  }
  public cot() {
    return this.cotangent();
  }
  public static cotangent(value1: T) {
    return new BigMath(value1).cotangent();
  }
  public static cot(value1: T) {
    return this.cotangent(value1);
  }

  public secant() {
    this.number = sec(this.number);
    return this;
  }
  public sec() {
    return this.secant();
  }
  public static secant(value1: T) {
    return new BigMath(value1).secant();
  }
  public static sec(value1: T) {
    return this.secant(value1);
  }

  public cosecant() {
    this.number = csc(this.number);
    return this;
  }
  public csc() {
    return this.cosecant();
  }
  public static cosecant(value1: T) {
    return new BigMath(value1).cosecant();
  }
  public static csc(value1: T) {
    return this.cosecant(value1);
  }

  public inverseSine() {
    this.number = asin(this.number);
    return this;
  }
  public asin() {
    return this.inverseSine();
  }
  public static inverseSine(value1: T) {
    return new BigMath(value1).inverseSine();
  }
  public static asin(value1: T) {
    return this.inverseSine(value1);
  }

  public inverseCosine() {
    this.number = acos(this.number);
    return this;
  }
  public acos() {
    return this.inverseCosine();
  }
  public static inverseCosine(value1: T) {
    return new BigMath(value1).inverseCosine();
  }
  public static acos(value1: T) {
    return this.inverseCosine(value1);
  }

  public inverseTangent() {
    this.number = atan(this.number);
    return this;
  }
  public atan() {
    return this.inverseTangent();
  }
  public static inverseTangent(value1: T) {
    return new BigMath(value1).inverseTangent();
  }
  public static atan(value1: T) {
    return this.inverseTangent(value1);
  }

  public twoArgumentInverseTangent(value: T) {
    this.number = atan2(this.number, value);
    return this;
  }
  public atan2(value: T) {
    return this.twoArgumentInverseTangent(value);
  }
  public static twoArgumentInverseTangent(value1: T, value2: T) {
    return new BigMath(value1).twoArgumentInverseTangent(value2);
  }
  public static atan2(value1: T, value2: T) {
    return this.twoArgumentInverseTangent(value1, value2);
  }

  public inverseCotangent() {
    this.number = acot(this.number);
    return this;
  }
  public acot() {
    return this.inverseCotangent();
  }
  public static inverseCotangent(value1: T) {
    return new BigMath(value1).inverseCotangent();
  }
  public static acot(value1: T) {
    return this.inverseCotangent(value1);
  }

  public inverseSecant() {
    this.number = asec(this.number);
    return this;
  }
  public asec() {
    return this.inverseSecant();
  }
  public static inverseSecant(value1: T) {
    return new BigMath(value1).inverseSecant();
  }
  public static asec(value1: T) {
    return this.inverseSecant(value1);
  }

  public inverseCosecant() {
    this.number = acsc(this.number);
    return this;
  }
  public acsc() {
    return this.inverseCosecant();
  }
  public static inverseCosecant(value1: T) {
    return new BigMath(value1).inverseCosecant();
  }
  public static acsc(value1: T) {
    return this.inverseCosecant(value1);
  }

  public hyperbolicSine() {
    this.number = sinh(this.number);
    return this;
  }
  public sinh() {
    return this.hyperbolicSine();
  }
  public static hyperbolicSine(value1: T) {
    return new BigMath(value1).hyperbolicSine();
  }
  public static sinh(value1: T) {
    return this.hyperbolicSine(value1);
  }

  public hyperbolicCosine() {
    this.number = cosh(this.number);
    return this;
  }
  public cosh() {
    return this.hyperbolicCosine();
  }
  public static hyperbolicCosine(value1: T) {
    return new BigMath(value1).hyperbolicCosine();
  }
  public static cosh(value1: T) {
    return this.hyperbolicCosine(value1);
  }

  public hyperbolicTangent() {
    this.number = tanh(this.number);
    return this;
  }
  public tanh() {
    return this.hyperbolicTangent();
  }
  public static hyperbolicTangent(value1: T) {
    return new BigMath(value1).hyperbolicTangent();
  }
  public static tanh(value1: T) {
    return this.hyperbolicTangent(value1);
  }

  public hyperbolicCotangent() {
    this.number = coth(this.number);
    return this;
  }
  public coth() {
    return this.hyperbolicCotangent();
  }
  public static hyperbolicCotangent(value1: T) {
    return new BigMath(value1).hyperbolicCotangent();
  }
  public static coth(value1: T) {
    return this.hyperbolicCotangent(value1);
  }

  public hyperbolicSecant() {
    this.number = sech(this.number);
    return this;
  }
  public sech() {
    return this.hyperbolicSecant();
  }
  public static hyperbolicSecant(value1: T) {
    return new BigMath(value1).hyperbolicSecant();
  }
  public static sech(value1: T) {
    return this.hyperbolicSecant(value1);
  }

  public hyperbolicCosecant() {
    this.number = csch(this.number);
    return this;
  }
  public csch() {
    return this.hyperbolicCosecant();
  }
  public static hyperbolicCosecant(value1: T) {
    return new BigMath(value1).hyperbolicCosecant();
  }
  public static csch(value1: T) {
    return this.hyperbolicCosecant(value1);
  }

  public inverseHyperbolicSine() {
    this.number = asinh(this.number);
    return this;
  }
  public asinh() {
    return this.inverseHyperbolicSine();
  }
  public static inverseHyperbolicSine(value1: T) {
    return new BigMath(value1).inverseHyperbolicSine();
  }
  public static asinh(value1: T) {
    return this.inverseHyperbolicSine(value1);
  }

  public inverseHyperbolicCosine() {
    this.number = acosh(this.number);
    return this;
  }
  public acosh() {
    return this.inverseHyperbolicCosine();
  }
  public static inverseHyperbolicCosine(value1: T) {
    return new BigMath(value1).inverseHyperbolicCosine();
  }
  public static acosh(value1: T) {
    return this.inverseHyperbolicCosine(value1);
  }

  public inverseHyperbolicTangent() {
    this.number = atanh(this.number);
    return this;
  }
  public atanh() {
    return this.inverseHyperbolicTangent();
  }
  public static inverseHyperbolicTangent(value1: T) {
    return new BigMath(value1).inverseHyperbolicTangent();
  }
  public static atanh(value1: T) {
    return this.inverseHyperbolicTangent(value1);
  }

  public inverseHyperbolicCotangent() {
    this.number = acoth(this.number);
    return this;
  }
  public acoth() {
    return this.inverseHyperbolicCotangent();
  }
  public static inverseHyperbolicCotangent(value1: T) {
    return new BigMath(value1).inverseHyperbolicCotangent();
  }
  public static acoth(value1: T) {
    return this.inverseHyperbolicCotangent(value1);
  }

  public inverseHyperbolicSecant() {
    this.number = asech(this.number);
    return this;
  }
  public asech() {
    return this.inverseHyperbolicSecant();
  }
  public static inverseHyperbolicSecant(value1: T) {
    return new BigMath(value1).inverseHyperbolicSecant();
  }
  public static asech(value1: T) {
    return this.inverseHyperbolicSecant(value1);
  }

  public inverseHyperbolicCosecant() {
    this.number = acsch(this.number);
    return this;
  }
  public acsch() {
    return this.inverseHyperbolicCosecant();
  }
  public static inverseHyperbolicCosecant(value1: T) {
    return new BigMath(value1).inverseHyperbolicCosecant();
  }
  public static acsch(value1: T) {
    return this.inverseHyperbolicCosecant(value1);
  }

  public versedSine() {
    this.number = versin(this.number);
    return this;
  }
  public versin() {
    return this.versedSine();
  }
  public static versedSine(value1: T) {
    return new BigMath(value1).versedSine();
  }
  public static versin(value1: T) {
    return this.versedSine(value1);
  }

  public versedCosine() {
    this.number = vercos(this.number);
    return this;
  }
  public vercos() {
    return this.versedCosine();
  }
  public static versedCosine(value1: T) {
    return new BigMath(value1).versedCosine();
  }
  public static vercos(value1: T) {
    return this.versedCosine(value1);
  }

  public coversedSine() {
    this.number = coversin(this.number);
    return this;
  }
  public coversin() {
    return this.coversedSine();
  }
  public static coversedSine(value1: T) {
    return new BigMath(value1).coversedSine();
  }
  public static coversin(value1: T) {
    return this.coversedSine(value1);
  }

  public coversedCosine() {
    this.number = covercos(this.number);
    return this;
  }
  public covercos() {
    return this.coversedCosine();
  }
  public static coversedCosine(value1: T) {
    return new BigMath(value1).coversedCosine();
  }
  public static covercos(value1: T) {
    return this.coversedCosine(value1);
  }

  public haversin() {
    this.number = haversin(this.number);
    return this;
  }
  public static haversin(value1: T) {
    return new BigMath(value1).haversin();
  }

  public havercos() {
    this.number = havercos(this.number);
    return this;
  }
  public static havercos(value1: T) {
    return new BigMath(value1).havercos();
  }

  public hacoversin() {
    this.number = hacoversin(this.number);
    return this;
  }
  public static hacoversin(value1: T) {
    return new BigMath(value1).hacoversin();
  }

  public hacovercos() {
    this.number = hacovercos(this.number);
    return this;
  }
  public static hacovercos(value1: T) {
    return new BigMath(value1).hacovercos();
  }

  public gudermannian() {
    this.number = gd(this.number);
    return this;
  }
  public gd() {
    return this.gudermannian();
  }
  public static gudermannian(value1: T) {
    return new BigMath(value1).gudermannian();
  }
  public static gd(value1: T) {
    return this.gudermannian(value1);
  }

  public equals(value: T) {
    return eq(this.number, normalize(value));
  }
  public eq(value: T) {
    return this.equals(value);
  }
  public static equals(value1: T, value2: T) {
    return new BigMath(value1).eq(value2);
  }
  public static eq(value1: T, value2: T) {
    return new BigMath(value1).eq(value2);
  }

  public greaterThan(value: T) {
    return gt(this.number, normalize(value));
  }
  public gt(value: T) {
    return this.greaterThan(value);
  }
  public static greaterThan(value1: T, value2: T) {
    return new BigMath(value1).greaterThan(value2);
  }
  public static gt(value1: T, value2: T) {
    return new BigMath(value1).greaterThan(value2);
  }

  public lessThan(value: T) {
    return lt(this.number, normalize(value));
  }
  public lt(value: T) {
    return this.lessThan(value);
  }
  public static lessThan(value1: T, value2: T) {
    return new BigMath(value1).lessThan(value2);
  }
  public static lt(value1: T, value2: T) {
    return new BigMath(value1).lessThan(value2);
  }

  public greaterThanOrEqualTo(value: T) {
    return gte(this.number, normalize(value));
  }
  public gte(value: T) {
    return this.greaterThanOrEqualTo(value);
  }
  public static greaterThanOrEqualTo(value1: T, value2: T) {
    return new BigMath(value1).greaterThanOrEqualTo(value2);
  }
  public static gte(value1: T, value2: T) {
    return new BigMath(value1).greaterThanOrEqualTo(value2);
  }

  public lessThanOrEqualTo(value: T) {
    return lte(this.number, normalize(value));
  }
  public lte(value: T) {
    return this.lessThanOrEqualTo(value);
  }
  public static lessThanOrEqualTo(value1: T, value2: T) {
    return new BigMath(value1).lessThanOrEqualTo(value2);
  }
  public static lte(value1: T, value2: T) {
    return new BigMath(value1).lessThanOrEqualTo(value2);
  }

  public notEquals(value: T) {
    return neq(this.number, normalize(value));
  }
  public neq(value: T) {
    return this.notEquals(value);
  }
  public static notEquals(value1: T, value2: T) {
    return new BigMath(value1).notEquals(value2);
  }
  public static neq(value1: T, value2: T) {
    return new BigMath(value1).notEquals(value2);
  }

  public arithmeticGeometricMean(value: T) {
    this.number = AGM(this.number, value);
    return this;
  }
  public AGM(value: T) {
    return this.arithmeticGeometricMean(value);
  }
  public static arithmeticGeometricMean(value1: T, value2: T) {
    return new BigMath(value1).arithmeticGeometricMean(value2);
  }
  public static AGM(value1: T, value2: T) {
    return new BigMath(value1).arithmeticGeometricMean(value2);
  }

  public errorFunction() {
    this.number = erf(this.number);
    return this;
  }
  public erf() {
    return this.errorFunction();
  }
  public static errorFunction(value1: T) {
    return new BigMath(value1).errorFunction();
  }
  public static erf(value1: T) {
    return new BigMath(value1).errorFunction();
  }

  public KFunction() {
    this.number = K(this.number);
    return this;
  }
  public K() {
    return this.KFunction();
  }
  public static KFunction(value1: T) {
    return new BigMath(value1).KFunction();
  }
  public static K(value1: T) {
    return new BigMath(value1).KFunction();
  }

  public omegaFunction() {
    this.number = W(this.number);
    return this;
  }
  public W() {
    return this.omegaFunction();
  }
  public static omegaFunction(value1: T) {
    return new BigMath(value1).omegaFunction();
  }
  public static W(value1: T) {
    return new BigMath(value1).omegaFunction();
  }

  public tetrationXY() {
    this.number = XY(this.number);
    return this;
  }
  public XY() {
    return this.tetrationXY();
  }
  public static tetrationXY(value1: T) {
    return new BigMath(value1).tetrationXY();
  }
  public static XY(value1: T) {
    return new BigMath(value1).tetrationXY();
  }

  public absoluteValue() {
    this.number.sign = false;
    return this;
  }
  public abs() {
    return this.absoluteValue();
  }
  public static absoluteValue(value1: T) {
    return new BigMath(value1).absoluteValue();
  }
  public static abs(value1: T) {
    return new BigMath(value1).absoluteValue();
  }

  public negate() {
    this.number.sign = !this.number.sign;
    return this;
  }
  public neg() {
    return this.negate();
  }
  public static negate(value1: T) {
    return new BigMath(value1).negate();
  }
  public static neg(value1: T) {
    return new BigMath(value1).negate();
  }

  public ceil() {
    this.number = ceil(this.number);
    return this;
  }
  public static ceil(value1: T) {
    return new BigMath(value1).ceil();
  }

  public floor() {
    this.number = floor(this.number);
    return this;
  }
  public static floor(value1: T) {
    return new BigMath(value1).floor();
  }

  public round() {
    this.number = round(this.number);
    return this;
  }
  public static round(value1: T) {
    return new BigMath(value1).round();
  }

  public isInteger() {
    return isInteger(this.number);
  }
  public static isInteger(value1: T) {
    return new BigMath(value1).isInteger();
  }

  public isNegative() {
    return this.number.sign;
  }
  public isNeg() {
    return this.number.sign;
  }
  public static isNegative(value1: T) {
    return new BigMath(value1).number.sign;
  }
  public static isNeg(value1: T) {
    return new BigMath(value1).number.sign;
  }

  public isPositive() {
    return !this.number.sign;
  }
  public isPos() {
    return !this.number.sign;
  }
  public static isPositive(value1: T) {
    return !new BigMath(value1).number.sign;
  }
  public static isPos(value1: T) {
    return !new BigMath(value1).number.sign;
  }

  public isZero() {
    return this.number.number === 0n;
  }
  public static isZero(value1: T) {
    return new BigMath(value1).number.number === 0n;
  }

  public toPrecision(value: number) {
    this.number = finalize(this.number, value);
    return stringify(this.number);
  }
  public static toPrecision(value1: T, value2: number) {
    return new BigMath(value1).toPrecision(value2);
  }

  public toNumber() {
    return +stringify(this.number);
  }
  public static toNumber(value1: T) {
    return new BigMath(value1).toNumber();
  }

  public toBigNumber() {
    return { ...this.number };
  }
  public static toBigNumber(value1: T) {
    return new BigMath(value1).toBigNumber();
  }

  public toString() {
    return stringify(this.number);
  }
  public static toString(value1: T) {
    return new BigMath(value1).toString();
  }

  public clone() {
    return new BigMath(this.number);
  }

  public static configure(conf: Partial<Config>) {
    for (const attr in conf) {
      config[attr as keyof Config] = conf[attr as keyof Config] || 0;
    }
  }

  public static E = E;
  public static LOG10 = LOG10;
  public static LOG10E = LOG10E;
  public static LOG2 = LOG2;
  public static LOG2E = LOG2E;
  public static PI = PI;
  public static PI2 = PI2;
  public static SQRT1_2 = SQRT1_2;
  public static SQRT2 = SQRT2;
}
