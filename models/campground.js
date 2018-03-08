var mongoose = require("mongoose");

var camgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Campground", camgroundSchema);