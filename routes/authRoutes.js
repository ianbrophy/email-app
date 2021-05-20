//not passport.js in service
const passport = require("passport")

module.exports = (app) => {
  //# ---------- route handelers
  app.get("/", (req, res) => {
    res.send({ hi: "there!!" })
  })

  //send off to google
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  )

  //return from google
  // since there are no additional arguments (ie 'scope'),
  //    passport will not do a redirect but will make an exchange for the user profile
  // app.get("/auth/google/callback", passport.authenticate("google"))

  //add another handler with res/req inside the chain
  app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("/surveys")
  })

  // this goes through the cookie check flow
  // if the user has cookie data this route should show the data
  // a good check to see if the user is logged in
  //req is the incoming request
  //res is the outgoing response
  app.get("/api/current_user", (req, res) => {
    //immediate response
    res.send(req.user)
  })

  app.get("/api/logout", (req, res) => {
    //kill the cookie
    req.logout()

    res.redirect("/")
  })
}
