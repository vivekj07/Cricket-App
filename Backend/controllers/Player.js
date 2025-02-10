import csv from "csv-parser";
import fs from "fs";
import {Readable} from "stream"

import { ErrorHandler } from "../middlewares/error.js";
import { Player } from "../models/Player.js";
import { deleteFilesFromCloudinary, uploadFlilesToCloudinary } from "../utils/features.js";


const getAllPlayers = async (req, res, next) => {
    try {
      const players = await Player.find().populate("team", "name shortName"); 
  
      res.status(200).json({
        success: true,
        players,
      });
    } catch (err) {
      next(err);
    }
};

const getPlayerById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const player = await Player.findById(id).populate("team");
      if (!player) return next(new ErrorHandler("Player not found", 404));
  
      res.status(200).json({
        success: true,
        player,
      });
    } catch (err) {
      next(err);
    }
  };

const searchPlayerByName = async (req, res, next) => {
    try {
      const name = req.query.name || "";
  
      const players = await Player.find({
        fullName: { $regex: name, $options: "i" }
      }).populate("team","name");
  
      res.status(200).json({
        success: true,
        players,
      });
  
    } catch (err) {
      next(err);
    }
};

const newPlayer = async (req, res, next) => {
  try {
    const { fullName, country,dob, team, homeTown, jersyNo, role, battingStyle, bowlingStyle, isWicketKeeper, performance } = req.body;
    const file = req.file;

    if (!file) return next(new ErrorHandler("Please add player photo", 400));
    if (!fullName || !country || !homeTown || !role || !battingStyle || !dob) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const results = await uploadFlilesToCloudinary([file], "CricketApp/PlayerPhotos");
    const photo = {
      public_id: results[0].public_id,
      url: results[0].url
    };

    const player = await Player.create({
      fullName,
      photo,
      country,
      team,
      homeTown,
      jersyNo,
      role,
      battingStyle,
      bowlingStyle,
      isWicketKeeper,
      dob,
      performance: performance || [
        {
          leagueType:"T20"
        },
        {
          leagueType:"ODI"
        },
        {
          leagueType:"Test"
        },
        {
          leagueType:"Domestic"
        },
        {
          leagueType:"Box"
        },
        {
          leagueType:"Other"
        },
      ] 
    });

    res.status(200).json({
      success: true,
      message: "New Player Created Successfully",
    });

  } catch (err) {
    next(err);
  }
};

const updatePlayer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fullName, country,dob, team, homeTown, jersyNo, role, battingStyle, bowlingStyle, isWicketKeeper, performance } = req.body;
      const file = req.file;
  
      const player = await Player.findById(id);
      if (!player) return next(new ErrorHandler("Player not found", 404));
  
      let photo = player.photo;
      if (file) {
        const results = await uploadFlilesToCloudinary([file], "CricketApp/PlayerPhotos");
        photo = {
          public_id: results[0].public_id,
          url: results[0].url
        };
      }

      if(file && player.photo.public_id){
        await deleteFilesFromCloudinary([player.photo.public_id])
      }
  
      player.fullName = fullName || player.fullName;
      player.photo = photo;
      player.dob = dob;
      player.country = country || player.country;
      player.team = team || player.team;
      player.homeTown = homeTown || player.homeTown;
      player.jersyNo = jersyNo || player.jersyNo;
      player.role = role || player.role;
      player.battingStyle = battingStyle || player.battingStyle;
      player.bowlingStyle = bowlingStyle || player.bowlingStyle;
      player.isWicketKeeper = isWicketKeeper ?? player.isWicketKeeper;
      player.performance = performance || player.performance;
  
      await player.save();
  
      res.status(200).json({
        success: true,
        message: "Player updated successfully",
      });
  
    } catch (err) {
      next(err);
    }
};

const deletePlayer = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const player = await Player.findById(id);
      if (!player) return next(new ErrorHandler("Player not found", 404));
  
      await Promise.all([
        player.deleteOne(),
        deleteFilesFromCloudinary([player.photo?.public_id])
      ])
  
      res.status(200).json({
        success: true,
        message: `Player ${player.fullName} deleted successfully`,
      });
  
    } catch (err) {
      next(err);
    }
};

// // worked well
// const bulkUploadPlayers = async (req, res, next) => {
//   try {
//     if (!req.file) return next(new ErrorHandler("Please upload a CSV file", 400));

//     const players = [];

//     // Convert buffer to readable stream
//     const stream = Readable.from(req.file.buffer.toString());

//     // Parse CSV
//     stream
//       .pipe(csv())
//       .on("data", (row) => {
//         players.push({
//           fullName: row.fullName,
//           country: row.country,
//           homeTown: row.homeTown,
//           role: row.role,
//           battingStyle: row.battingStyle,
//           bowlingStyle: row.bowlingStyle,
//           jersyNo: row.jersyNo,
//           photo :{
//             url:"xyz",
//             public_id:"abc"
//           }
//         });
//       })
//       .on("end", async () => {
//         await Player.insertMany(players);
//         res.status(200).json({ success: true, message: "Players uploaded successfully" });
//       });
//   } catch (err) {
//     next(err);
//   }
// };


const bulkUploadPlayers = async (req, res, next) => {
  try {
    if (!req.file) return next(new ErrorHandler("Please upload a CSV file", 400));

    const players = [];
    const stream = Readable.from(req.file.buffer.toString());

    stream
      .pipe(csv())
      .on("data", (row) => {
        players.push({
          fullName: row.fullName,
          country: row.country,
          homeTown: row.homeTown,
          role: row.role,
          battingStyle: row.battingStyle,
          bowlingStyle: row.bowlingStyle,
          jersyNo: row.jersyNo,
          photoURL: row.photoURL, // Storing photoURL to process later
        });
      })
      .on("end", async () => {
        try {
          // Filter out players who need Cloudinary upload
          const uploadRequired = players.filter((p) => !p.photoURL.startsWith("http"));

          let uploadedImages = [];
          if (uploadRequired.length > 0) {
            const files = uploadRequired.map((p) => ({ path: p.photoURL })); // Convert URLs to file objects
            uploadedImages = await uploadFlilesToCloudinary(files, "CricketApp/Players");
          }

          // Assign photo data
          players.forEach((player, index) => {
            if (player.photoURL.startsWith("http")) {
              // If already a URL, just use it
              player.photo = { url: player.photoURL, public_id: "external" };
            } else {
              // Assign uploaded Cloudinary image
              player.photo = {
                url: uploadedImages[index].url,
                public_id: uploadedImages[index].public_id,
              };
            }
            delete player.photoURL; // Remove temporary field
          });

          await Player.insertMany(players);
          res.status(200).json({ success: true, message: "Players uploaded successfully" });
        } catch (error) {
          next(error);
        }
      });
  } catch (err) {
    console.log(err)
    next(err);
  }
};



  
  

export 
{
    getAllPlayers,searchPlayerByName,getPlayerById,
    newPlayer,updatePlayer,deletePlayer,bulkUploadPlayers
};
