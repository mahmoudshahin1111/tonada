const path = require('path');

module.exports = {
  entry: './src/ts/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'tonada.js', 
    path: path.resolve(__dirname, 'dist','js'),
    library:{
      name:'Tornada',
      type:'window'
    }
  },
  
};