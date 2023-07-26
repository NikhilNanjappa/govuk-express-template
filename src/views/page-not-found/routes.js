import get from './page-not-found';

export const appendRoutes = (router) => {
  router.get('/page-not-found', get);
};

export { appendRoutes as default };
