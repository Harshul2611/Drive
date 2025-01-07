const mongoose = require("mongoose");
const { connect } = mongoose;

function connectToDB() {
  connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database conected");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectToDB;
