import configureLocals from '../configure-locals';

const expressMock = require('../../../express-mock');

const { req, res, next } = expressMock();

describe('Middleware -> configureLocals', () => {
  req.originalUrl = '/mock_url';
  req.session = { exampleSessionA: 'mock' };

  it('should store data in res.locals correctly', () => {
    configureLocals(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.locals).toEqual({
      currentPageUrl: '/mock_url',
      inEditMode: false,
      csrfToken: 'mock_csrf',
      session: {
        exampleSessionA: 'mock',
      },
    });
  });
});
