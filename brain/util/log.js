const { format, transports, createLogger } = require("winston");
const { combine, padLevels, colorize, timestamp, label, prettyPrint, json } =
  format;
const { consoleFormat } = require("winston-console-format");
const ignore = format((info, opts) => {
  if (info.private) {
    return false;
  }
  return info;
});
const getLabel = (module) => {
  return module.filename;
};

const getOptions = (module) => {
  return {
    format: combine(ignore(), timestamp(), prettyPrint(), json()),
    transports: [
      new transports.Console({
        level: process.env.NODE_ENV === "production" ? "error" : "debug",
        format: combine(
          colorize({ all: true }),
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
        format: combine(label({ label: getLabel(module) }), json()),
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

const logger = (module) => {
  return createLogger(getOptions(module));
};

if (process.env.NODE_ENV !== "production") {
  logger(module).debug({
    message: "Logging initialized at debug level",
  });
}

module.exports = logger;
