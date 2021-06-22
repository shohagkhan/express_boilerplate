exports.isAuthenticated = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) return next("Authentication Failed");
  next();
};
