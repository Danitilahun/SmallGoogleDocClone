const mongoose = require("mongoose");

function connectDatabase() {
  mongoose.connect(
    "mongodb+srv://danielT:7fXyu7qPaoEORE4e@cluster0.3vmplwh.mongodb.net/google-docs-clone?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  );

  return mongoose.connection;
}

module.exports = connectDatabase;
