const mongoose = require("mongoose")
//const Schema = mongoose.Schema
//-->
const { Schema } = mongoose

//this describes what a user record will look like
//add more props at any time without issue
const userSchema = new Schema({
  googleId: String,
})

//create a model with a 'name' and schema
//if this collection exists, mongoose won't delete it or overwrite it
mongoose.model("users", userSchema)
