import path from 'path';

const webpackConfig = {
  entry: path.join(__dirname, '/src/index.ts'),

  externals: ['mongodb-client-encryption'],

  // Automatically sets the NODE_ENV to production as well.
  mode: 'production',

  module: {
    rules: [{ loader: 'ts-loader', test: /\.ts$/ }]
  },

  // Outputs the file to dist/index.js.
  output: { filename: 'index.js', path: path.join(__dirname, '/dist') },

  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  target: 'node'
};

export default webpackConfig;
