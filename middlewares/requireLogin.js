// 'next' is a func to be called after this middleware is done
// similar to 'done' in passport
module.exports = (req, res, next) => {
  //if no user is logged in
  // passport did not find a user based on the cookie or login info
  if (!req.user) {
    //401 = forbidden
    // .send an error message
    return res.status(401).send({ error: "You must log in!" })
  }

  //on success, do the next function/route/middleware
  next()
}
