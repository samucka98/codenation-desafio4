const calc = require('./calc');

describe('Calculadora', () => {
  it('soma', () => {
    const n1 = 1;
    const n2 = 2;
    expect(calc.soma(n1, n2)).toBe(3);
  });
})
