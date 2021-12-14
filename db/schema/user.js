const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
  },
  cart: [String],
});

const User = mongoose.model("User", userSchema);
let get = (query) => {
  query = query ? query : {};
  return User.findOne(query);
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
