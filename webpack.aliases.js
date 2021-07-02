const path = require("path");

module.exports = (existingAliases) => ({
  ...existingAliases,
  "@hooks": path.join(__dirname, "./hooks/"),
  "@constants": path.join(__dirname, "./constants/"),
});
