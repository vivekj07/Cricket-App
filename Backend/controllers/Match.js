import { ErrorHandler } from "../middlewares/error.js";
import { League } from "../models/League.js";
import { Match } from "../models/Match.js";
import { Player } from "../models/Player.js";


const getAllMatches = async (req, res, next) => {
  try {
    const matches = await Match.find()
      .populate("league","name")
      .populate("teams", "name shortName logo")
      .populate("venue", "name location")
      .populate({
        path:"scoreboard",
        select:"teamInnings",
        populate:[
          {
            path:"teamInnings.team",
            select:"logo name shortName"
          }
        ]
      })
      .sort({ date: -1, startTime: -1 })
      // .lean();
    
      // const updatedMatches= matches.map((match)=>{
      //     return {
      //       _id:match._id,
      //       date:match.date,
      //       startTime:match.startTime,
      //       endTime:match.endTime,
      //       venue:match.venue,
      //       status:match.status,
      //       scoreboard:{
      //         teamInnings: match.scoreboard?.teamInnings.map((inn)=>{
      //           return {
      //             team:inn.team,
      //             runs:inn.runs,
      //             wickets:inn.wickets,
      //             overs:inn.overs
      //           }
      //         })
      //       }
      //     }
      // })

    res.status(200).json({
      success: true,
      matches,
    });
  } catch (err) {
    next(err);
  }
};

const getAllMatchesOfLeague = async (req, res, next) => {
    try {
      const { id:leagueId } = req.params;
  
      if (!leagueId) {
        return next(new ErrorHandler("League ID is required", 400));
      }
  
      const matches = await Match.find({ league: leagueId })
        .populate("teams", "name shortName logo")
        .populate("venue", "name location")
        .populate({
          path:"scoreboard",
          select:"teamInnings",
          populate:[
            {
              path:"teamInnings.team",
              select:"logo name shortName"
            }
          ]
        })
        .sort({ date: -1, startTime: -1 })
        .lean();
      
        const updatedMatches= matches.map((match)=>{
            return {
              _id:match._id,
              date:match.date,
              startTime:match.startTime,
              endTime:match.endTime,
              venue:match.venue,
              status:match.status,
              scoreboard:{
                teamInnings: match.scoreboard?.teamInnings.map((inn)=>{
                  return {
                    team:inn.team,
                    runs:inn.runs,
                    wickets:inn.wickets,
                    overs:inn.overs
                  }
                })
              }
            }
        })
  
      res.status(200).json({
        success: true,
        updatedMatches,
      });
    } catch (err) {
      next(err);
    }
};

const getMatchDetails = async (req, res, next) => {
    try {
      const { id:matchId } = req.params;
  
      if (!matchId) {
        return next(new ErrorHandler("Match ID is required", 400));
      }
  
      const match = await Match.findById(matchId)
  .populate("league", "name")
  // .populate("teams", "name shortName logo")
  .populate("venue", "name city capacity")
  .populate("umpires", "fullName country")
  .populate({
    path: "scoreboard",
    populate: [
      {
        path: "teamInnings.team",
        select: "name shortName logo",
      },
      {
        path: "teamInnings.fallOfWickets.batsman",
        select: "fullName country",
      },
      {
        path: "teamInnings.batsmenStats.player",
        select: "fullName country role",
      },
      {
        path: "teamInnings.batsmenStats.bowler",
        select: "fullName country",
      },
      {
        path: "teamInnings.bowlersStats.player",
        select: "fullName country role",
      },
      {
        path: "manOfTheMatch",
        select: "fullName country role",
      },
    ],
  });


  
      if (!match) {
        return next(new ErrorHandler("Match not found", 404));
      }
  
      res.status(200).json({
        success: true,
        match,
      });
    } catch (err) {
      next(err);
    }
};
  
const getMatchesByStatus = async (req, res, next) => {
    try {
      const { status } = req.query;
  
      const matches = await Match.find({ status }).sort({ date: -1 });
  
      res.status(200).json({
        success: true,
        matches,
      });
    } catch (err) {
      next(err);
    }
};
  
const newMatch = async (req, res, next) => {
    try {
      const { league, date, startTime, endTime, teams, venue, umpires, status } = req.body;
  
      if (!league || !date || !teams || !venue) {
        return next(new ErrorHandler("Please provide all required fields!", 400));
      }
  
      if (teams.length !== 2) {
        return next(new ErrorHandler("A match must have exactly two teams!", 400));
      }
  
      const match = await Match.create({
        league,
        date,
        startTime,
        endTime,
        teams,
        venue,
        umpires,
        status,
      });
  
      res.status(200).json({
        success: true,
        message: "New Match Created Successfully",
      });
    } catch (err) {
      next(err);
    }
};

