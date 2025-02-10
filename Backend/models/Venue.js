import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
    homeTeams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
    matchesHosted: {
      type: Number,
      default: 0,
    },
    pitchType: {
      type: String,
      default: 'Balanced',
    },
    floodlights: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Venue = mongoose.model('Venue', venueSchema);
