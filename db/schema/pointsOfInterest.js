const mongoose = require("mongoose");
const { Schema } = mongoose;

const pointsOfInterestSchema = new Schema({
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

const PointsOfInterest = mongoose.model(
  "PointsOfInterest",
  pointsOfInterestSchema
);

let get = (query) => {
  query = query ? query : {};
  return PointsOfInterest.findOne(query);
};

let save = (pointsOfInterestData) => {
  var pointsOfInterest = new PointsOfInterest(pointsOfInterestData);
  return pointsOfInterest.save();
};

let update = (id, change) => {
  return PointsOfInterest.findByIdAndUpdate(id, change).exec();
};

let deleteById = (id) => {
  return PointsOfInterest.deleteOne({ _id: id }).exec();
};

exports.savePointsOfInterest = save;
exports.getPointsOfInterest = get;
exports.updatePointsOfInterest = update;
exports.deletePointsOfInterest = deleteById;
