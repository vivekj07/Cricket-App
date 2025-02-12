import mongoose from "mongoose"

const fileSchema = new mongoose.Schema(
  {
    file: { 
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const FileUplaod = mongoose.model('FileUplaod', fileSchema);
