import { Suite } from 'benchmark';

import BigMath from '../index';

/* tslint:disable no-console no-any no-unsafe-any */

new Suite().add('BigMath.add(12.54354, 6.423525)', () => {
  BigMath.add(12.54354, 6.423525);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.subtract(12.54354, 6.423525)', () => {
  BigMath.subtract(12.54354, 6.423525);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.multiply(8.423525, 100.54354)', () => {
  BigMath.multiply(8.423525, 100.54354);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.divide(8.423525, 100.54354)', () => {
  BigMath.divide(8.423525, 100.54354);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.ln(8)', () => {
  BigMath.ln(8);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.ln(0.04)', () => {
  BigMath.ln(0.04);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.exp(0.43242)', () => {
  BigMath.exp(0.43242);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.factorial(43)', () => {
  BigMath.factorial(43);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.power(2, 3)', () => {
  BigMath.power(2, 3);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.power(1.74, 3.14)', () => {
  BigMath.power(1.74, 3.14);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.sqrt(2)', () => {
  BigMath.sqrt(2);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.sqrt(2.25)', () => {
  BigMath.sqrt(2.25);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.sin(1.523)', () => {
  BigMath.sin(1.523);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.cos(0.43223)', () => {
  BigMath.cos(0.43223);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.tan(0.1243)', () => {
  BigMath.tan(0.1243);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.cot(0.1243)', () => {
  BigMath.cot(0.1243);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.sec(0.1243)', () => {
  BigMath.sec(0.1243);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.csc(0.1243)', () => {
  BigMath.csc(0.1243);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.asin(0.533)', () => {
  BigMath.asin(0.533);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.acos(0.43223)', () => {
  BigMath.acos(0.43223);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.atan(0.1243)', () => {
  BigMath.atan(0.1243);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.atan2(-0.1243, -0.32)', () => {
  BigMath.atan2(-0.1243, -0.32);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.acot(0.1243)', () => {
  BigMath.acot(0.1243);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.asec(1.43223)', () => {
  BigMath.asec(1.43223);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.acsc(1.523)', () => {
  BigMath.acsc(1.523);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.sinh(1.523)', () => {
  BigMath.sinh(1.523);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.cosh(1.523)', () => {
  BigMath.cosh(1.523);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.tanh(1.523)', () => {
  BigMath.tanh(1.523);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.coth(1.523)', () => {
  BigMath.coth(1.523);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.sech(1.523)', () => {
  BigMath.sech(1.523);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.csch(1.523)', () => {
  BigMath.csch(1.523);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.asinh(1.523)', () => {
  BigMath.asinh(1.523);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.acosh(3.132)', () => {
  BigMath.acosh(3.132);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.atanh(-0.12)', () => {
  BigMath.atanh(-0.12);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.acoth(-1.12)', () => {
  BigMath.acoth(-1.12);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.asech(0.543)', () => {
  BigMath.asech(0.543);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.acsch(-1.12)', () => {
  BigMath.acsch(-1.12);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.AGM(12, 6)', () => {
  BigMath.AGM(12, 6);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.K(0.32)', () => {
  BigMath.K(0.32);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.gamma(1.24)', () => {
  BigMath.gamma(1.24);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.gamma(0.24)', () => {
  BigMath.gamma(0.24);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.W(1)', () => {
  BigMath.W(1);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.W(5.321)', () => {
  BigMath.W(5.321);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.XY(1.21)', () => {
  BigMath.XY(1.21);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.cbrt(1.728)', () => {
  BigMath.cbrt(1.728);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.cbrt(12.43)', () => {
  BigMath.cbrt(12.43);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.gd(0.32)', () => {
  BigMath.gd(0.32);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();

new Suite().add('BigMath.erf(0.5)', () => {
  BigMath.erf(0.5);
}).on('cycle', (event: any) => {
  console.log(String(event.target));
}).run();
