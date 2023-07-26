const { body } = require('express-validator');
const { validate } = require('../../middlewares/formValidator/index');
const dateValidator = require('../date-validator');
const expressMock = require('../../express-mock');

const mockSchema = body('findCase').not().isEmpty().withMessage('Mock validation text');

describe('Middleware to validate forms', () => {
  const { req, res, next } = expressMock();

  afterEach(() => {
    req.body = {};
    res.render.mockReset();
    next.mockReset();
  });

  it('If validation passes -> errors attached to the request', () => {
    req.body.findCase = undefined;

    validate(mockSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error).toBe(undefined);
  });

  it('If validation fails -> no errors attached to the request', () => {
    req.body.findCase = 'mock_value';

    validate(mockSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error.errors).toStrictEqual([{
      description: 'Mock validation text',
      fieldName: 'findCase',
      suffix: '',
    }]);
  });
});

describe('dateValidator', () => {
  const { req, res, next } = expressMock();
  const mockDateSchema = [body('regDate').custom(dateValidator({ fieldName: 'regDate', page: 'test' }))];

  afterEach(() => {
    delete req.error;
    req.body = {};
    res.render.mockReset();
    next.mockReset();
  });

  it('If day field is missing', () => {
    req.body = {
      'regDate-day': '',
      'regDate-month': '3',
      'regDate-year': '2022',
    };

    validate(mockDateSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error).toStrictEqual(undefined);
  });

  it('If month field is missing', () => {
    req.body = {
      'regDate-day': '11',
      'regDate-month': '',
      'regDate-year': '2022',
    };

    validate(mockDateSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error).toStrictEqual({
      errors: [
        { description: 'test:field.regDate.validation.dayRequired', fieldName: 'regDate', suffix: ['-day'] },
      ],
      fieldErrors: {
        regDate: { description: 'test:field.regDate.validation.dayRequired', fieldName: 'regDate', suffix: ['-day'] },
      },
      values: { regDate: { fieldName: 'regDate', value: undefined } },
    });
  });

  it('If year field is missing', () => {
    req.body = {
      'regDate-day': '11',
      'regDate-month': '2',
      'regDate-year': '',
    };

    validate(mockDateSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error).toStrictEqual({
      errors: [
        { description: 'test:field.regDate.validation.dayRequired', fieldName: 'regDate', suffix: ['-day'] },
        { description: 'test:field.regDate.validation.monthRequired', fieldName: 'regDate', suffix: ['-month'] },
      ],
      fieldErrors: {
        regDate: { description: 'test:field.regDate.validation.monthRequired', fieldName: 'regDate', suffix: ['-month'] },
      },
      values: { regDate: { fieldName: 'regDate', value: undefined } },
    });
  });

  it('If day & month field is missing', () => {
    req.body = {
      'regDate-day': '',
      'regDate-month': '',
      'regDate-year': '2022',
    };

    validate(mockDateSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error).toStrictEqual({
      errors: [
        { description: 'test:field.regDate.validation.dayRequired', fieldName: 'regDate', suffix: ['-day'] },
        { description: 'test:field.regDate.validation.monthRequired', fieldName: 'regDate', suffix: ['-month'] },
        { description: 'test:field.regDate.validation.yearRequired', fieldName: 'regDate', suffix: ['-year'] },
      ],
      fieldErrors: {
        regDate: { description: 'test:field.regDate.validation.yearRequired', fieldName: 'regDate', suffix: ['-year'] },
      },
      values: { regDate: { fieldName: 'regDate', value: undefined } },
    });
  });

  it('If month & year field is missing', () => {
    req.body = {
      'regDate-day': '11',
      'regDate-month': '',
      'regDate-year': '',
    };

    validate(mockDateSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error).toStrictEqual({
      errors: [
        { description: 'test:field.regDate.validation.dayRequired', fieldName: 'regDate', suffix: ['-day'] },
        { description: 'test:field.regDate.validation.monthRequired', fieldName: 'regDate', suffix: ['-month'] },
        { description: 'test:field.regDate.validation.yearRequired', fieldName: 'regDate', suffix: ['-year'] },
        { description: 'test:field.regDate.validation.dayMonthRequired', fieldName: 'regDate', suffix: ['-day', '-month'] },
      ],
      fieldErrors: {
        regDate: { description: 'test:field.regDate.validation.dayMonthRequired', fieldName: 'regDate', suffix: ['-day', '-month'] },
      },
      values: { regDate: { fieldName: 'regDate', value: undefined } },
    });
  });

  it('If day & year field is missing', () => {
    req.body = {
      'regDate-day': '',
      'regDate-month': '3',
      'regDate-year': '',
    };

    validate(mockDateSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error).toStrictEqual({
      errors: [
        { description: 'test:field.regDate.validation.dayRequired', fieldName: 'regDate', suffix: ['-day'] },
        { description: 'test:field.regDate.validation.monthRequired', fieldName: 'regDate', suffix: ['-month'] },
        { description: 'test:field.regDate.validation.yearRequired', fieldName: 'regDate', suffix: ['-year'] },
        { description: 'test:field.regDate.validation.dayMonthRequired', fieldName: 'regDate', suffix: ['-day', '-month'] },
        { description: 'test:field.regDate.validation.monthYearRequired', fieldName: 'regDate', suffix: ['-month', '-year'] },
      ],
      fieldErrors: {
        regDate: { description: 'test:field.regDate.validation.monthYearRequired', fieldName: 'regDate', suffix: ['-month', '-year'] },
      },
      values: { regDate: { fieldName: 'regDate', value: undefined } },
    });
  });

  it('If day, month & year field is missing', () => {
    req.body = {
      'regDate-day': '',
      'regDate-month': '',
      'regDate-year': '',
    };

    validate(mockDateSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error).toStrictEqual({
      errors: [
        { description: 'test:field.regDate.validation.dayRequired', fieldName: 'regDate', suffix: ['-day'] },
        { description: 'test:field.regDate.validation.monthRequired', fieldName: 'regDate', suffix: ['-month'] },
        { description: 'test:field.regDate.validation.yearRequired', fieldName: 'regDate', suffix: ['-year'] },
        { description: 'test:field.regDate.validation.dayMonthRequired', fieldName: 'regDate', suffix: ['-day', '-month'] },
        { description: 'test:field.regDate.validation.monthYearRequired', fieldName: 'regDate', suffix: ['-month', '-year'] },
        { description: 'test:field.regDate.validation.dayYearRequired', fieldName: 'regDate', suffix: ['-day', '-year'] },
      ],
      fieldErrors: {
        regDate: { description: 'test:field.regDate.validation.dayYearRequired', fieldName: 'regDate', suffix: ['-day', '-year'] },
      },
      values: { regDate: { fieldName: 'regDate', value: undefined } },
    });
  });

  it('If invalid date is passed', () => {
    req.body = {
      'regDate-day': '11',
      'regDate-month': '14',
      'regDate-year': '2022',
    };

    validate(mockDateSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error).toStrictEqual({
      errors: [
        { description: 'test:field.regDate.validation.dayRequired', fieldName: 'regDate', suffix: ['-day'] },
        { description: 'test:field.regDate.validation.monthRequired', fieldName: 'regDate', suffix: ['-month'] },
        { description: 'test:field.regDate.validation.yearRequired', fieldName: 'regDate', suffix: ['-year'] },
        { description: 'test:field.regDate.validation.dayMonthRequired', fieldName: 'regDate', suffix: ['-day', '-month'] },
        { description: 'test:field.regDate.validation.monthYearRequired', fieldName: 'regDate', suffix: ['-month', '-year'] },
        { description: 'test:field.regDate.validation.dayYearRequired', fieldName: 'regDate', suffix: ['-day', '-year'] },
        { description: 'test:field.regDate.validation.required', fieldName: 'regDate', suffix: ['-day', '-month', '-year'] },
      ],
      fieldErrors: {
        regDate: { description: 'test:field.regDate.validation.required', fieldName: 'regDate', suffix: ['-day', '-month', '-year'] },
      },
      values: { regDate: { fieldName: 'regDate', value: undefined } },
    });
  });

  it('If no errors with date', () => {
    req.body = {
      'regDate-day': '11',
      'regDate-month': '3',
      'regDate-year': '2022',
    };

    validate(mockDateSchema).forEach((middleware) => middleware(req, res, next));
    expect(req.error).toStrictEqual({
      errors: [
        { description: 'test:field.regDate.validation.dayRequired', fieldName: 'regDate', suffix: ['-day'] },
        { description: 'test:field.regDate.validation.monthRequired', fieldName: 'regDate', suffix: ['-month'] },
        { description: 'test:field.regDate.validation.yearRequired', fieldName: 'regDate', suffix: ['-year'] },
        { description: 'test:field.regDate.validation.dayMonthRequired', fieldName: 'regDate', suffix: ['-day', '-month'] },
        { description: 'test:field.regDate.validation.monthYearRequired', fieldName: 'regDate', suffix: ['-month', '-year'] },
        { description: 'test:field.regDate.validation.dayYearRequired', fieldName: 'regDate', suffix: ['-day', '-year'] },
        { description: 'test:field.regDate.validation.required', fieldName: 'regDate', suffix: ['-day', '-month', '-year'] },
        { description: 'test:field.regDate.validation.invalid', fieldName: 'regDate', suffix: ['-day', '-month', '-year'] },
      ],
      fieldErrors: {
        regDate: { description: 'test:field.regDate.validation.invalid', fieldName: 'regDate', suffix: ['-day', '-month', '-year'] },
      },
      values: { regDate: { fieldName: 'regDate', value: undefined } },
    });
  });
});
