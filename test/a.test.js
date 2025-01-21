const { addNumbers } = require('../a');
const { add } = require('../h/a');


// Test generated using Keploy
test('addNumbers should return the correct sum when both arguments are positive numbers', () => {

  expect(addNumbers(3, 5)).toBe(8);
});


// Test generated using Keploy
test('addNumbers should throw a TypeError when the first argument is not a number', () => {

  expect(() => addNumbers('3', 5)).toThrow(TypeError);
});


// Test generated using Keploy


test('add function should return the sum of 2 and 3', () => {
  expect(add()).toBe(5);
});

