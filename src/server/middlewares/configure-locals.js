export default (req, res, next) => {
  res.locals.currentPageUrl = req.originalUrl;
  res.locals.csrfToken = req.csrfToken();
  res.locals.session = req.session || {};

  next();
};
