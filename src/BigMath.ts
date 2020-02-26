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
  superFactorial,
  binomial
} from './basic';
import { bitAND, bitLeft, bitNOT, bitOR, bitRight, bitXOR } from './bitOperations';
import { eq, gt, gte, lt, lte, neq } from './comparison';
import { E, LOG10, LOG10E, LOG2, LOG2E, PI, PI2, SQRT1_2, SQRT2 } from './constants';
import { BigNumber, T } from './interfaces';
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
  public static naturalLogarithm(value: T) {
    return new BigMath(value).naturalLogarithm();
  }
  public static ln(value: T) {
    return this.naturalLogarithm(value);
  }

  public naturalLogarithmPlusOne() {
    this.number = ln1p(this.number);
    return this;
  }
  public ln1p() {
    return this.naturalLogarithmPlusOne();
  }
  public static naturalLogarithmPlusOne(value: T) {
    return new BigMath(value).naturalLogarithmPlusOne();
  }
  public static ln1p(value: T) {
    return this.naturalLogarithmPlusOne(value);
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
  public static logarithm(value: T) {
    return new BigMath(value).logarithm();
  }
  public static log10(value: T) {
    return this.logarithm(value);
  }
  public static log(value: T) {
    return this.logarithm(value);
  }

  public logarithmBase2() {
    this.number = log2(this.number);
    return this;
  }
  public log2() {
    return this.logarithmBase2();
  }
  public static logarithmBase2(value: T) {
    return new BigMath(value).logarithmBase2();
  }
  public static log2(value: T) {
    return this.logarithmBase2(value);
  }

  public toPower(value: T) {
    this.number = power(this.number, normalize(value));
    return this;
  }
  public pow(value: T) {
    return this.toPower(value);
  }
  public static toPower(value1: T, value2: T) {
    return new BigMath(value1).toPower(value2);
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
  public static squareRoot(value: T) {
    return new BigMath(value).sqrt();
  }
  public static sqrt(value: T) {
    return this.squareRoot(value);
  }

  public cubeRoot() {
    this.number = cbrt(this.number);
    return this;
  }
  public cbrt() {
    return this.cubeRoot();
  }
  public static cubeRoot(value: T) {
    return new BigMath(value).cbrt();
  }
  public static cbrt(value: T) {
    return this.cubeRoot(value);
  }

  public naturalExponential() {
    this.number = exp(this.number);
    return this;
  }
  public exp() {
    return this.naturalExponential();
  }
  public static naturalExponential(value: T) {
    return new BigMath(value).exp();
  }
  public static exp(value: T) {
    return this.naturalExponential(value);
  }

  public naturalExponentialMinusOne() {
    this.number = expm1(this.number);
    return this;
  }
  public expm1() {
    return this.naturalExponentialMinusOne();
  }
  public static naturalExponentialMinusOne(value: T) {
    return new BigMath(value).naturalExponentialMinusOne();
  }
  public static expm1(value: T) {
    return this.naturalExponentialMinusOne(value);
  }

  public factorial() {
    this.number = factorial(this.number);
    return this;
  }
  public static factorial(value: T) {
    return new BigMath(value).factorial();
  }

  public doubleFactorial() {
    this.number = doubleFactorial(this.number);
    return this;
  }
  public static doubleFactorial(value: T) {
    return new BigMath(value).doubleFactorial();
  }

  public binomial(value: T) {
    this.number = binomial(this.number, value);
    return this;
  }
  public static binomial(value1: T, value2: T) {
    return new BigMath(value1).binomial(value2);
  }

  public gamma() {
    this.number = gamma(this.number);
    return this;
  }
  public static gamma(value: T) {
    return new BigMath(value).gamma();
  }

  public superFactorial() {
    this.number = superFactorial(this.number);
    return this;
  }
  public static superFactorial(value: T) {
    return new BigMath(value).superFactorial();
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
  public static bitNOT(value: T) {
    return new BigMath(value).bitNOT();
  }

  public sine() {
    this.number = sin(this.number);
    return this;
  }
  public sin() {
    return this.sine();
  }
  public static sine(value: T) {
    return new BigMath(value).sine();
  }
  public static sin(value: T) {
    return this.sine(value);
  }

  public cosine() {
    this.number = cos(this.number);
    return this;
  }
  public cos() {
    return this.cosine();
  }
  public static cosine(value: T) {
    return new BigMath(value).cosine();
  }
  public static cos(value: T) {
    return this.cosine(value);
  }

  public tangent() {
    this.number = tan(this.number);
    return this;
  }
  public tan() {
    return this.tangent();
  }
  public static tangent(value: T) {
    return new BigMath(value).tangent();
  }
  public static tan(value: T) {
    return this.tangent(value);
  }

  public cotangent() {
    this.number = cot(this.number);
    return this;
  }
  public cot() {
    return this.cotangent();
  }
  public static cotangent(value: T) {
    return new BigMath(value).cotangent();
  }
  public static cot(value: T) {
    return this.cotangent(value);
  }

  public secant() {
    this.number = sec(this.number);
    return this;
  }
  public sec() {
    return this.secant();
  }
  public static secant(value: T) {
    return new BigMath(value).secant();
  }
  public static sec(value: T) {
    return this.secant(value);
  }

  public cosecant() {
    this.number = csc(this.number);
    return this;
  }
  public csc() {
    return this.cosecant();
  }
  public static cosecant(value: T) {
    return new BigMath(value).cosecant();
  }
  public static csc(value: T) {
    return this.cosecant(value);
  }

  public inverseSine() {
    this.number = asin(this.number);
    return this;
  }
  public asin() {
    return this.inverseSine();
  }
  public static inverseSine(value: T) {
    return new BigMath(value).inverseSine();
  }
  public static asin(value: T) {
    return this.inverseSine(value);
  }

  public inverseCosine() {
    this.number = acos(this.number);
    return this;
  }
  public acos() {
    return this.inverseCosine();
  }
  public static inverseCosine(value: T) {
    return new BigMath(value).inverseCosine();
  }
  public static acos(value: T) {
    return this.inverseCosine(value);
  }

  public inverseTangent() {
    this.number = atan(this.number);
    return this;
  }
  public atan() {
    return this.inverseTangent();
  }
  public static inverseTangent(value: T) {
    return new BigMath(value).inverseTangent();
  }
  public static atan(value: T) {
    return this.inverseTangent(value);
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
  public static inverseCotangent(value: T) {
    return new BigMath(value).inverseCotangent();
  }
  public static acot(value: T) {
    return this.inverseCotangent(value);
  }

  public inverseSecant() {
    this.number = asec(this.number);
    return this;
  }
  public asec() {
    return this.inverseSecant();
  }
  public static inverseSecant(value: T) {
    return new BigMath(value).inverseSecant();
  }
  public static asec(value: T) {
    return this.inverseSecant(value);
  }

  public inverseCosecant() {
    this.number = acsc(this.number);
    return this;
  }
  public acsc() {
    return this.inverseCosecant();
  }
  public static inverseCosecant(value: T) {
    return new BigMath(value).inverseCosecant();
  }
  public static acsc(value: T) {
    return this.inverseCosecant(value);
  }

  public hyperbolicSine() {
    this.number = sinh(this.number);
    return this;
  }
  public sinh() {
    return this.hyperbolicSine();
  }
  public static hyperbolicSine(value: T) {
    return new BigMath(value).hyperbolicSine();
  }
  public static sinh(value: T) {
    return this.hyperbolicSine(value);
  }

  public hyperbolicCosine() {
    this.number = cosh(this.number);
    return this;
  }
  public cosh() {
    return this.hyperbolicCosine();
  }
  public static hyperbolicCosine(value: T) {
    return new BigMath(value).hyperbolicCosine();
  }
  public static cosh(value: T) {
    return this.hyperbolicCosine(value);
  }

  public hyperbolicTangent() {
    this.number = tanh(this.number);
    return this;
  }
  public tanh() {
    return this.hyperbolicTangent();
  }
  public static hyperbolicTangent(value: T) {
    return new BigMath(value).hyperbolicTangent();
  }
  public static tanh(value: T) {
    return this.hyperbolicTangent(value);
  }

  public hyperbolicCotangent() {
    this.number = coth(this.number);
    return this;
  }
  public coth() {
    return this.hyperbolicCotangent();
  }
  public static hyperbolicCotangent(value: T) {
    return new BigMath(value).hyperbolicCotangent();
  }
  public static coth(value: T) {
    return this.hyperbolicCotangent(value);
  }

  public hyperbolicSecant() {
    this.number = sech(this.number);
    return this;
  }
  public sech() {
    return this.hyperbolicSecant();
  }
  public static hyperbolicSecant(value: T) {
    return new BigMath(value).hyperbolicSecant();
  }
  public static sech(value: T) {
    return this.hyperbolicSecant(value);
  }

  public hyperbolicCosecant() {
    this.number = csch(this.number);
    return this;
  }
  public csch() {
    return this.hyperbolicCosecant();
  }
  public static hyperbolicCosecant(value: T) {
    return new BigMath(value).hyperbolicCosecant();
  }
  public static csch(value: T) {
    return this.hyperbolicCosecant(value);
  }

  public inverseHyperbolicSine() {
    this.number = asinh(this.number);
    return this;
  }
  public asinh() {
    return this.inverseHyperbolicSine();
  }
  public static inverseHyperbolicSine(value: T) {
    return new BigMath(value).inverseHyperbolicSine();
  }
  public static asinh(value: T) {
    return this.inverseHyperbolicSine(value);
  }

  public inverseHyperbolicCosine() {
    this.number = acosh(this.number);
    return this;
  }
  public acosh() {
    return this.inverseHyperbolicCosine();
  }
  public static inverseHyperbolicCosine(value: T) {
    return new BigMath(value).inverseHyperbolicCosine();
  }
  public static acosh(value: T) {
    return this.inverseHyperbolicCosine(value);
  }

  public inverseHyperbolicTangent() {
    this.number = atanh(this.number);
    return this;
  }
  public atanh() {
    return this.inverseHyperbolicTangent();
  }
  public static inverseHyperbolicTangent(value: T) {
    return new BigMath(value).inverseHyperbolicTangent();
  }
  public static atanh(value: T) {
    return this.inverseHyperbolicTangent(value);
  }

  public inverseHyperbolicCotangent() {
    this.number = acoth(this.number);
    return this;
  }
  public acoth() {
    return this.inverseHyperbolicCotangent();
  }
  public static inverseHyperbolicCotangent(value: T) {
    return new BigMath(value).inverseHyperbolicCotangent();
  }
  public static acoth(value: T) {
    return this.inverseHyperbolicCotangent(value);
  }

  public inverseHyperbolicSecant() {
    this.number = asech(this.number);
    return this;
  }
  public asech() {
    return this.inverseHyperbolicSecant();
  }
  public static inverseHyperbolicSecant(value: T) {
    return new BigMath(value).inverseHyperbolicSecant();
  }
  public static asech(value: T) {
    return this.inverseHyperbolicSecant(value);
  }

  public inverseHyperbolicCosecant() {
    this.number = acsch(this.number);
    return this;
  }
  public acsch() {
    return this.inverseHyperbolicCosecant();
  }
  public static inverseHyperbolicCosecant(value: T) {
    return new BigMath(value).inverseHyperbolicCosecant();
  }
  public static acsch(value: T) {
    return this.inverseHyperbolicCosecant(value);
  }

  public versedSine() {
    this.number = versin(this.number);
    return this;
  }
  public versin() {
    return this.versedSine();
  }
  public static versedSine(value: T) {
    return new BigMath(value).versedSine();
  }
  public static versin(value: T) {
    return this.versedSine(value);
  }

  public versedCosine() {
    this.number = vercos(this.number);
    return this;
  }
  public vercos() {
    return this.versedCosine();
  }
  public static versedCosine(value: T) {
    return new BigMath(value).versedCosine();
  }
  public static vercos(value: T) {
    return this.versedCosine(value);
  }

  public coversedSine() {
    this.number = coversin(this.number);
    return this;
  }
  public coversin() {
    return this.coversedSine();
  }
  public static coversedSine(value: T) {
    return new BigMath(value).coversedSine();
  }
  public static coversin(value: T) {
    return this.coversedSine(value);
  }

  public coversedCosine() {
    this.number = covercos(this.number);
    return this;
  }
  public covercos() {
    return this.coversedCosine();
  }
  public static coversedCosine(value: T) {
    return new BigMath(value).coversedCosine();
  }
  public static covercos(value: T) {
    return this.coversedCosine(value);
  }

  public haversin() {
    this.number = haversin(this.number);
    return this;
  }
  public static haversin(value: T) {
    return new BigMath(value).haversin();
  }

  public havercos() {
    this.number = havercos(this.number);
    return this;
  }
  public static havercos(value: T) {
    return new BigMath(value).havercos();
  }

  public hacoversin() {
    this.number = hacoversin(this.number);
    return this;
  }
  public static hacoversin(value: T) {
    return new BigMath(value).hacoversin();
  }

  public hacovercos() {
    this.number = hacovercos(this.number);
    return this;
  }
  public static hacovercos(value: T) {
    return new BigMath(value).hacovercos();
  }

  public gudermannian() {
    this.number = gd(this.number);
    return this;
  }
  public gd() {
    return this.gudermannian();
  }
  public static gudermannian(value: T) {
    return new BigMath(value).gudermannian();
  }
  public static gd(value: T) {
    return this.gudermannian(value);
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
  public static errorFunction(value: T) {
    return new BigMath(value).errorFunction();
  }
  public static erf(value: T) {
    return new BigMath(value).errorFunction();
  }

  public KFunction() {
    this.number = K(this.number);
    return this;
  }
  public K() {
    return this.KFunction();
  }
  public static KFunction(value: T) {
    return new BigMath(value).KFunction();
  }
  public static K(value: T) {
    return new BigMath(value).KFunction();
  }

  public omegaFunction() {
    this.number = W(this.number);
    return this;
  }
  public W() {
    return this.omegaFunction();
  }
  public static omegaFunction(value: T) {
    return new BigMath(value).omegaFunction();
  }
  public static W(value: T) {
    return new BigMath(value).omegaFunction();
  }

  public tetrationXY() {
    this.number = XY(this.number);
    return this;
  }
  public XY() {
    return this.tetrationXY();
  }
  public static tetrationXY(value: T) {
    return new BigMath(value).tetrationXY();
  }
  public static XY(value: T) {
    return new BigMath(value).tetrationXY();
  }

  public absoluteValue() {
    this.number.sign = false;
    return this;
  }
  public abs() {
    return this.absoluteValue();
  }
  public static absoluteValue(value: T) {
    return new BigMath(value).absoluteValue();
  }
  public static abs(value: T) {
    return new BigMath(value).absoluteValue();
  }

  public negate() {
    this.number.sign = !this.number.sign;
    return this;
  }
  public neg() {
    return this.negate();
  }
  public static negate(value: T) {
    return new BigMath(value).negate();
  }
  public static neg(value: T) {
    return new BigMath(value).negate();
  }

  public ceil() {
    this.number = ceil(this.number);
    return this;
  }
  public static ceil(value: T) {
    return new BigMath(value).ceil();
  }

  public floor() {
    this.number = floor(this.number);
    return this;
  }
  public static floor(value: T) {
    return new BigMath(value).floor();
  }

  public round() {
    this.number = round(this.number);
    return this;
  }
  public static round(value: T) {
    return new BigMath(value).round();
  }

  public isInteger() {
    return isInteger(this.number);
  }
  public static isInteger(value: T) {
    return new BigMath(value).isInteger();
  }

  public isNegative() {
    return this.number.sign;
  }
  public isNeg() {
    return this.number.sign;
  }
  public static isNegative(value: T) {
    return new BigMath(value).number.sign;
  }
  public static isNeg(value: T) {
    return new BigMath(value).number.sign;
  }

  public isPositive() {
    return !this.number.sign;
  }
  public isPos() {
    return !this.number.sign;
  }
  public static isPositive(value: T) {
    return !new BigMath(value).number.sign;
  }
  public static isPos(value: T) {
    return !new BigMath(value).number.sign;
  }

  public isZero() {
    return this.number.number === 0n;
  }
  public static isZero(value: T) {
    return new BigMath(value).number.number === 0n;
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
  public static toNumber(value: T) {
    return new BigMath(value).toNumber();
  }

  public toBigNumber() {
    return { ...this.number };
  }
  public static toBigNumber(value: T) {
    return new BigMath(value).toBigNumber();
  }

  public toString() {
    return stringify(this.number);
  }
  public static toString(value: T) {
    return new BigMath(value).toString();
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
