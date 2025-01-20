const { addNumbers } = require('../a.js');


// 	



// Test generated using Keploy
test('test_addNumbers_adds_positive_integers', () => {

  expect(addNumbers(2, 3)).toBe(5);
});


// Test generated using Keploy
test('test_addNumbers_throws_error_on_invalid_input', () => {

  expect(() => addNumbers('a', 'b')).toThrow(TypeError);
});
