import { ErrorHandler } from "../middlewares/error.js";
import { Venue } from "../models/Venue.js";


const getVenue = async (req, res, next) => {
  try {
    const {id}=req.params
    const venue = await Venue.findById(id).populate("homeTeams","name shortName"); 

    res.status(200).json({
      success: true,
      venue,
    });
  } catch (err) {
    next(err);
  }
};

const getAllVenues = async (req, res, next) => {
  try {
    const venues = await Venue.find().sort({ name: 1 }).populate("homeTeams","name shortName"); 

    res.status(200).json({
      success: true,
      venues,
    });
  } catch (err) {
    next(err);
  }
};

const searchVenueByCityOrName = async (req, res, next) => {
    const { city, name } = req.query;

    try {
        const searchCriteria = {};

        if (city) {
            searchCriteria.city = { $regex: city, $options: "i" }; // Case-insensitive search for city
        }

        if (name) {
            searchCriteria.name = { $regex: name, $options: "i" }; // Case-insensitive search for venue name
        }

        const venues = await Venue.find(searchCriteria).sort({ name: 1 }); // Sorting by name

        res.status(200).json({
            success: true,
            venues,
        });
    } catch (err) {
        next(err);
    }
};



const newVenue = async (req, res, next) => {
  try {
    const { name, city, country, capacity, establishedYear, homeTeams, pitchType, floodlights } = req.body;

    if (!name || !city || !country || !capacity || !establishedYear) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const venueExists = await Venue.findOne({ name });
    if (venueExists) {
      return next(new ErrorHandler("Venue with this name already exists", 400));
    }

    const venue = await Venue.create({
      name,
      city,
      country,
      capacity,
      establishedYear,
      homeTeams,
      pitchType,
      floodlights,
    });

    res.status(201).json({
      success: true,
      message: "Venue created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateVenue = async (req, res, next) => {
    const { id:venueId } = req.params;
    const { name, city, country, capacity, establishedYear,matchesHosted, homeTeams, pitchType, floodlights } = req.body;

    try {
        const venue = await Venue.findById(venueId);
        
        if (!venue) {
            return next(new ErrorHandler("Venue not found", 404)); // If no venue is found with the provided ID
        }

        if (name) venue.name = name;
        if (city) venue.city = city;
        if (country) venue.country = country;
        if (capacity) venue.capacity = capacity;
        if (establishedYear) venue.establishedYear = establishedYear;
        if (homeTeams) venue.homeTeams = homeTeams;
        if (pitchType) venue.pitchType = pitchType;
        if (matchesHosted) venue.matchesHosted = matchesHosted;
        if (floodlights !== undefined) venue.floodlights = floodlights;

        await venue.save();

        res.status(200).json({
            success: true,
            message: "Venue updated successfully",

        });
    } catch (err) {
        next(err);
    }
};

const deleteVenue = async (req, res, next) => {
    const { id:venueId } = req.params;

    try {
        const venue = await Venue.findByIdAndDelete(venueId);

        if (!venue) {
            return next(new ErrorHandler("Venue not found", 404)); // If no venue found with the provided ID
        }

        res.status(200).json({
            success: true,
            message: "Venue deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};


export {
    getAllVenues, searchVenueByCityOrName, getVenue,
    newVenue, deleteVenue, updateVenue
}
