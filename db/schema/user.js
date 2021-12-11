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
