// figure out what credentials to set
if (process.env.NODE_ENV === "production") {
  // we are in prod
  module.exports = require("./prod");
} else {
  //  we are in Dev
  module.exports = require("./dev");
}
