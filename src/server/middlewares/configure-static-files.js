import express from "express";
import favicon from "serve-favicon";

export default (app) => {
  app.use(
    "/images/favicon.ico",
    express.static(
      "node_modules/govuk-frontend/dist/govuk/assets/images/favicon.ico",
    ),
  );
  app.use(
    "/favicon.ico",
    express.static(
      "node_modules/govuk-frontend/dist/govuk/assets/images/favicon.ico",
    ),
  );
  app.use(
    favicon("node_modules/govuk-frontend/dist/govuk/assets/images/favicon.ico"),
  );
  app.use("/public", express.static("src/public/"));
  app.use(
    "/assets",
    express.static("node_modules/govuk-frontend/dist/govuk/assets/"),
  );
  app.use(
    "/govuk-frontend",
    express.static("node_modules/govuk-frontend/dist/govuk"),
  );
  app.use(/.*\/style\.css$/, express.static("dist/style.css"));
  app.use("/app.js", express.static("dist/main.bundle.js"));
  app.use(
    "/govuk-frontend/components/",
    express.static("node_modules/govuk-frontend/dist/govuk/components"),
  );
};
