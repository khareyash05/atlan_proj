const { logMessage } = require('../samples/check.js');


// Test generated using Keploy
test('test_logMessage_outputsExpectedMessage', () => {
  // Arrange
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  // Act

  logMessage();

  // Assert
  expect(consoleSpy).toHaveBeenCalledWith("dgkhfdgjkjkhjkfgjnkhfgjkhjkgfh");

  // Cleanup
  consoleSpy.mockRestore();
});

