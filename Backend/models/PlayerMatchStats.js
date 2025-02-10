const mongoose = require('mongoose');

const playerMatchStatSchema = new mongoose.Schema(
  {
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
      required: true,
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    // Batting Stats
    runs: {
      type: Number,
      default: 0,
    },
    ballsFaced: {
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
    strikeRate: {
      type: Number,
      default: 0,
    },
    dismissalType: {
      type: String,
      enum: ['Not Out', 'Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket', 'Other'],
      default: 'Not Out',
    },
    // Bowling Stats
    overs: {
      type: Number,
      default: 0,
    },
    maidens: {
      type: Number,
      default: 0,
    },
    runsConceded: {
      type: Number,
      default: 0,
    },
    wickets: {
      type: Number,
      default: 0,
    },
    economyRate: {
      type: Number,
      default: 0,
    },
    // Fielding Stats
    catches: {
      type: Number,
      default: 0,
    },
    runOuts: {
      type: Number,
      default: 0,
    },
    stumpings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Manages createdAt and updatedAt
  }
);

// Middleware to update `updatedAt` before saving
playerMatchStatSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const PlayerMatchStat = mongoose.model('PlayerMatchStat', playerMatchStatSchema);

module.exports = PlayerMatchStat;
