const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const commonError = require("./errors/commonError");
const morganMiddleware = require("./util/morganMiddleware");
const logger = require("./util/log")(module);
// routes
const indexRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(commonError);

module.exports = app;
