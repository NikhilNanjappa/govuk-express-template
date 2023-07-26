import get from '../page-not-found';

describe('page-not-found Page', () => {
  it('should route page-not-found page', () => {
    const mockSpyResponse = {
      render: jest.fn(),
    };
    const req = {};
    get(req, mockSpyResponse);
    expect(mockSpyResponse.render).toHaveBeenCalledWith('page-not-found');
  });
});
