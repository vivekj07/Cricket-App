import { ReadableStreamBYOBRequest } from "stream/web";
import { ErrorHandler } from "../middlewares/error.js";
import { Match } from "../models/Match.js";
import { ScoreBoard } from "../models/ScoreBoard.js";
import { Team } from "../models/Team.js";


// const getScoreBoardOfMatch = async (req, res, next) => {
//     try {
//       const { matchId } = req.params;
  
//       const scoreboard = await ScoreBoard.findOne({ match: matchId })
//         .populate("match", "date teams venue status result")
//         .populate("teamInnings.team", "name")
//         .populate("teamInnings.fallOfWickets.batsman", "fullName")
//         .populate("batsmenStats.player", "fullName")
//         .populate("batsmenStats.bowler", "fullName")
//         .populate("bowlersStats.player", "fullName")
//         .populate("manOfTheMatch", "fullName");
  
//       if (!scoreboard) {
//         return res.status(404).json({ success: false, message: "Scoreboard not found for this match" });
//       }
  
//       res.status(200).json({ success: true, scoreboard });
//     } catch (error) {
//       next(error);
//     }
// };

// const newScoreBoard = async (req, res, next) => {
//   try {
//     const { match, teamInnings, batsmenStats, bowlersStats, result, manOfTheMatch, summary } = req.body;

//     const existingMatch = await Match.findById(match);
//     if (!existingMatch) {
//       return res.status(404).json({ success: false, message: "Match not found" });
//     }

//     const scoreBoard = await ScoreBoard.create({
//       match,
//       teamInnings,
//       batsmenStats,
//       bowlersStats,
//       result,
//       manOfTheMatch,
//       summary,
//     });

//     existingMatch.scoreboard = scoreBoard._id;
//     await existingMatch.save();

//     res.status(201).json({
//       success: true,
//       message: "Scoreboard created successfully",
//     });

//   } catch (error) {
//     next(error);
//   }
// };


// this is not very usefull as it updates fields directly

const getScoreBoardOfMatch = async (req, res, next) => {
  try {
    const { matchId } = req.params;

    // Validate if the match exists
    const matchExists = await Match.findById(matchId);
    if (!matchExists) {
      return next(new ErrorHandler("Match not found", 404));
    }

    // Fetch the scoreboard and populate all necessary fields
    const scoreboard = await ScoreBoard.findOne({ match: matchId })
      .populate({
        path:"match",
        select:"league",
        populate:[
          {
            path:"league",
            select:"name"
          }
        ]
      })
      .populate("teamInnings.team", "name shortName logo")
      .populate("teamInnings.fallOfWickets.batsman", "fullName")
      .populate("teamInnings.batsmenStats.player", "fullName")
      .populate("teamInnings.batsmenStats.bowler", "fullName")
      .populate("teamInnings.bowlersStats.player", "fullName")
      .populate("manOfTheMatch", "fullName");

    if (!scoreboard) {
      return next(new ErrorHandler("Scoreboard not found for this match", 404));
    }

    res.status(200).json({
      success: true,
      scoreboard,
    });
  } catch (error) {
    next(error);
  }
};


