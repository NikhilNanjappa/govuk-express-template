const csurf = require("csurf");

const configureCsrf = () => {
  const options = {
    cookie: {
      cookie: false,
      sessionKey: "session",
    },
  };

  console.info(
    `process.env.SESSION_SECURE_COOKIE: ${process.env.SESSION_SECURE_COOKIE}`,
  );
  console.info("CSRF options: %o", options);

  return csurf(options);
};

export { configureCsrf as default };
