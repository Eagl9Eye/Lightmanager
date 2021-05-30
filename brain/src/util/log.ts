import winston, { format, transports, createLogger } from "winston";
const { consoleFormat } = require("winston-console-format");
const {
  errors,
  printf,
  combine,
  padLevels,
  colorize,
  timestamp,
  label,
  prettyPrint,
  align,
} = format;
const ignore = format((info) => {
  if (info.private) return false;
  return info;
});
const getLabel = (module: NodeModule) => {
  return module.filename;
};

const getOptions = (module: NodeModule) => {
  return {
    format: combine(ignore(), timestamp(), prettyPrint()),
    transports: [
      new transports.Console({
        level: process.env.NODE_ENV === "production" ? "error" : "debug",
        format: combine(
          colorize({ all: true }),
          align(),
          errors({ stack: true }),
          padLevels(),
          consoleFormat({
            showMeta: true,
            metaStrip: ["timestamp", "service"],
            inspectOptions: {
              depth: Infinity,
              colors: true,
              maxArrayLength: Infinity,
              breakLength: 120,
              compact: Infinity,
            },
          })
        ),
      }),
      new transports.File({
        filename: `../log/debug.${new Date().toISOString().split("T")[0]}.log`,
        level: "info",
        format: combine(
          label({ label: getLabel(module) }),
          printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
      }),
    ],
    exceptionHandlers: [
      new transports.File({
        filename: `../log/exceptions.${new Date().toISOString().split("T")[0]}.log`,
      }),
    ],
  };
};

const logger = createLogger(getOptions(module));

if (process.env.NODE_ENV !== "production") {
  logger.debug({
    message: "Logging initialized at debug level",
  });
}

export const logMapElements = (log: winston.Logger) => (value: any, key: any) => {
  log.debug(`m[${key}] = ${value}`);
};

export default logger;
