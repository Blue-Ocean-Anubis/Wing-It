const mongoose = require("mongoose");
const { Schema } = mongoose;

const airportSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  state: String,
  country: {
    type: String,
    required: true,
  },
  coordinates: [
    {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
  ],
  dataAdded: {
    type: Date,
    required: true,
  },
  apiResult: {
    type: String,
    required: true,
  },
});

const Airport = mongoose.model("Airport", airportSchema);
let get = () => {
  return Airport.find({});
};

let save = (airportData) => {
  var airport = new Airport(airportData);
  return airport.save();
};

let update = (id, change) => {
  return Airport.findByIdAndUpdate(id, change).exec();
};

let deleteById = (id) => {
  return Airport.deleteOne({ _id: id }).exec();
};

exports.saveAirport = save;
exports.getAirport = get;
exports.updateAirport = update;
exports.deleteAirport = deleteById;
