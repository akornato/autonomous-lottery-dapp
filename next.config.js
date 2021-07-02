const createWebpackAliases = require("./webpack.aliases");

module.exports = {
  webpack: (config, { dev }) => {
    config.resolve.alias = createWebpackAliases(config.resolve.alias);
    return config;
  },
};
