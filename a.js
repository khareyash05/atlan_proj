// Refactored code to include a function that adds two numbers with input validation
function addNumbers(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }
  return a + b;
}
module.exports = { addNumbers };
