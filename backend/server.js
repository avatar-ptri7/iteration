require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
// const app = express();
const path = require("path");
const PORT = process.env.PORT;
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const apiRouter = require("./routes/apiRoutes");

console.log("im inside server.js!!");

const app = express(), 
DIST_DIR = path.join(__dirname, '../build/'),
HTML_FILE = path.join(DIST_DIR, 'index.html');

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('src'));
app.use('/favicon.ico', express.static(__dirname + '../src/assets/favicon.ico'))

// Don't serve static files or homepage from Dev Server
// if (process.env.NODE_ENV === "production") {
//   // Serve static files
//   app.use("/", express.static(path.resolve(__dirname, "../build")));
//   // Serve index
//   app.get("/*", (req, res) =>
//     res.status(200).sendFile(path.resolve(__dirname, "../build/index.html"))
//   );
// };

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, HTML_FILE));
});


// // Routes

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, HTML_FILE));
});

// 404 Catch-All
app.use("*", (req, res) => res.status(404).send("Not Found"));

// Universal Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error.",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
