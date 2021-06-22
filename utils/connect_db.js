const mongoose = require("mongoose");

function connectDatabase() {
  mongoose
    .connect("mongodb://localhost/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
}

module.exports = connectDatabase;
