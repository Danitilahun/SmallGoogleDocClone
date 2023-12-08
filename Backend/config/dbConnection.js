const mongoose = require("mongoose");

function connectDatabase() {
  mongoose.connect(
    "mongodb+srv://progressma92:qRJHN2jJb2yEErj6@cluster0.aemyxz3.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  return mongoose.connection;
}

module.exports = connectDatabase;
