//determine whether or not it is a prod or dev env
if (process.env.NODE_ENV === "production") {
  //we are in prod
  module.exports = require("./prod")
} else {
  //we are in dev
  //export and require in dev.js at the same time
  module.exports = require("./dev")
}
