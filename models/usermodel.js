import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    dob: {
      type: Date,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phoneno: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
