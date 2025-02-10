import mongoose from "mongoose";

const umpireSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    matchesOfficiated: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ['On-field', 'Third Umpire', 'Match Referee'],
      default:'On-field'
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    photo: {
      url: {
        type: String,
        default:""
      },
      public_id: {
        type: String,
        default:"",
      },
    },
    dob: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Retired'],
      default: 'Active',
    },
    matchesOfficiatedDetails: [
      {
        matchId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Match',
        },
        date: Date,
      }
    ],
  },
  {
    timestamps: true, 
  }
);

export const Umpire = mongoose.model('Umpire', umpireSchema);
