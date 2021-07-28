const path = require("path");

module.exports = (existingAliases) => ({
  ...existingAliases,
  "@hooks": path.join(__dirname, "./hooks/"),
  "@utils": path.join(__dirname, "./utils/"),
});
