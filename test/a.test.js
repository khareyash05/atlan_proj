const { addNumbers } = require('../a');
const { add } = require('../h/a');


// 	



// Test generated using Keploy
test('addNumbers should return the correct sum for positive numbers', () => {

  expect(addNumbers(3, 5)).toBe(8);
});


// Test generated using Keploy
test('addNumbers should throw a TypeError if one argument is a string', () => {

  expect(() => addNumbers('3', 5)).toThrow(TypeError);
});

// Test generated using Keploy


test('add should return the correct sum of 2 and 3 when no arguments are passed', () => {
  expect(add()).toBe(5);
});

