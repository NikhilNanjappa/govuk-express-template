import session from 'express-session';

const configureSession = () => {
  const cookieMaxAge = 1800 * 1000;
  const sessionOptions = {
    secret: 'secret',
    key: 'sessionId',
    cookie: {
      maxAge: cookieMaxAge,
    },
    resave: true,
    rolling: true,
    saveUninitialized: true,
  };

  return session(sessionOptions);
};

export { configureSession as default };

