import mongoose from "mongoose";

const scoreBoardSchema = new mongoose.Schema(
  {
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    teamInnings: [
      {
        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
          required: true,
        },
        runs: {
          type: Number,
          required: true,
          default: 0,
        },
        wickets: {
          type: Number,
          required: true,
          default: 0,
        },
        overs: {
          type: Number,
          required: true,
          default: 0,
        },
        extras: {
          byes: { type: Number, default: 0 },
          legByes: { type: Number, default: 0 },
          noBalls: { type: Number, default: 0 },
          wides: { type: Number, default: 0 },
        },
        fallOfWickets: [
          {
            wicketNumber: Number,
            batsman: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Player",
            },
            scoreAtFall: Number,
          },
        ],
        batsmenStats: [
          {
            player: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Player",
              required: true,
            },
            runs: {
              type: Number,
              required: true,
              default: 0,
            },
            balls: {
              type: Number,
              required: true,
              default: 0,
            },
            fours: {
              type: Number,
              required: true,
              default: 0,
            },
            sixes: {
              type: Number,
              required: true,
              default: 0,
            },
            strikeRate: {
              type: Number,
              default: 0,
            },
            outType: {
              type: String,
              default: "Not Out",
            },
            bowler: {
              type: String,
              default: "",
              // type: mongoose.Schema.Types.ObjectId,
              // ref: "Player",
              // default: null,
            },
          },
        ],
        bowlersStats: [
          {
            player: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Player",
              required: true,
            },
            overs: {
              type: Number,
              required: true,
              default: 0,
            },
            maidens: {
              type: Number,
              default: 0,
            },
            runsConceded: {
              type: Number,
              required: true,
              default: 0,
            },
            wickets: {
              type: Number,
              required: true,
              default: 0,
            },
            economy: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
    ],
    result: {
      type: String,
      trim: true,
      default: "",
    },
    manOfTheMatch: {
      type:String
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Player",
      // default: null,
    },
    summary: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const ScoreBoard = mongoose.model("ScoreBoard", scoreBoardSchema);
