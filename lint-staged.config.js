module.exports = {
  "src/**/*.js": ["npm run test:lint"],
  "src/**/*.test.js": ["npm run test:lint"],
  "package.json": [
    "npm run test:security:outdated",
    "npm run test:security:audit",
  ],
  "package-lock.json": ["npm run test:security:lockfile"],
};
