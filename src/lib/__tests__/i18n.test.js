import i18next from 'i18next';
import {
  loadLanguageResource,
  LanguageOptions,
  i18nUrl,
} from '../i18n';

describe('i18n', () => {
  it('should call addResourceBundle for english language with appropriate params', () => {
    i18next.addResourceBundle = jest.fn();
    const ns = 'testnamespace';
    const lang = LanguageOptions.ENGLISH;
    const resource = { title: 'en-title' };
    loadLanguageResource(lang, ns, resource);
    expect(i18next.addResourceBundle).toHaveBeenCalledWith('en', ns, resource, true, false);
  });

  describe('i18nUrl', () => {
    it('should add language on to the URL', () => {
      expect(
        i18nUrl('http://host/path', 'en'),
      ).toEqual(
        'http://host/path?lng=en',
      );

      expect(
        i18nUrl('http://host/path', 'cy'),
      ).toEqual(
        'http://host/path?lng=cy',
      );
    });

    it('should add language on to the URL params as an addition', () => {
      expect(
        i18nUrl('http://host/path?param=something', 'en'),
      ).toEqual(
        'http://host/path?param=something&lng=en',
      );
    });
  });
});
