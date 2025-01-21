const { logMessage } = require('../samples/check');


// Test generated using Keploy
test('test_logMessage_function_exists_and_callable', () => {

  expect(typeof logMessage).toBe('function');
  expect(() => logMessage()).not.toThrow();
});

