import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import configureI18n from './middlewares/configure-i18n';
import configureHeaders from './middlewares/configure-headers';
import configureLocals from './middlewares/configure-locals';
import configureStaticFiles from './middlewares/configure-static-files';
import configureReqObj from './middlewares/configure-req-object';
import configureSession from './middlewares/configure-session';
import configureLangFiles from './middlewares/configure-lang-files';
import configureCsrf from './middlewares/configure-csrf';
import configureNunjucks from './middlewares/configure-nunjucks';

import configRoutes from '../config-routes';
import viewsRoutes from '../routes';
import serverRoutes from './routes';

const app = express();
app.set('trust proxy', 1);
app.set('port', process.env.PORT || '3000');

app.use(configureI18n());
app.use(configureSession());
app.use(cookieParser());
app.use(cors());
app.use(configureHeaders());
app.use(express.urlencoded({ extended: true }));

configureLangFiles();
configureStaticFiles(app);
configureNunjucks(app);
configureReqObj(app);

// Mounting non-csrf routes
app.use('/', serverRoutes);

// Setup other middlewares
app.use(configureCsrf());
app.use(configureLocals);

// Routes
app.use('/', viewsRoutes);
app.all('*', (req, res) => res.redirect(configRoutes.pageNotFound));

module.exports = app;
