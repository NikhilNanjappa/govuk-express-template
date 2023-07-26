const { validationResult } = require('express-validator');

const expressValidatorTester = async (req, res, middlewares) => {
  await Promise.all(middlewares.map(async (middleware) => {
    await middleware(req, res, () => undefined);
  }));
};

const transformErrors = (expressErrors = []) => {
  const errors = expressErrors.map(({ path, msg }) => ({
    fieldName: path,
    description: typeof msg === 'object' ? msg.message : msg,
    suffix: typeof msg === 'object' ? msg.suffix || '' : '',
  }));

  const fieldErrors = expressErrors.reduce((model, { path, msg }) => ({
    ...model,
    [path]: {
      fieldName: path,
      description: typeof msg === 'object' ? msg.message : msg,
      suffix: typeof msg === 'object' ? msg.suffix || '' : '',
    },
  }), {});

  const values = expressErrors.reduce((model, { path, value }) => ({
    ...model,
    [path]: {
      fieldName: path,
      value,
    },
  }), {});

  return {
    errors,
    fieldErrors,
    values,
  };
};

const postValidate = (req, res, next) => {
  const { errors = [] } = validationResult(req);

  if (errors.length) {
    req.error = transformErrors(errors);
  }

  next();
};

// model can be an array of express validator rules or a custom express middleware
// most use cases can be solved with an express validator custon rule that has access to the req
const validate = (model = []) => (typeof model === 'function'
  ? [model, postValidate]
  : [...model, postValidate]);

module.exports = {
  expressValidatorTester,
  transformErrors,
  postValidate,
  validate,
};
