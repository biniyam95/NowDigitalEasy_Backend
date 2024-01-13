import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type:String, required:true} ,
  isPrivate: { type: Boolean, default: false }, 

  postedDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },

  createdBy: { type: mongoose.Schema.Types.ObjectId,  ref: 'userCollection', required: true},  
});

export const postModel = mongoose.model('postCollection', postSchema);
