import { format, transports, createLogger } from "winston";
const { consoleFormat } = require("winston-console-format");
const {
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
        level: "debug",
        format: combine(
          label({ label: getLabel(module) }),
          printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
      }),
    ],
    exceptionHandlers: [
      new transports.File({
        filename: `../log/exceptions.${
          new Date().toISOString().split("T")[0]
        }.log`,
      }),
    ],
  };
};

const logger = (module: NodeModule) => {
  return createLogger(getOptions(module));
};

if (process.env.NODE_ENV !== "production") {
  logger(module).debug({
    message: "Logging initialized at debug level",
  });
}

export default logger;
