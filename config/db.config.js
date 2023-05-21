const mongoose = require("mongoose");
const url =
  "mongodb+srv://vaniaskirana:skripsi99@skripsi-vania.u2gvaen.mongodb.net";

async function connect() {
  //   consol.log("lala");

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log("database udah connect niii");
  } catch (error) {
    console.log(error);
  }
}

const db = connect();

module.exports = db;
