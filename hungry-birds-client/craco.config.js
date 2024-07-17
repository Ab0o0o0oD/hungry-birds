// https://blog.logrocket.com/using-path-aliases-cleaner-react-typescript-imports/

const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};