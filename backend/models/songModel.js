import mongoose from "mongoose";

const songSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
        required: true,
      },
      keyMap: {
        type: Map,
        of: String,
      },
      favorited: {
        type: Boolean,
        default: false, 
      },
      delay: {
        type: Number,
        default: 150, 
      },
    },
    {
      timestamps: true,
    }
  );
  
  export const Song = mongoose.model("Song", songSchema);
  
