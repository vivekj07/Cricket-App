import { ErrorHandler } from "../middlewares/error.js";
import { League } from "../models/League.js";
import { PointsTable } from "../models/PointsTable.js";


const getPointsTable = async (req, res, next) => {
    try {
      const { leagueId } = req.params; 
  
      const pointsTable = await PointsTable.findOne({ league: leagueId }).populate('league',"name").populate('teams.team',"name shortName");
  
      if (!pointsTable) {
        return next(new ErrorHandler("Points table not found for this league", 404));
      }
  
      res.status(200).json({
        success: true,
        pointsTable,
      });
    } catch (err) {
      next(err);
    }
};

const newPointTable = async (req, res, next) => {
  try {
    const { leagueId } = req.params;

    const league = await League.findById(leagueId);
    if (!league) {
      return next(new ErrorHandler("League not found", 404));
    }

    const existingPointsTable = await PointsTable.findOne({ league: leagueId });
    if (existingPointsTable) {
      return next(new ErrorHandler("Points table already exists for this league", 400));
    }

    const pointsTable = await PointsTable.create({
      league: leagueId,
      teams: [],
    });

    league.pointsTable=pointsTable._id
    await league.save()

    res.status(201).json({
      success: true,
      message: "Points table created successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updatePTForTeam = async (req, res, next) => {
    try {
      const {id:leagueId}=req.params
      const { teamId,matchesPlayed, wins, losses, ties, netRunRate, position,points } = req.body;
      if (!leagueId || !teamId) {
        return next(new ErrorHandler("Please provide both leagueId and teamId", 404));
      }
      const pointsTable = await PointsTable.findOne({ league: leagueId });
      if (!pointsTable) {
        return next(new ErrorHandler("Points table not found for this league", 404));
      }
  
      const teamIndex = pointsTable.teams.findIndex(team => team.team.toString() === teamId);
      
      if (teamIndex === -1) {
        pointsTable.teams.push({
          team: teamId,
          matchesPlayed: 0,
          wins: 0,
          losses: 0,
          ties: 0,
          noResults: 0,
          points: 0,
          netRunRate: 0,
          position: pointsTable.teams.length + 1, 
        });
      }
  
      const team = pointsTable.teams[teamIndex !== -1 ? teamIndex : pointsTable.teams.length - 1];
  
      team.matchesPlayed += matchesPlayed || 0;
      team.wins += wins || 0;
      team.losses += losses || 0;
      team.ties += ties || 0;
      team.netRunRate += netRunRate || 0;
      team.position = position || team.position;
      team.points += points || 0;
  
      await pointsTable.save();
  
      res.status(200).json({
        success: true,
        message: "Points table updated successfully",
      });
  
    } catch (err) {
      next(err);
    }
}

const updatePTForTeamDirectly = async (req, res, next) => {
  try {
    const {id:leagueId}=req.params
    const { teamId,matchesPlayed, wins, losses, ties, netRunRate, position,points } = req.body;
    if (!leagueId || !teamId) {
      return next(new ErrorHandler("Please provide both leagueId and teamId", 404));
    }
    const pointsTable = await PointsTable.findOne({ league: leagueId });
    if (!pointsTable) {
      return next(new ErrorHandler("Points table not found for this league", 404));
    }

    const teamIndex = pointsTable.teams.findIndex(team => team.team.toString() === teamId);
    
    if (teamIndex === -1) {
      pointsTable.teams.push({
        team: teamId,
        matchesPlayed: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        noResults: 0,
        points: 0,
        netRunRate: 0,
        position: pointsTable.teams.length + 1, 
      });
    }

    const team = pointsTable.teams[teamIndex !== -1 ? teamIndex : pointsTable.teams.length - 1];

    team.matchesPlayed = matchesPlayed || team.matchesPlayed;
    team.wins = wins || team.wins;
    team.losses = losses || team.losses;
    team.ties = ties || team.ties;
    team.netRunRate = netRunRate || team.netRunRate;
    team.position = position || team.position;
    team.points = points || team.points;

    await pointsTable.save();

    res.status(200).json({
      success: true,
      message: "Points table directly updateded",
    });

  } catch (err) {
    next(err);
  }
}

const deletePointsTable = async (req, res, next) => {
    try {
      const { leagueId } = req.params;
  
      const pointsTable = await PointsTable.findOne({ league: leagueId });
  
      if (!pointsTable) {
        return next(new ErrorHandler("Points table not found for this league", 404));
      }
  
      await PointsTable.deleteOne({ league: leagueId });
  
      res.status(200).json({
        success: true,
        message: "Points table deleted successfully",
      });
  
    } catch (err) {
      next(err);
    }
};

export{
    getPointsTable,
    newPointTable, updatePTForTeam, deletePointsTable, updatePTForTeamDirectly
}