const newScoreBoard = async (req, res, next) => {
  try {
    const {match} = req.body;
   
    const matchExists = await Match.findById(match)
      .select("-result -league -date -startTime -endTime -venue -umpires -status")
      .populate({
        path: "teams",
        populate: {
          path: "players", // Fetching players inside each team
          model: "Player",
        },
      });


    if (!matchExists) {
      return next(new ErrorHandler("Match not found", 404));
    }

    if (matchExists.scoreboard) {
      return next(new ErrorHandler("Already Created ScoreBoard", 400));
    }

    const teams = matchExists.teams;
    if (teams.length !== 2) {
      return next(new ErrorHandler("Invalid match teams", 400));
    }

    // Initializing team innings with default values
    const teamInnings = teams.map((team) => ({
      team: team._id,
      runs: 0,
      wickets: 0,
      overs: 0,
      extras: {
        byes: 0,
        legByes: 0,
        noBalls: 0,
        wides: 0,
      },
      fallOfWickets: [],
      batsmenStats: team.players.map((player) => ({
        player: player._id,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strikeRate: 0,
        outType: "Not Out",
        bowler: "",
      })),
      bowlersStats: team.players.map((player) => ({
        player: player._id,
        overs: 0,
        maidens: 0,
        runsConceded: 0,
        wickets: 0,
        economy: 0,
      })),
    }));

    // Creating ScoreBoard entry with default values
    const scoreBoard = await ScoreBoard.create({
      match,
      teamInnings,
      result: "",
      manOfTheMatch: null,
      summary: "",
    });

    // Linking the scoreboard to the match
    matchExists.scoreboard = scoreBoard._id;
    await matchExists.save();

    res.status(201).json({
      success: true,
      message: "Scoreboard Generated successfully",
      scoreboard: scoreBoard,
    });
  } catch (error) {
    next(error);
  }
};


