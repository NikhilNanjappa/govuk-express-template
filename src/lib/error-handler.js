import configRoutes from '../config-routes';

const handleServiceResponse = (
  error, res, page, values = null, csrfToken = null, pageData = null,
) => {
  try {
    if (error.response && error.response.status === 500) {
      return res.status(500).redirect(configRoutes.serviceUnavailable);
    }

    if (error.response && error.response.status === 503) {
      if (!error.response.data) {
        return res.status(503).redirect(configRoutes.problemWithService);
      }
    }

    return res.status(error.response.status).render(page, {
      error: error.response,
      csrfToken,
      values,
      pageData,
    });
  } catch (err) {
    return res.status(503).redirect(configRoutes.problemWithService);
  }
};

module.exports = {
  handleServiceResponse
};
