import { add, divide, multiply, power, sqrt, subtract } from './basic';
import { PI2 } from './constants';
import { BigNumber, T } from './interfaces';
import { DomainError, normalize, stringify } from './util';

/**
 * @returns Arithmetic–geometric mean of parameters
 */
export const AGM = (a: T, b: T): BigNumber => {
  a = normalize(a);
  b = normalize(b);
  if (a.sign || b.sign) {
    throw new DomainError(`AGM(${stringify(a)}, ${stringify(b)})`, 'arguments have to be positive');
  }
  for (let i = 0; i < 10; i += 1) {
    const c = normalize(a);
    a = multiply(add(c, b), 0.5);
    b = sqrt(multiply(c, b));
  }

  return a;
};

/**
 * @returns Complete elliptic integral of the first kind
 */
export const K = (a: T): BigNumber => {
  a = normalize(a);
  if (String(a.number).length > Math.abs(a.comma)) {
    throw new DomainError(stringify(a), 'number from range [-1, 1]');
  }

  return divide(PI2, AGM(1, sqrt(subtract(1, power(a, 2)))));
};
