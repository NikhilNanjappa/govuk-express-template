const { DateTime } = require('luxon');

module.exports = ({
  fieldName, page, options = {},
}) => (value, { req }) => {
  const {
    [`${fieldName}-day`]: day,
    [`${fieldName}-month`]: month,
    [`${fieldName}-year`]: year,
  } = req.body;

  const suffix = [];
  const missingFields = [];

  if (!day) {
    missingFields.push('day');
    suffix.push('-day');
  }

  if (!month) {
    missingFields.push('Month');
    suffix.push('-month');
  }

  if (!year) {
    missingFields.push('Year');
    suffix.push('-year');
  }

  if (suffix.length > 0) {
    if (suffix.length === 3) {
      return Promise.reject({
        message: `${page}:field.${fieldName}.validation.required`,
        suffix,
      });
    }

    if (missingFields[0] !== 'day') {
      missingFields[0] = missingFields[0].toLowerCase();
    }

    return Promise.reject({
      message: `${page}:field.${fieldName}.validation.${missingFields.join('')}Required`,
      suffix,
    });
  }

  try {
    const date = DateTime.fromObject({ year, month, day }).endOf('day');
    const todaysDate = DateTime.local().endOf('day');
    const { includeToday, pastDate, futureDate } = options;

    if (!date.isValid) {
      return Promise.reject({
        message: `${page}:field.${fieldName}.validation.invalid`,
        suffix: ['-day', '-month', '-year'],
      });
    }

    if (includeToday) {
      if (date > todaysDate && pastDate) {
        return Promise.reject({
          message: `${page}:field.${fieldName}.validation.future`,
          suffix: ['-day', '-month', '-year'],
        });
      } if (date < todaysDate && futureDate) {
        return Promise.reject({
          message: `${page}:field.${fieldName}.validation.past`,
          suffix: ['-day', '-month', '-year'],
        });
      }
    } else {
      if (date >= todaysDate && pastDate) {
        return Promise.reject({
          message: `${page}:field.${fieldName}.validation.future`,
          suffix: ['-day', '-month', '-year'],
        });
      } if (date <= todaysDate && futureDate) {
        return Promise.reject({
          message: `${page}:field.${fieldName}.validation.past`,
          suffix: ['-day', '-month', '-year'],
        });
      }
    }
  } catch (err) {
    return Promise.reject({
      message: `${page}:field.${fieldName}.validation.invalid`,
      suffix: ['-day', '-month', '-year'],
    });
  }

  if (year < 1910) {
    return Promise.reject({
      message: `${page}:field.${fieldName}.validation.before1910`,
      suffix: ['-year'],
    });
  }

  return Promise.resolve(true);
};
