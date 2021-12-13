const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  address: {
    type: String,
    required: true,
  },
  searchHistory: [
    {
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
    },
  ],
});

const User = mongoose.model("User", userSchema);
let get = () => {
  return User.find({});
};

let save = (userData) => {
  var user = new User(userData);
  return user.save();
};

let update = (id, change) => {
  return User.findByIdAndUpdate(id, change).exec();
};

let deleteById = (id) => {
  return User.deleteOne({ _id: id }).exec();
};

exports.saveUser = save;
exports.getUser = get;
exports.updateUser = update;
exports.deleteUser = deleteById;
