import mongoose from "mongoose"

const leagueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, 
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    season: { type: String, default: "S1" },
    format: {
      type: String,
      required: true,
      enum: ['T20', 'ODI', 'Test',"Domestic","Box","Other"], 
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team', 
      default: null,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    pointsTable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PointsTable', 
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

export const League = mongoose.model('League', leagueSchema);
