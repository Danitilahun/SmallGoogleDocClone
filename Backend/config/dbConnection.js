const mongoose = require("mongoose");

function connectDatabase() {
  mongoose.connect("", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
}

module.exports = connectDatabase;
