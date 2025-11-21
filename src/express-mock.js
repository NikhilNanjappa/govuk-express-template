const expressMock = () => {
  const mocks = {
    res: {
      locals: {},
      attachment: jest.fn(),
      header: jest.fn(),
      render: jest.fn(),
      redirect: jest.fn(),
      redirectAllowedPath: jest.fn(),
      send: jest.fn(),
      set: jest.fn(),
      setHeader: jest.fn(),
      end: jest.fn(),
    },
    req: {
      body: {},
      params: {},
      query: {},
      session: {
        destroy: jest.fn(),
      },
      getDataForPage: jest.fn(),
      setDataForPage: jest.fn(),
      saveAndRedirect: jest.fn(),
      clearDataForPage: jest.fn(),
      csrfToken: jest.fn().mockReturnValue("mock_csrf"),
      get: jest.fn(),
      t: jest.fn().mockReturnValue("mock_translated"),
    },
    next: jest.fn(),
  };

  mocks.res.status = jest.fn().mockReturnValue(mocks.res);
  mocks.res.cookie = jest.fn().mockReturnValue(mocks.res);
  mocks.res.clearCookie = jest.fn().mockReturnValue(mocks.res);

  return mocks;
};

module.exports = expressMock;
