import express from 'express';

import pageNotFoundRoutes from './views/page-not-found/routes';
import problemWithServiceRoutes from './views/problem-with-service/routes';
import serviceUnavailableRoutes from './views/service-unavailable/routes';
import dashboardRoutes from './views/dashboard/routes';

const router = express.Router();

// Non-journey routes
pageNotFoundRoutes(router);
problemWithServiceRoutes(router);
serviceUnavailableRoutes(router);
dashboardRoutes(router);

export default router;
