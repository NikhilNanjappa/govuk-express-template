import get from '../dashboard';
import { handleServiceResponse } from '../../../lib/error-handler';
import expressMock from '../../../express-mock';

jest.mock('../../../../lib/error-handling');

describe('dashboard page', () => {
  const { req, res } = expressMock();

  it('should render correctly', async () => {
    await get(req, res);

    expect(res.render).toHaveBeenCalledWith('dashboard', {
      pageData: {
        message: 'Welcome, User',
      },
    });
  });

  it('should handle error', async () => {
    res.render.mockImplementation(() => {
      throw new Error('error');
    });

    await get(req, res);

    expect(handleServiceResponse).toHaveBeenCalled();
  });
});
