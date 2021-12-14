const mongoose = require("mongoose");
const { Schema } = mongoose;

const rentalSchema = new Schema({
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
  dateAdded: {
    type: Date,
    required: true,
  },
  apiResult: {
    type: String,
    required: true,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);
let get = (query) => {
  query = query ? query : {};
  return Rental.findOne(query);
};

let save = (rentalData) => {
  var rental = new Rental(rentalData);
  return rental.save();
};

let update = (id, change) => {
  return Rental.findByIdAndUpdate(id, change).exec();
};

let deleteById = (id) => {
  return Rental.deleteOne({ _id: id }).exec();
};

exports.saveRental = save;
exports.getRental = get;
exports.updateRental = update;
exports.deleteRental = deleteById;
