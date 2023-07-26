const configureCsrf = require('../configure-csrf');
const csurf = require('csurf');
jest.mock('csurf');

describe('Middleware -> configureCsrf', () => {
  it('should set cookie correctly', () => {
    configureCsrf(req, res, next);

    expect(csurf).toHaveBeenCalledWith({
      cookie: {
        sameSite: 'strict',
        httpOnly: true,
        secure: false,
      },
    });
  });
});
