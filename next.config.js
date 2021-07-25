const createWebpackAliases = require("./webpack.aliases");

const { NODE_ENV, CONTRACT_ADDRESS_HARDHAT, CONTRACT_ADDRESS_RINKEBY } =
  process.env;

module.exports = {
  webpack: (config, { dev }) => {
    config.resolve.alias = createWebpackAliases(config.resolve.alias);
    return config;
  },
  publicRuntimeConfig: {
    NODE_ENV,
    CONTRACT_ADDRESS_HARDHAT,
    CONTRACT_ADDRESS_RINKEBY,
  },
};
