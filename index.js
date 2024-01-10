const express = require("express");
require("express-async-errors");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readingListRouter = require("./controllers/readinglists");
const logoutRouter = require("./controllers/logout");

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/login", loginRouter);
app.use("/api/readinglists", readingListRouter);
app.use("/api/logout", logoutRouter);

const errorHandler = (error, request, response, next) => {

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "SequelizeValidationError") {
    return response.status(401).send({ error: error.errors[0].message });
  }
  else {
    console.log(error.message);
  }
  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
