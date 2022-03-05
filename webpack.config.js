const path = require('path');

module.exports = {
	entry: './hooks/index.js',
	output: {
		path: path.resolve(__dirname),
		filename: 'index.js'
	}
};
