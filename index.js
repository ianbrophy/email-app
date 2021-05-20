const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")
const keys = require("./config/keys")

//no return, so no need to asign it
require("./models/User")
require("./services/passport")

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

//import the routes
//const authRoutes = require("./routes/authRoutes")

//create the express app
const app = express()

//use body-parser
//app.use(bodyParser.json())

//body-parser seems to be deprecated, so use this instead
app.use(express.json())

//use cookies
//30days in millisec
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
)

//tell passport to use cookies
app.use(passport.initialize())
app.use(passport.session())

////call authRoutes with the app
////not needed because off the next code portion
//authRoutes(app)

//replaces the above code
//import and call in one line
//authRoutes exports a function that is called with 'app' here
require("./routes/authRoutes")(app)
require("./routes/billingRoutes")(app)

if (process.env.NODE_ENV === "production") {
  //make sure that express will server production assets
  // ie: main.js, main.css
  app.use(express.static("client/build"))

  //express with serve index.html if it doesn't recognize a route
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(process.env.PORT || 5000)
