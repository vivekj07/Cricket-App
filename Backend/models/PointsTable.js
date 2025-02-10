import mongoose from "mongoose";

const pointsTableSchema = new mongoose.Schema(
  {
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'League',
      required: true,
    },
    teams: [
      {
        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team',
          required: true,
        },
        matchesPlayed: {
          type: Number,
          required: true,
          default: 0,
        },
        wins: {
          type: Number,
          required: true,
          default: 0,
        },
        losses: {
          type: Number,
          required: true,
          default: 0,
        },
        ties: {
          type: Number,
          required: true,
          default: 0,
        },
        noResults: {
          type: Number,
          required: true,
          default: 0,
        },
        points: {
          type: Number,
          required: true,
          default: 0,
        },
        netRunRate: {
          type: Number,
          required: true,
          default: 0,
        },
        position: {
          type: Number,
          required: true,
          default: 0,
        },
      }
    ],
  },
  {
    timestamps: true, 
  }
);

export const PointsTable = mongoose.model('PointsTable', pointsTableSchema);
