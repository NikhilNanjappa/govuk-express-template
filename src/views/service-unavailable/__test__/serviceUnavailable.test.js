import get from '../serviceUnavailable';

describe('service-unavailable Page', () => {
  it('should route service-unavailable page', () => {
    const mockSpyResponse = {
      render: jest.fn(),
    };
    const req = {
      session: {
        customer: {},
      },
    };
    get(req, mockSpyResponse);
    expect(mockSpyResponse.render).toHaveBeenCalledWith('service-unavailable');
  });
});
