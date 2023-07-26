module.exports = (app) => {
  app.use((req, res, next) => {
    req.getDataForPage = (page, defaultValue) => (req.session?.pageData || {})[page]
      || defaultValue;

    req.setDataForPage = (page = '', obj = {}) => {
      req.session.pageData = {
        ...(req.session.pageData || {}),
        [page]: obj,
      };
    };

    req.clearDataForPage = (page = '') => {
      delete (req.session?.pageData || {})[page];
    };

    req.saveAndRedirect = (route) => {
      req.session.save((err) => {
        if (err) {
          next(err);
        }
        res.redirect(route);
      });
    };

    next();
  });
};
