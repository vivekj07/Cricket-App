import { ErrorHandler } from "../middlewares/error.js";
import { League } from "../models/League.js";
import { Player } from "../models/Player.js";
import { Team } from "../models/Team.js";
import { deleteFilesFromCloudinary, uploadFlilesToCloudinary } from "../utils/features.js";

const getAllTeams=async (req,res)=>{
  try{
      const teams= await Team.find();
      res.status(200).json({
          success:true,
          teams
      })
  }
  catch(err){
      next(err)
  }
  
}

const getTeamById = async (req, res, next) => {
  try {
    const {id: teamId } = req.params;
    
    const team = await Team.findById(teamId)
      .populate('players',"photo fullName country homeTown jersyNo") 
      .populate('captain',"fullName")  
      .populate('homeVenue',"name city country"); 

    if (!team) return next(new ErrorHandler("Team not found!", 404));

    res.status(200).json({
      success: true,
      team
    });
  } catch (err) {
    next(err);
  }
};

const newTeam = async (req, res, next) => {
  try {
    const { name, shortName, captain, coach } = req.body;
    const file = req.file
    if (!file) return next(new ErrorHandler("Please add Avatar", 400))
    if (!name || !shortName) {
      return next(new ErrorHandler("Please provide both name and shortName for the team.", 400));
    }

    const results = await uploadFlilesToCloudinary([file],"CricketApp/TeamLogos")
    const logo = {
      public_id: results[0].public_id,
      url: results[0].url
    }

    const team = await Team.create({
      name,
      shortName,
      logo,       
      captain,    
      coach,      
      performance : [
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
      message: "New Team Created Successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateTeam = async (req, res, next) => {
  try {
    const { id:teamId } = req.params;
    const { name, shortName, captain, coach } = req.body;
    const file = req.file;

    const team = await Team.findById(teamId);
    if (!team) {
      return next(new ErrorHandler("Team not found!", 404));
    }

    if (name) team.name = name;
    if (shortName) team.shortName = shortName;
    if (captain) team.captain = captain;
    if (coach) team.coach = coach;

    if (file) {
      const results = await uploadFlilesToCloudinary([file], "CricketApp/TeamLogos");
      const newLogo = {
        public_id: results[0].public_id,
        url: results[0].url
      };

      if (team.logo && team.logo.public_id) {
        await deleteFilesFromCloudinary([team.logo.public_id]);
      }

      team.logo = newLogo;
    }

    await team.save();

    res.status(200).json({
      success: true,
      message: "Team updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateTeamPerformance = async (req, res, next) => {
  try {
    const { id:teamId } = req.params;
    const { matchesPlayed,wins,losses,ties,netRunRate,leagueId } = req.body;
    if(matchesPlayed==null || !wins==null || !losses==null || !ties==null || !netRunRate==null || !leagueId==null) return next(new ErrorHandler("Plaese Provide all fields", 400));

    const team = await Team.findById(teamId);
    if (!team) {
      return next(new ErrorHandler("Team not found!", 404));
    }

    const league = await League.findById(leagueId);
    if (!league) {
      return next(new ErrorHandler("League not found!", 404));
    }

    const format= league.format

    let index= team.performance.findIndex((team)=> team.leagueType == format)

    if (index === -1) {
      team.performance.push({
        leagueType: format,
        matchesPlayed,
        wins,
        losses,
        ties,
        netRunRate,
      });
    } else {
      team.performance[index] = {
        ...team.performance[index],
        matchesPlayed,
        wins,
        losses,
        ties,
        netRunRate,
      };
    }

    await team.save();

    res.status(200).json({
      success: true,
      message: "Performance updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteTeam = async (req, res, next) => {
  try {
    const { id:teamId } = req.params;

    const team = await Team.findById(teamId);
    if (!team) {
      return next(new ErrorHandler("Team not found!", 404));
    }

    if (team.logo && team.logo.public_id) {
      await deleteFilesFromCloudinary(team.logo.public_id);
    }

    await team.deleteOne();

    res.status(200).json({
      success: true,
      message: "Team deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

const searchTeamByName = async (req, res, next) => {
  try {
    const name = req.query.name || "";

    const teams = await Team.find({
      name: { $regex: name, $options: 'i' }
    });

    res.status(200).json({
      success: true,
      teams
    });
  } catch (err) {
    next(err);
  }
};

const updateTeamPlayers = async (req, res, next) => {
  try {
    const { id:teamId } = req.params;
    const { playerId, action } = req.body; // action: "add" or "remove"

    const team = await Team.findById(teamId);
    if (!team) return next(new ErrorHandler("Team not found!", 404));

    const player = await Player.findById(playerId);
    if (!player) return next(new ErrorHandler("Player not found!", 404));
    if (action === "add") {
      if (!team.players.includes(playerId)) {
        team.players.push(playerId);
        player.team.push(teamId);
      }
    } else if (action === "remove") {
      team.players = team.players.filter(id => id.toString() !== playerId);
      player.team = player.team.filter(teamId => teamId.toString() != teamId);
    } else {
      return next(new ErrorHandler("Invalid action type. Use 'add' or 'remove'.", 400));
    }

    await Promise.all([
        team.save(),
        player.save(),
    ]);

    res.status(200).json({
      success: true,
      message: `Player ${player.fullName} ${action === "add" ? "added to" : "removed from"} team successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const makeCaptain = async (req, res, next) => {
  try {
    const { id:teamId } = req.params;
    const { playerId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) {
      return next(new ErrorHandler("Team not found!", 404));
    }

    // const player = await Player.findById(playerId);
    // if (!player) {
    //   return next(new ErrorHandler("Player not found!", 404));
    // }

    if(team.players.length==0 || !team.players.includes(playerId)) return next(new ErrorHandler("This Player is Not in this Team!", 400));

    team.captain=playerId
    await team.save();

    res.status(200).json({
      success: true,
      message: "Captain Assigned successfully",
    });
  } catch (err) {
    next(err);
  }
};


// incorrect
// const addTeamPlayers = async (req, res, next) => {
//   try {
//     const { id:teamId } = req.params;
//     const { playerIds } = req.body;

//     if(!playerIds || playerIds.length==0) return next(new ErrorHandler("Please Provide Players to Add", 404));
//     const team = await Team.findById(teamId);
//     if (!team) return next(new ErrorHandler("Team not found!", 404));

//     const PromiseArray=playerIds?.map(async(playerId)=>{
//       const player = await Player.findById(playerId);
//       if (!player) return next(new ErrorHandler("Player not found!", 404));
//       if (!team.players.includes(playerId)) {
//         team.players.push(playerId);
//         player.team.push(teamId);
//       }
//       return player.save()
//     })
     

//     await Promise.all([
//         team.save(),
//         ...PromiseArray,
//     ]);

//     res.status(200).json({
//       success: true,
//       message: `Players Added in Team successfully`,
//     });
//   } catch (err) {
//     next(err);
//   }
// };


// IMP Query
const addTeamPlayers = async (req, res, next) => {
  try {
    const { id: teamId } = req.params;
    const { playerIds } = req.body;

    if (!playerIds || playerIds.length === 0) {
      return next(new ErrorHandler("Please Provide Players to Add", 400));
    }

    // Fetch the team
    const team = await Team.findById(teamId);
    if (!team) return next(new ErrorHandler("Team not found!", 404));

    // Fetch all players in a single query
    const players = await Player.find({ _id: { $in: playerIds } });

    // Check if all playerIds exist
    if (players.length !== playerIds.length) {
      return next(new ErrorHandler("Some players not found!", 404));
    }

    // Filter out players that are already in the team
    const newPlayers = players.filter(player => !team.players.includes(player._id.toString()));

    // If no new players to add, return early
    if (newPlayers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "All players are already in the team.",
      });
    }

    // Add new players to the team
    team.players.push(...newPlayers.map(player => player._id));

    // Update each player's team field
    await Player.updateMany(
      { _id: { $in: newPlayers.map(player => player._id) } },
      { $addToSet: { team: teamId } } // Ensures teamId is added only if not present
    );

    // Save team
    await team.save();

    res.status(200).json({
      success: true,
      message: `Players added to the team successfully.`,
    });
  } catch (err) {
    next(err);
  }
};









export {getAllTeams,searchTeamByName,getTeamById,
  newTeam,updateTeam,deleteTeam,updateTeamPlayers, addTeamPlayers, makeCaptain, updateTeamPerformance
}