const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPlugin
} = require("customize-cra");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

const addImageMinPlugin = config => {
  config.plugins.push(
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== "production", // Disable during development
      pngquant: {
        quality: "95-100"
      }
    })
  );
  return config;
};

module.exports = override(
  addBabelPlugin(["babel-plugin-styled-components", { displayName: true }]),
  fixBabelImports("antd", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  fixBabelImports("react-use", {
    libraryName: "react-use",
    libraryDirectory: "lib",
    camel2DashComponentName: false
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "font-family": "Montserrat"
    }
  }),
  addImageMinPlugin
  // addBundleVisualizer()
);
