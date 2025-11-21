import helmet from "helmet";

const configureHeaders = () => {
  const options = {
    referrerPolicy: {
      policy: "no-referrer",
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "https://*.google-analytics.com/"],
        connectSrc: ["'self'", "https://*.google-analytics.com/"],
        scriptSrc: [
          "'self'",
          "'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw='",
          "'sha256-4knFDLESmwHUzbx7TW2n50F8kKYw3C0C8Atyk8vBsZo='",
          "https://*.google-analytics.com/",
          "https://*.googletagmanager.com/",
        ],
      },
    },
  };

  return helmet(options);
};

export { configureHeaders as default };