const updateMatch = async (req, res, next) => {
    try {
      const { id:matchId } = req.params;
      const updateData = req.body;
  
      if (!matchId) {
        return next(new ErrorHandler("Match ID is required", 400));
      }
  
      const match = await Match.findById(matchId);
      if (!match) {
        return next(new ErrorHandler("Match not found", 404));
      }
  
      const updatedMatch = await Match.findByIdAndUpdate(matchId, updateData, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({
        success: true,
        message: "Match updated successfully",
        match: updatedMatch,
      });
    } catch (err) {
      next(err);
    }
};

const updateResultOfMatch = async (req, res, next) => {
  try {
    const { id:matchId } = req.params;
    const {result} = req.body;
    if (!matchId) {
      return next(new ErrorHandler("Match ID is required", 400));
    }

    const match = await Match.findById(matchId);
    if (!match) {
      return next(new ErrorHandler("Match not found", 404));
    }

    match.result=result
    await match.save()

    res.status(200).json({
      success: true,
      message: "Result updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteMatch = async (req, res, next) => {
    try {
      const { id:matchId } = req.params;
  
      const match = await Match.findById(matchId);
      if (!match) {
        return next(new ErrorHandler("Match not found", 404));
      }
  
      await Match.findByIdAndDelete(matchId);
  
      res.status(200).json({
        success: true,
        message: "Match deleted successfully",
      });
    } catch (err) {
      next(err);
    }
};

const updatePlayersStats = async (req, res, next) => {
  try {
    const { leagueId, batsmen, bowlers } = req.body;

    if(!batsmen || !bowlers || batsmen.length==0 || bowlers.length==0) return next(new ErrorHandler("PLease Provide Batsmen and Bowlers", 404));

    const league = await League.findById(leagueId);
    if (!league) {
      return next(new ErrorHandler("League not found", 404));
    }
    const format = league.format;


    const PromiseArray1 = batsmen.map(async (batsman) => {
      let player = await Player.findById(batsman.player._id);
      if (!player) return; // Skip if player not found

      let index = player.performance.findIndex((per) => per.leagueType === format);
      
      // If the player has no performance entry for this league format, initialize it
      if (index === -1) {
        player.performance.push({
          leagueType: format,
          matchesPlayed: 0,
          runsScored: 0,
          noOfBallsFaced: 0,
          noOfTimeDismissed: 0,
          noOf6s: 0,
          noOf4s: 0,
        });
        index = player.performance.length - 1; // Get the newly added index
      }

      player.performance[index].matchesPlayed += 1;
      player.performance[index].runsScored += batsman.runs;
      player.performance[index].noOfBallsFaced += batsman.balls;
      player.performance[index].noOfTimeDismissed += batsman.outType === "Not Out" ? 0 : 1;
      player.performance[index].noOf6s += batsman.sixes;
      player.performance[index].noOf4s += batsman.fours;

      await player.save();
    });

    const PromiseArray2 = bowlers.map(async (bowler) => {
      let player = await Player.findById(bowler.player._id);
      if (!player) return; // Skip if player not found

      let index = player.performance.findIndex((per) => per.leagueType === format);
      
      // If the player has no performance entry for this league format, initialize it
      if (index === -1) {
        player.performance.push({
          leagueType: format,
          noOfBallsBowled: 0,
          runsGiven: 0,
          wicketsTaken: 0,
        });
        index = player.performance.length - 1; // Get the newly added index
      }

      const ballsBowled = Math.floor(bowler.overs) * 6 + Math.round((bowler.overs % 1) * 10);
      
      player.performance[index].noOfBallsBowled += ballsBowled;
      player.performance[index].runsGiven += bowler.runsConceded;
      player.performance[index].wicketsTaken += bowler.wickets;

      await player.save();
    });

    await Promise.all([...PromiseArray1, ...PromiseArray2]);

    res.status(200).json({
      success: true,
      message: "Players stats updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

  
  
  
  

export{
    getAllMatchesOfLeague, getMatchDetails,getMatchesByStatus, getAllMatches,
    newMatch,updateMatch, deleteMatch, updateResultOfMatch, updatePlayersStats
}