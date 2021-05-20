const keys = require("../config/keys")
const stripe = require("stripe")(keys.stripeSecretKey)
const requireLogin = require("../middlewares/requireLogin")

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // //v1 with no middleware
    // //if no user is logged in
    // // passport did not find a user based on the cookie or login info
    // if (!req.user) {
    //   //401 = forbidden
    //   // .send an error message
    //   return res.status(401).send({ error: "You must log in!" })
    // }

    //stripe
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    })
    //when done, go back to the dashboard
    //res.redirect("/surveys")

    //add 5 credits
    //save the new values to the db
    //return the updated user model from the db to make sure that we have the most recent version
    req.user.credits += 5
    const user = await req.user.save()

    //respond to the request with the user
    res.send(user)
  })
}
