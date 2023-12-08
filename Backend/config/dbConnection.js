const mongoose = require("mongoose");

function connectDatabase() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
}

module.exports = connectDatabase;
