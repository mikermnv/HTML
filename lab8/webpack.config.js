const path = require("path");

module.exports = { 
 mode: 'development', 

 // entry files
    entry: './src/index.js',

    // output bundles (location)
    output: {
        filename: 'bundle.js',
        path: path.resolve( __dirname, 'dist' )
    },

resolve: {
    alias: {
        rxjs: path.resolve(__dirname, 'node_modules/rxjs'),
        'rxjs/operators': path.resolve(__dirname, 'node_modules/rxjs/operators'),
        'rxjs/ajax': path.resolve(__dirname, 'node_modules/rxjs/ajax')
      },
        extensions: [ '.ts', '.js' ],
    },

 // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src')
    },
    compress: true,
    port: 3000
  }
};
