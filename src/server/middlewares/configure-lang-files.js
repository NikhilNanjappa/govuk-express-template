/* eslint-disable global-require,import/no-dynamic-require */
import glob from 'glob';
import { loadLanguageResource, LanguageOptions } from '../../lib/i18n';

const configureLangFiles = () => {
  glob.sync('src/**/locales/**/*.en.json')
    .map((filePath) => {
      const splittedFilePath = filePath.split('/');
      const fileName = splittedFilePath[splittedFilePath.length - 1];
      const namespace = fileName.split('.')[0];
      return { namespace, filePath };
    })
    .forEach(({ namespace, filePath }) => {
      const enResource = require(`../../../${filePath}`);
      loadLanguageResource(LanguageOptions.ENGLISH, namespace, enResource);
    });
};

export { configureLangFiles as default };
