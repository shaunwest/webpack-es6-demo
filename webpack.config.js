var path = require('path');

module.exports = {
    entry: {
        app: './es6/main.js'
    },
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'es6'), loader: 'babel-loader' }
        ]
    }
};
