const path = require('path');
const webpack = require('webpack');
const NormalModuleReplacementEnhancedPlugin = require("./NormalModuleReplacementEnhancedPlugin");

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NormalModuleReplacementEnhancedPlugin(
      /foo\.js/,
      "./extendedProject/foo.js",

    //   // (resource) => {
    //   //   /* we change for env mode here */ 
    //   //   // console.log("Function argument");
    //   //   // console.log(resource);
        
    //   //   // const filePath = resource.context.split("/") || '';

    //   //   console.log(resource.resourceResolveData.context.issuer);

    //   //   let filePath = '';
    //   //   if (resource.resourceResolveData.context && typeof resource.resourceResolveData.context.issuer === "string")
    //   //     filePath = resource.resourceResolveData.context.issuer.split("/") || '';
    //   //   else
    //   //     filePath = resource.context.split("/");

    //   //   if (!filePath.includes("extendedProject")) {
    //   //     // console.log(resource);
    //   //     // console.log('not extendedProject Folder');
    //   //     // return "./extendedProject/foo.ts";
    //   //     // return resource;
    //   //   }

    //   //   // console.log('extendedProject Folder');
    //   //   return resource;
    //   // }
    ),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
  },
};
