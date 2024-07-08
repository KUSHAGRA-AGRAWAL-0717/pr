import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
    type: String,
    enum: ['user', 'expert'],
    required: true,
    },
    expertise: {
      type: String,
      required: function() { return this.role === 'expert' }
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
