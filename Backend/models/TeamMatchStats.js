const mongoose = require('mongoose');

const teamMatchStatSchema = new mongoose.Schema(
  {
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    // Batting Stats
    totalRuns: {
      type: Number,
      default: 0,
    },
    totalWicketsLost: {
      type: Number,
      default: 0,
    },
    totalBallsFaced: {
      type: Number,
      default: 0,
    },
    fours: {
      type: Number,
      default: 0,
    },
    sixes: {
      type: Number,
      default: 0,
    },
    runRate: {
      type: Number,
      default: 0,
    },
    // Bowling Stats
    oversBowled: {
      type: Number,
      default: 0,
    },
    wicketsTaken: {
      type: Number,
      default: 0,
    },
    runsConceded: {
      type: Number,
      default: 0,
    },
    extras: {
      type: Number,
      default: 0,
    },
    economyRate: {
      type: Number,
      default: 0,
    },
    // Match Outcome
    result: {
      type: String,
      enum: ['Win', 'Loss', 'Tie', 'No Result'],
      required: true,
    },
    margin: {
      type: String, // Example: "10 runs", "5 wickets"
      default: '',
    },
  },
  {
    timestamps: true, // Manages createdAt and updatedAt
  }
);

// Middleware to update `updatedAt` before saving
teamMatchStatSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const TeamMatchStat = mongoose.model('TeamMatchStat', teamMatchStatSchema);

module.exports = TeamMatchStat;
