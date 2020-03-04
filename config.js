const path = require('path');

const rootPath = __dirname;

module.exports = {
  port: 8080,
  rootPath,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
};