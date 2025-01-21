const { addNumbers } = require('../a');


// Test generated using Keploy
test('addNumbers should return the correct sum for positive numbers', () => {

  const result = addNumbers(5, 10);
  expect(result).toBe(15);
});


// Test generated using Keploy
test('addNumbers should throw TypeError if the first argument is not a number', () => {

  expect(() => addNumbers('5', 10)).toThrow(TypeError);
});

