const express = require("express");
const connectDatabase = require("./utils/connect_db");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

require("express-async-errors");
require("dotenv").config();

const app = express();
app.use(express.json());

// Import Routes:
// const postRoutes = require("./routes/postRoutes");

// Routes: 1.create route-> 2.create controller -> 3.import route -> 4.use route

app.use("/api/v1", require("./routes/postRoutes"));

// Error & Not-Found Url
app.all("*", notFound);
app.use(errorHandler);

connectDatabase();
app.listen(4000, () => {
  console.log(`Server started on 4000`);
});
