import get from './dashboard';

export const appendRoutes = (router) => {
  router.get('/', get);
};

export { appendRoutes as default };
