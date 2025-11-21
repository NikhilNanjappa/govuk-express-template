import expressSession from "express-session";
import { createClient } from "redis";
import path from "path";
import RedisStore from "connect-redis";
import FileStore from "session-file-store";

let sessionStore;
const sessionTtl = 3600;

const configureSession = () => {
  if (process.env.SESSION_STORE === "file") {
    console.info("Using file storage for sessions");
    sessionStore = new FileStore(expressSession)({
      encrypt: true,
      path: path.resolve(__dirname, "..", "..", "..", "sessions"),
      secret: process.env.SESSION_ENCRYPTION_SECRET,
      ttl: sessionTtl,
    });
  } else {
    const redisClient = createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST,
      {
        auth_pass: process.env.REDIS_PASSWORD,
        tls: {
          servername: process.env.REDIS_HOST,
        },
        retry_strategy: (options) => {
          const maxAttempts = 3;

          if (options.error === "ECONNREFUSED") {
            console.error("Redis host refused the connection");
            return undefined;
          }

          if (options.attempt > maxAttempts) {
            console.error(
              `Failed connecting to redis host after ${maxAttempts} attempts`,
            );
            return undefined;
          }

          return Math.min(options.attempt * 100, 3000);
        },
      },
    );

    sessionStore = new RedisStore({
      client: redisClient,
      prefix: "session:",
      ttl: sessionTtl,
    });

    redisClient.on("ready", () => {
      console.info(`Connected to redis at ${process.env.REDIS_HOST}`);
    });

    redisClient.on("reconnecting", () => {
      console.info(
        `Attempting to reconnect to redis at ${process.env.REDIS_HOST}`,
      );
    });

    redisClient.on("end", () => {
      console.info("Closed connection to redis");
    });

    redisClient.on("warning", (message) => {
      console.warn(message);
    });

    redisClient.on("error", (error) => {
      console.error(error.message);
      console.error(error.stack);
      process.exit(1);
    });
  }

  return expressSession({
    name: process.env.SESSION_ID_COOKIE_NAME,
    secret: process.env.SESSION_ENCRYPTION_SECRET,
    store: sessionStore,
    ttl: sessionTtl,
    resave: false,
    cookie: {
      secure: process.env.SESSION_SECURE_COOKIE === "true",
      httpOnly: true,
      path: "/",
      maxAge: null,
      sameSite: "Strict",
    },
    saveUninitialized: false,
    unset: "destroy",
  });
};

export { configureSession as default };
