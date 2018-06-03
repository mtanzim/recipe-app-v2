function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    const err = { name: 'authError', message: `Please log in!`};
    next(err);
  }
}

export default isLoggedIn;