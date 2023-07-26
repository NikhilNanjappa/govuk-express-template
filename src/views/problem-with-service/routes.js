import get from './problem-with-service';

export const appendRoutes = (router) => {
  router.get('/problem-with-service', get);
};

export { appendRoutes as default };
