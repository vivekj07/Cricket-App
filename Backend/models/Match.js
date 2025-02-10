import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'League', 
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    // This will contain exactly two teams in same League of above
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team', 
        required: true,
      },
    ],
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue',
      required: true,
    },
    umpires: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Umpire',
      },
    ],
    status: {
      type: String,
      enum: ['Upcoming', 'Live', 'Completed', 'Abandoned'],
      default: 'Upcoming',
    },
    result: {
      type: String,
      // winner: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'Team',
      //   default: null,
      // },
      // winByRuns: { type: Number, default: 0 },
      // winByWickets: { type: Number, default: 0 },
    },
    scoreboard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ScoreBoard',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Match = mongoose.model('Match', matchSchema);
