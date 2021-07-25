const createWebpackAliases = require("./webpack.aliases");

const { NODE_ENV, CONTRACT_ADDRESS_HARDHAT, CONTRACT_ADDRESS_RINKEBY } =
  process.env;
const isDevelopment = NODE_ENV === "development";

module.exports = {
  webpack: (config, { dev }) => {
    config.resolve.alias = createWebpackAliases(config.resolve.alias);
    return config;
  },
  publicRuntimeConfig: {
    NODE_ENV,
    CONTRACT_ADDRESS: isDevelopment
      ? CONTRACT_ADDRESS_HARDHAT
      : CONTRACT_ADDRESS_RINKEBY,
  },
};
