# govuk-express-template

## Pre-requisites

`export NODE_EXTRA_CA_CERTS=/etc/ssl/certs/zscaler.pem`

## Install dependencies

Make sure your node version is >= 22

```
npm i
```

## Set env variables

The application sets the following environment variables:

| Variable name               | Description                                                                     |
| --------------------------- | ------------------------------------------------------------------------------- |
| `PORT`                      | Application port. Defaulted to 3000                                             |
| `LOG_LEVEL`                 | What log level to output from the application. Defaulted to `info`              |
| `SESSION_SECURE_COOKIE`     | flag to specify that the cookie may only be transmitted using HTTPS connections |
| `SESSION_ENCRYPTION_SECRET` | secret used for session encryption                                              |
| `SESSION_STORE`             | location where the session is stored, file or redis                             |
| `SESSION_ID_COOKIE_NAME`    | value of the cookie that is stored in the session                               |
| `REDIS_PORT`                | redis server port                                                               |
| `REDIS_HOST`                | redis server hostname                                                           |
| `REDIS_PASSWORD`            | unique string to retrieve the corresponding data from redis database            |

## Start

You can then start the server (port 3000) by running:

```
npm run start
```

## Tests

We have the following test scripts setup on this project:

### test:lint

to ensure consistent JS code patterns

### test:style

to ensure consistent formatting/style

### test:security:audit

to ensure no vulnerabilities exists in npm packages

### test:security:lockfile

to ensure lock file follows security policies

### test:security:outdated

to check npm registry for outdated packages

### test:unit

for functional/unit testing and ensure code coverage
