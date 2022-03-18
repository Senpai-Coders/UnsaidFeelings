const mongoose = require("mongoose");

const AppOption = mongoose.Schema({
  key : { type: String, required: true }, // what kind of setting it belongs
  name : { type: String, required: true }, // name of the setting
  value : { type: mongoose.Mixed, require : true }, // value of the setting (Any Kind/DataType)
  whoAreYou : { type: String, required : true} // Who set the setting
});

module.exports = mongoose.model("AppOption", AppOption);
