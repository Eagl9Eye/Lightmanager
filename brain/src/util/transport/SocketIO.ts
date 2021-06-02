import { Server } from "http";
import { Socket } from "socket.io";
import Transport from "winston-transport";
import { logger } from "../../index";

class SocketIO extends Transport {
  private io: Socket;
  constructor(server: Server, opts: Transport.TransportStreamOptions) {
    super(opts);
    const options = {
      from: getLastMonth(),
      fields: ["message", "level", "timestamp"],
    };
    this.io = require("socket.io")(server);
    this.io.on("connection", (socket) => {
      logger.silly("Log-Session established");
      logger.query(options, function (err, results) {
        if (err) {
          throw err;
        }
        socket.emit("log", results);
      });
      socket.on("disconnect", () => {
        logger.silly("Log-Session closed");
      });
    });
  }
  log(info: any, next: () => void) {
    setImmediate(() => {
      this.emit("logged", info);
    });
    this.io.emit("log", {
      message: info.message,
      level: info.level,
      timestamp: info.timestamp,
    });
    next();
  }
}

const getLastMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
};

export default SocketIO;
