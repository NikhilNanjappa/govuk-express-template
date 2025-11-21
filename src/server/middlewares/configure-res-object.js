import configRoutes from "../../config-routes";

const getRedirectPath = (route, params) => {
  return params ? configRoutes[route](params) : configRoutes[route];
};

module.exports = (app) => {
  app.use((req, res, next) => {
    res.redirectAllowedPath = (route, params) => {
      const allowList = Object.keys(configRoutes);
      if (allowList.includes(route)) {
        const redirectPath = getRedirectPath(route, params);
        return res.redirect(redirectPath);
      }
      throw new Error("Redirect path not recognised");
    };

    next();
  });
};
