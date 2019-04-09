var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://dev.db.url',
    rootPath: rootPath,
    host: 'http://localhost:5000',
    port: 5000
    
  },
  production: {
    db: 'mongodb://prod.db.url',
    rootPath: rootPath,
    host: 'http://52.34.207.5',
    port: 5058
  }
};