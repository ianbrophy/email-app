const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const mongoose = require("mongoose")
const keys = require("../config/keys")

//since User is loaded before passport in index,
// passport can make use of the users model from User
const User = mongoose.model("users")

//put the user into a cookie
passport.serializeUser((user, done) => {
  // the id in the user's record, not the user's googleId
  done(null, user.id)
})

//turn user id into a user using the cookie data
passport.deserializeUser((id, done) => {
  //User is the model, 'user' is what was found
  User.findById(id).then((user) => {
    //call done with the user that was found
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      //       console.log("accessToken: ", accessToken)
      //       console.log("refreshToken: ", refreshToken)
      //       console.log("acceprofilessToken: ", profile)

      //check for the user in the collection
      // existingUser will be a mongo record (mongoose model instance) if found
      // or null if not found
      // call 'done()' once the desired logic is complete
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //user found
          // call done(a,b)
          //a = an error object
          //b = user record
          done(null, existingUser)
        } else {
          //not found, make a new one
          //add the user
          new User({
            googleId: profile.id,
          })
            .save()
            .then((user) => {
              done(null, profile.id)
            })
        }
      })
    }
  )
)
