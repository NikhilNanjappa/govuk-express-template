const expressMock = require('../../express-mock');
const handleServiceResponse = require('../handle-service-response');

describe('handleServiceResponse', () => {
  const { res } = expressMock();
  it('Redirect to Services Unavailabe Page when status is 500', async () => {
    const expected = '/service-unavailable';
    const mockError = {
      response: { status: 500 },
    };
    handleServiceResponse(mockError, res, 'abcd');
    expect(res.redirect).toHaveBeenCalledWith(expected);
  });

  it('Redirect to Problem with service page when status is 503', async () => {
    const expected = '/problem-with-service';
    const mockError = {
      response: { status: 503 },
    };
    handleServiceResponse(mockError, res, 'abcd');
    expect(res.redirect).toHaveBeenCalledWith(expected);
  });

  it('By default should render with errors', async () => {
    const mockError = {
      response: {
        status: 404,
        error: { data: 'mock_error' },
      },
    };
    handleServiceResponse(mockError, res, 'abcd', { hello: 'abc' }, 'mock_csrf', {});
    const expectedFormErrors = [{ description: 'Unknown error [object Object]' }];
    expect(res.render).toHaveBeenCalledWith('abcd', {
      error: { errors: expectedFormErrors, fieldErrors: {} },
      csrfToken: 'mock_csrf',
      values: { hello: 'abc' },
      pageData: {},
    });
  });

  it('Redirect to Problem with service page when exception is thrown', async () => {
    const expected = '/problem-with-service';
    handleServiceResponse(null, res, 'abcd');
    expect(res.redirect).toHaveBeenCalledWith(expected);
  });

  it('If 404 EMAIL_NOT_FOUND -> return correct form error', async () => {
    const mockError = {
      response: {
        status: 404,
        data: '404 EMAIL_NOT_FOUND',
      },
    };
    handleServiceResponse(mockError, res, 'abcd', { hello: 'abc' }, 'mock_csrf', {});
    const expectedFormErrors = [{ description: 'login:validation.emailNotFound' }];
    expect(res.render).toHaveBeenCalledWith('abcd', {
      error: { errors: expectedFormErrors, fieldErrors: {} },
      csrfToken: 'mock_csrf',
      values: { hello: 'abc' },
      pageData: {},
    });
  });

  it('If 403 BAD_LOGIN_STATE -> return correct form error', async () => {
    const mockError = {
      response: {
        status: 404,
        data: '403 BAD_LOGIN_STATE',
      },
    };
    handleServiceResponse(mockError, res, 'abcd', { hello: 'abc' }, 'mock_csrf', {});
    const expectedFormErrors = [{ description: 'login:validation.badLoginState' }];
    expect(res.render).toHaveBeenCalledWith('abcd', {
      error: { errors: expectedFormErrors, fieldErrors: {} },
      csrfToken: 'mock_csrf',
      values: { hello: 'abc' },
      pageData: {},
    });
  });

  it('If 403 BAD_PASSWORD -> return correct form error', async () => {
    const mockError = {
      response: {
        status: 404,
        data: '403 BAD_PASSWORD',
      },
    };
    handleServiceResponse(mockError, res, 'abcd', { hello: 'abc' }, 'mock_csrf', {});
    const expectedFormErrors = [{ description: 'login:validation.badPassword' }];
    expect(res.render).toHaveBeenCalledWith('abcd', {
      error: { errors: expectedFormErrors, fieldErrors: {} },
      csrfToken: 'mock_csrf',
      values: { hello: 'abc' },
      pageData: {},
    });
  });

  it('If 403 ACCOUNT_LOCKED -> return correct form error', async () => {
    const mockError = {
      response: {
        status: 404,
        data: '403 ACCOUNT_LOCKED',
      },
    };
    handleServiceResponse(mockError, res, 'abcd', { hello: 'abc' }, 'mock_csrf', {});
    const expectedFormErrors = [{ description: 'login:validation.accountLocked' }];
    expect(res.render).toHaveBeenCalledWith('abcd', {
      error: { errors: expectedFormErrors, fieldErrors: {} },
      csrfToken: 'mock_csrf',
      values: { hello: 'abc' },
      pageData: {},
    });
  });
});
