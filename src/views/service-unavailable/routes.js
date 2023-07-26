import get from './service-unavailable';

export const appendRoutes = (router) => {
  router.get('/service-unavailable', get);
};

export { appendRoutes as default };
