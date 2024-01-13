import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true },
  mobile: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, 
  password: { type: String, required: true },

  postIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "postCollection" }], //array of ids of posts created by this user will be saved to this field
});


export const userModel = mongoose.model("userCollection", userSchema);
