import { handleServiceResponse } from '../../lib/error-handler';

const get = async (req, res) => {
  try {
    return res.render('dashboard', {
      pageData: {
        message: 'username',
      },
    });
  } catch (err) {
    return handleServiceResponse(err, res, 'dashboard');
  }
};

export { get as default };
