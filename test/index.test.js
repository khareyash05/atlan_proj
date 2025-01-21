const keys = require('../config/keys');
const dbConfig = require('../config/db');


// 	
// 	



// Test generated using Keploy

describe('Server Configuration', () => {
  it('should have the correct port configuration', () => {
    expect(keys.port).toBeDefined();
  });
});

// Test generated using Keploy
describe('Database Configuration', () => {
    it('should load the database configuration without errors', () => {

      expect(dbConfig).toBeDefined();
    });
  });

