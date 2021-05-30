const morgan = require("morgan");
const logger = require("./log")(module);

const stream = { write: (msg) => logger.http(msg.slice(0, -1)) };
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

morgan.token("body", (req, res) => JSON.stringify(req.body));

const morganMiddleware = morgan(
  ":method :url :status :body :res[content-length] - :response-time ms",
  { stream, skip }
);

module.exports = morganMiddleware;
