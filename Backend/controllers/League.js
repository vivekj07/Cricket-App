import moment from "moment/moment.js"

import { ErrorHandler } from "../middlewares/error.js"
import { League } from "../models/League.js"
import { PointsTable } from "../models/PointsTable.js"

const getLeagueDetails=async (req,res,next)=>{
  try{
      const {id}=req.params
      const league= await League.findById(id)
      .populate("teams","logo name shortName")
      .populate({
        path:"pointsTable",
        populate:[
          {
            path:"league",
            select:"name"
          },
          {
            path:"teams.team",
            select:"logo name shortName"
          },
        ]
      });
      res.status(200).json({
          success:true,
          league
      })
  }
  catch(err){
      next(err)
  }
  
}

const getAllLeagues=async (req,res,next)=>{
    try{
        const leagues= await League.find()
        // .populate("teams","logo name shortName")
        // .populate({
        //   path:"pointsTable",
        //   populate:[
        //     {
        //       path:"league",
        //       select:"name"
        //     },
        //     {
        //       path:"teams.team",
        //       select:"logo name shortName"
        //     },
        //   ]
        // });

        res.status(200).json({
            success:true,
            leagues
        })
    }
    catch(err){
        next(err)
    }
    
}

const newLeague=async (req,res,next)=>{
    try{
        const {name,startDate,endDate,season,format,description}=req.body

        if(!name || !startDate|| !endDate|| !format) return next(new ErrorHandler("Please fill all fields!",400))
        // const StartDate = new Date(moment(startDate, "DD-MM-YYYY").format());
        // const EndDate = new Date(moment(endDate, "DD-MM-YYYY").format());

        const league=await  League.create({
            name,startDate,endDate,season,format,teams:[],description
        })

        const pointsTable= await PointsTable.create({
          league: league._id,
          teams: [],
        })

        league.pointsTable=pointsTable._id
        await league.save()

        res.status(200).json({
            success:true,
            meassage:"New League Created Successfully"
        })
    }
    catch(err){
        next(err)
    }
}


const updateLeague = async (req, res, next) => {
  try {
    const { id:leagueId } = req.params; 
    if (!leagueId) {
        return next(new ErrorHandler("Please Provide league Id", 404));
    }
    
    const { name, startDate, endDate, season, format, teams, winner, description } = req.body;

    const league = await League.findById(leagueId);
    if (!league) {
      return next(new ErrorHandler("League not found!", 404));
    }

    let StartDate, EndDate;
    if (startDate) StartDate = new Date(moment(startDate, "DD-MM-YYYY").format());
    if (endDate) EndDate = new Date(moment(endDate, "DD-MM-YYYY").format());

    league.name = name || league.name;
    league.startDate = StartDate || league.startDate;
    league.endDate = EndDate || league.endDate;
    league.season = season || league.season;
    league.format = format || league.format;
    league.teams = teams || league.teams;
    league.winner = winner || league.winner;
    league.description = description || league.description;

    await league.save();

    return res.status(200).json({
      success: true,
      message: "League updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteLeague = async (req, res, next) => {
    try {
      const { id:leagueId } = req.params;
  
      const league = await League.findById(leagueId);
      if (!league) {
        return next(new ErrorHandler("League not found", 404));
      }
  
      await League.findByIdAndDelete(leagueId)
      return res.status(200).json({
        success: true,
        message: "League deleted successfully",
      });
    } catch (err) {
      next(err);
    }
};

const addTeams = async (req, res, next) => {
  try {
    const { id: leagueId } = req.params;
    const { teams } = req.body;

    if (!teams || teams.length === 0) {
      return next(new ErrorHandler("Please Provide Teams to Add", 400));
    }

    const league = await League.findById(leagueId);
    if (!league) {
      return next(new ErrorHandler("League not found", 404));
    }

    const filteredTeams = teams.filter(team => !league.teams.includes(team));

    if (filteredTeams.length === 0) {
      return res.status(200).json({
        success: true,
        message: "All Teams Already Present in League",
      });
    }

    league.teams.push(...filteredTeams);
    await league.save();

    res.status(200).json({
      success: true,
      message: "Teams added to the league successfully",
    });
  } catch (err) {
    next(err);
  }
};

const removeTeam = async (req, res, next) => {
  try {
    const { id: leagueId } = req.params;
    const { team } = req.body;

    const league = await League.findById(leagueId);
    if (!league) {
      return next(new ErrorHandler("League not found", 404));
    }

    const updatedTeams = league.teams.filter(teamId => teamId != team);

    league.teams = updatedTeams;
    await league.save();

    res.status(200).json({
      success: true,
      message: "Team removed from the league successfully",
    });
  } catch (err) {
    next(err);
  }
};








export {getLeagueDetails,getAllLeagues,newLeague,updateLeague, deleteLeague, addTeams, removeTeam}