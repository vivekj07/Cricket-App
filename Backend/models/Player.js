import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    photo: { 
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    dob: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    team: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    }
    ],
    homeTown: {
      type: String,
      required: true,
    },
    jersyNo: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      required: true,
      enum: ["Batsman", "Bowler", "All-rounder", "Wicketkeeper"],
    },
    battingStyle: {
      type: String,
      enum: ["Right", "Left"],
      required: true,
    },
    bowlingStyle: {
      type: String,
      default: "None",
    },
    isWicketKeeper: {
      type: Boolean,
      default: false,
    },

    // Performance stats stored separately for each league format
    performance: [
      {
        leagueType: {
          type: String,
          enum: ["T20", "ODI","Domestic","Box", "Test", "Other"],
          default:"Other" ,
        },
        matchesPlayed: {
          type: Number,
          default: 0,
        },
        noOfTimeDismissed: {
          type: Number,
          default: 0,
        },
        runsScored: {
          type: Number,
          default: 0,
        },
        noOfBallsFaced: {
          type: Number,
          default: 0,
        },
        noOf6s: {
          type: Number,
          default: 0,
        },
        noOf4s: {
          type: Number,
          default: 0,
        },
        
        noOfBallsBowled: {
          type: Number,
          default: 0,
        },
        runsGiven: {
          type: Number,
          default: 0,
        },
        wicketsTaken: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Player = mongoose.model("Player", playerSchema);
