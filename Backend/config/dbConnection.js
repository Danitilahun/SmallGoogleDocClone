const mongoose = require("mongoose");

function connectDatabase() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  });

  return mongoose.connection;
}

module.exports = connectDatabase;