const updateScoreBoard = async (req, res, next) => {
  try {
    const { scoreboardId } = req.params;
    const updateData = req.body;

    const updatedScoreboard = await ScoreBoard.findByIdAndUpdate(
      scoreboardId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedScoreboard) {
      return next(new ErrorHandler("Scoreboard not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Scoreboard updated successfully",
      scoreboard: updatedScoreboard,
    });
  } catch (err) {
    next(err);
  }
};

const updateTeamScore = async (req, res, next) => {
  try {
    const { scoreboardId } = req.params;
    const {teamId,runs,wickets,overs} = req.body;

    console.log(scoreboardId,teamId,runs,wickets,overs)
    const scoreBoard = await ScoreBoard.findById(scoreboardId);

    if (!scoreBoard) {
      return next(new ErrorHandler("Scoreboard not found", 404));
    }

    if(scoreBoard.teamInnings[0].team == teamId){
      scoreBoard.teamInnings[0].runs=runs;
      scoreBoard.teamInnings[0].wickets=wickets;
      scoreBoard.teamInnings[0].overs=overs;
    }else if(scoreBoard.teamInnings[1].team == teamId){
      scoreBoard.teamInnings[1].runs=runs;
      scoreBoard.teamInnings[1].wickets=wickets;
      scoreBoard.teamInnings[1].overs=overs;
    }else{
      return next(new ErrorHandler("Team not found", 404));
    }

    await scoreBoard.save()

    res.status(200).json({
      success: true,
      message: "Team Score updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateBatsmanStats = async (req, res, next) => {
  try {
    const { scoreboardId } = req.params;
    const {playerId,teamId,runs,balls,fours,sixes,outType,bowler} = req.body;

    const scoreBoard = await ScoreBoard.findById(scoreboardId);

    if (!scoreBoard) {
      return next(new ErrorHandler("Scoreboard not found", 404));
    }

    let teamInd;

    if(scoreBoard.teamInnings[0].team == teamId){
      teamInd=0
    }else if(scoreBoard.teamInnings[1].team == teamId){
      teamInd=1
    }else{
      console.log(scoreBoard)
      return next(new ErrorHandler("Team not found", 404));
    }

    console.log(playerId)
    const map= scoreBoard.teamInnings[teamInd].batsmenStats.map((batsman)=>  batsman.player._id);
    console.log(map)

    const index= scoreBoard.teamInnings[teamInd].batsmenStats.findIndex((batsman)=> batsman.player._id == playerId);

    if(index==-1) next(new ErrorHandler("Player not found in Team", 404));

    scoreBoard.teamInnings[teamInd].batsmenStats[index].runs=runs;
    scoreBoard.teamInnings[teamInd].batsmenStats[index].balls=balls;
    scoreBoard.teamInnings[teamInd].batsmenStats[index].fours=fours;
    scoreBoard.teamInnings[teamInd].batsmenStats[index].sixes=sixes;

    if(outType)  scoreBoard.teamInnings[teamInd].batsmenStats[index].outType=outType;
    if(bowler)  scoreBoard.teamInnings[teamInd].batsmenStats[index].bowler=bowler;

    await scoreBoard.save()

    res.status(200).json({
      success: true,
      message: "Batsman stats updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateBowlerStats = async (req, res, next) => {
  try {
    const { scoreboardId } = req.params;
    const {playerId,teamId,overs,wickets,maidens,runsConceded} = req.body;
    const scoreBoard = await ScoreBoard.findById(scoreboardId);

    if (!scoreBoard) {
      return next(new ErrorHandler("Scoreboard not found", 404));
    }

    let teamInd;

    if(scoreBoard.teamInnings[0].team == teamId){
      teamInd=0
    }else if(scoreBoard.teamInnings[1].team == teamId){
      teamInd=1
    }else{
      return next(new ErrorHandler("Team not found", 404));
    }

    const index= scoreBoard.teamInnings[teamInd].bowlersStats.findIndex((bowler)=> bowler.player == playerId);

    if(index==-1) next(new ErrorHandler("Player not found in Team", 404));

    scoreBoard.teamInnings[teamInd].bowlersStats[index].overs=overs;
    scoreBoard.teamInnings[teamInd].bowlersStats[index].wickets=wickets;
    scoreBoard.teamInnings[teamInd].bowlersStats[index].maidens=maidens;
    scoreBoard.teamInnings[teamInd].bowlersStats[index].runsConceded=runsConceded;

    await scoreBoard.save()

    res.status(200).json({
      success: true,
      message: "Bowler stats updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateExtras = async (req, res, next) => {
  try {
    const { scoreboardId } = req.params;
    const {teamId,byes,legByes,noBalls,wides} = req.body;

    const scoreBoard = await ScoreBoard.findById(scoreboardId);

    if (!scoreBoard) {
      return next(new ErrorHandler("Scoreboard not found", 404));
    }

    let teamInd;

    if(scoreBoard.teamInnings[0].team == teamId){
      teamInd=0
    }else if(scoreBoard.teamInnings[1].team == teamId){
      teamInd=1
    }else{
      return next(new ErrorHandler("Team not found", 404));
    }

    scoreBoard.teamInnings[teamInd].extras.byes=byes;
    scoreBoard.teamInnings[teamInd].extras.legByes=legByes;
    scoreBoard.teamInnings[teamInd].extras.noBalls=noBalls;
    scoreBoard.teamInnings[teamInd].extras.wides=wides;

    await scoreBoard.save()

    res.status(200).json({
      success: true,
      message: "Extras updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateMOM = async (req, res, next) => {
  try {
    const { scoreboardId } = req.params;
    const {manOfTheMatch} = req.body;

    console.log(manOfTheMatch)
    const Scoreboard = await ScoreBoard.findById(
      scoreboardId
    );

    if (!Scoreboard) {
      return next(new ErrorHandler("Scoreboard not found", 404));
    }

    Scoreboard.manOfTheMatch=manOfTheMatch
    await Scoreboard.save()

    res.status(200).json({
      success: true,
      message: "Scoreboard updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteScoreBoard = async (req, res, next) => {
    try {
      const { matchId } = req.params;

      const matchExists = await Match.findById(matchId);
    if (!matchExists) {
      return next(new ErrorHandler("Match not found", 404));
    }
  
      // Find and delete the scoreboard using matchId
      const deletedScoreboard = await ScoreBoard.findOneAndDelete({ match: matchId });
  
      if (!deletedScoreboard) {
        return res.status(404).json({
          success: false,
          message: "Scoreboard not found for this match",
        });
      }

      matchExists.scoreboard=null
      await matchExists.save()
  
      res.status(200).json({
        success: true,
        message: "Scoreboard deleted successfully",
      });
    } catch (error) {
      next(error);
    }
};


export {
    getScoreBoardOfMatch,
    newScoreBoard, updateScoreBoard, deleteScoreBoard, updateMOM, updateTeamScore, updateBatsmanStats,
    updateBowlerStats, updateExtras
}
