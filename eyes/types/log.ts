interface LoggingResponse {
  message: string;
  level: LevelType;
  timestamp: string;
}

interface ListLoggingResponse {
  file: LoggingResponse[];
}

enum Level {
  error = "error",
  warn = "warn",
  info = "info",
  http = "http",
  verbose = "verbose",
  debug = "debug",
  silly = "silly",
}
type LevelType = keyof typeof Level;

export { LoggingResponse, ListLoggingResponse, Level, LevelType };
