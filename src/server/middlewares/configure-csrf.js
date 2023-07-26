const csurf = require('csurf');

const configureCsrf = () => {
  const options = {
    cookie: {
      sameSite: 'strict',
      httpOnly: true,
      secure: false,
    },
  };
  return csurf(options);
};

export { configureCsrf as default };
