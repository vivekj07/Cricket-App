import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema(
  {
    leagueType: {
      type: String,
      enum: ['T20', 'ODI', 'Test', 'Other'],
      required: true,
    },
    matchesPlayed: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    ties: {
      type: Number,
      default: 0,
    },
    netRunRate: {
      type: Number,
      default: 0,
    },
  },
  { _id: false } // Optionally disable _id for subdocuments if not needed
);

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    logo: {
      url: {
          type: String,
          required: true,
      },
      public_id: {
          type: String,
          required: true,
      }
  },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      default: "679fbd3b596dcecceb8f2622",
    },
    coach: {
      type: String,
      trim: true,
      default: '',
    },
    homeVenue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue',
      default: "67a0d6487f63b1766eee15d3",
    },
    performance: [performanceSchema],
  },
  {
    timestamps: true, 
  }
);

export const Team = mongoose.model('Team', teamSchema);
