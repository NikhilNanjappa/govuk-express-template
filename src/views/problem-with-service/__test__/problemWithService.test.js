import get from '../problemWithService';

describe('problem-with-service Page', () => {
  it('should route problem-with-service page', () => {
    const mockSpyResponse = {
      render: jest.fn(),
    };
    const req = {
      session: {
        customer: {},
      },
    };
    get(req, mockSpyResponse);
    expect(mockSpyResponse.render).toHaveBeenCalledWith(
      'problem-with-service',
    );
  });
});
