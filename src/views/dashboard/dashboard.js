import { handleServiceResponse } from '../../lib/error-handler';
import { buildPagination } from '../../lib/pagination';

const get = async (req, res) => {
  try {
    return res.render('dashboard', {
      pageData: {
        message: 'username',
        // pagination: buildPagination(req, URLS.dashboard.split('?')[0])
      },
    });
  } catch (err) {
    return handleServiceResponse(err, res, 'dashboard');
  }
};

export { get as default };
