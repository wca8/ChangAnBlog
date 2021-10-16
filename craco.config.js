const path = require("path");

const resolve = dir => path.resolve(__dirname, dir);
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {'@primary-color': '#FC5531'},
            javascriptEnabled: true,
          },
        },
      },
    }
  ],
  webpack: {
    alias: {
      "@": resolve("src"),
      "components": resolve("src/components"),
      "services": resolve("src/services"),
      "assets":resolve("src/assets"),
      "store":resolve("src/store"),
      "hooks":resolve("src/hooks"),
    },
  

  }
}
