const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchema = new Schema({
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

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
let get = (query) => {
  query = query ? query : {};
  return Restaurant.findOne(query);
};

let save = (restaurantData) => {
  var restaurant = new Restaurant(restaurantData);
  return restaurant.save();
};

let update = (id, change) => {
  return Restaurant.findByIdAndUpdate(id, change).exec();
};

let deleteById = (id) => {
  return Restaurant.deleteOne({ _id: id }).exec();
};

exports.saveRestaurant = save;
exports.getRestaurant = get;
exports.updateRestaurant = update;
exports.deleteRestaurant = deleteById;
