import { Server } from "http";
import winston, { format, transports, createLogger } from "winston";
import SocketIO from "./transport/SocketIO";
const { consoleFormat } = require("winston-console-format");
const {
  errors,
  combine,
  padLevels,
  colorize,
  timestamp,
  label,
  json,
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

const getOptions = (server: Server, module: NodeModule) => {
  return {
    format: combine(ignore(), timestamp(), prettyPrint()),
    transports: [
      new SocketIO(server, { level: "silly", format: combine(json()) }),
      new transports.Console({
        handleExceptions: true,
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
        filename: `../log/debug.${new Date().getMonth()}.log`,
        level: "silly",
        format: combine(label({ label: getLabel(module) }), json()),
      }),
    ],
    exceptionHandlers: [
      new transports.File({
        filename: `../log/exceptions.${new Date().toISOString().split("T")[0]}.log`,
      }),
    ],
  };
};
const logger = (server: Server) => createLogger(getOptions(server, module));

const logMapElements = (log: winston.Logger) => (value: any, key: any) => {
  log.debug(`m[${key}] = ${value}`);
};

export { logMapElements };
export default logger;
