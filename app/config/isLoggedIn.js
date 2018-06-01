function isLoggedIn(req, res, next) {
  // console.log('Checking isLogged in:')
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    // console.log('Logged in! Going next!');
    next();
  } else {
    const err = { name: 'authError', message: `Please log in!`};
    next(err);
  }
}

export default isLoggedIn;