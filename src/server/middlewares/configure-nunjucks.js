import fs from 'fs';
import { configure, render } from 'nunjucks';
import configRoutes from '../../config-routes';

// FILTERS
const addNunjucksFilters = (env) => {
  env.addGlobal('routes', configRoutes);
  env.addGlobal('joinarrays', (array1, array2) => array1.concat(array2));
};

// SETUP
const readDirectory = (dir = null) => {
  const rootDir = 'src/views';
  const workingDir = dir ? `${rootDir}/${dir}` : rootDir;
  return fs.readdirSync(workingDir, {
    withFileTypes: true,
  });
};

const parseDirectories = (appViews, name = null) => {
  const dirContents = readDirectory(name);
  const rootDir = 'src/views';

  // include top level views
  appViews.push(`${rootDir}/${name}/`);

  dirContents.forEach((item) => {
    if (!item.isDirectory()) {
      return;
    }
    appViews.push(`${rootDir}/${name}/${item.name}/`);

    const nextDir = name ? `${name}/${item.name}` : item.name;

    parseDirectories(appViews, nextDir);
  });
};

const getViews = () => {
  const appViews = [
    'src/views/',
    'src/views/layout.njk',
    'node_modules/govuk-frontend/govuk/',
    'node_modules/govuk-frontend/govuk/components/',
  ];

  const dirContents = readDirectory();
  dirContents
    .map((viewsDir) => viewsDir.name)
    .filter((dirName) => !dirName.includes('.njk'))
    .forEach((viewsDir) => parseDirectories(appViews, viewsDir));

  return appViews;
};

const configureNunjucks = (app) => {
  const nunjucksConfig = {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true,
  };

  const nunjucksAppEnv = configure(getViews(), nunjucksConfig);
  app.set('view engine', 'njk');
  app.engine('njk', render);

  addNunjucksFilters(nunjucksAppEnv);
};

export { configureNunjucks as default };
