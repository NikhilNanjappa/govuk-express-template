// mock env variables for unit tests

process.env.PORT = "3400";
process.env.LOG_LEVEL = "info";

process.env.SESSION_STORE = "file";
process.env.SESSION_ID_COOKIE_NAME = "govuk-express-template";
process.env.SESSION_ENCRYPTION_SECRET = "secret";
process.env.SESSION_SECURE_COOKIE = "secret";

process.env.REDIS_PORT = "n/a";
process.env.REDIS_HOST = "n/a";
process.env.REDIS_KEY = "n/a";
