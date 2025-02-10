import { ErrorHandler } from "../middlewares/error.js";
import { Umpire } from "../models/Umpire.js";
import { deleteFilesFromCloudinary, uploadFlilesToCloudinary } from "../utils/features.js";

const getUmpireDetails = async (req, res, next) => {
  try {
    const {id}= req.params
    const umpire = await Umpire.findById(id); 

    res.status(200).json({
      success: true,
      umpire,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUmpires = async (req, res, next) => {
    try {
      const umpires = await Umpire.find().sort({ fullName: 1 }); 
  
      res.status(200).json({
        success: true,
        umpires,
      });
    } catch (err) {
      next(err);
    }
};

const searchUmpireByName = async (req, res, next) => {
    const { name } = req.query;
  
    try {
      const umpires = await Umpire.find({ fullName: { $regex: name, $options: "i" } }).sort({ fullName: 1 });
  
      res.status(200).json({
        success: true,
        umpires,
      });
    } catch (err) {
      next(err);
    }
};
  

const newUmpire = async (req, res, next) => {
  try {
    const { fullName, country, role, experienceYears, dob, status, matchesOfficiatedDetails } = req.body;
    const file = req.file; 

    if (!file) return next(new ErrorHandler("Please add umpire photo", 400));

    if (!fullName || !country || !dob) {
      return next(new ErrorHandler("Please provide all required fields (fullName, country, dob)", 400));
    }

    const results = await uploadFlilesToCloudinary([file], "CricketApp/UmpirePhotos");
    const photo = {
      public_id: results[0].public_id,
      url: results[0].url,
    };

    const umpire = await Umpire.create({
      fullName,
      country,
      role: role || "On-field", 
      experienceYears: experienceYears || 0, 
      photo,
      dob,
      status: status || "Active", 
      matchesOfficiatedDetails: matchesOfficiatedDetails || [],
    });

    res.status(201).json({
      success: true,
      message: "Umpire created successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateUmpire = async (req, res, next) => {
    try {
      const { id:umpireId } = req.params;
      const { fullName, country, role, experienceYears, dob, status, matchesOfficiatedDetails,matchesOfficiated } = req.body;
      const file = req.file;
  
      console.log()
      const umpire = await Umpire.findById(umpireId);
      if (!umpire) return next(new ErrorHandler("Umpire not found", 404));
  
      let updatedPhoto = umpire.photo;
      if (file) {
        const results = await uploadFlilesToCloudinary([file], "CricketApp/UmpirePhotos");
        updatedPhoto = {
          public_id: results[0].public_id,
          url: results[0].url
        };
  
        if (umpire.photo.public_id) {
          await deleteFilesFromCloudinary([umpire.photo.public_id]);
        }
      }
  
      umpire.fullName = fullName || umpire.fullName;
      umpire.photo = updatedPhoto;
      umpire.country = country || umpire.country;
      umpire.role = role || umpire.role;
      umpire.experienceYears = experienceYears ?? umpire.experienceYears;
      umpire.dob = dob || umpire.dob;
      umpire.status = status || umpire.status;
      umpire.matchesOfficiated = matchesOfficiated || umpire.matchesOfficiated;
      umpire.matchesOfficiatedDetails = matchesOfficiatedDetails || umpire.matchesOfficiatedDetails;
  
      await umpire.save();
  
      res.status(200).json({
        success: true,
        message: "Umpire updated successfully",
      });
    } catch (err) {
      next(err);
    }
};

const deleteUmpire = async (req, res, next) => {
    try {
      const { id:umpireId } = req.params;
  
      const umpire = await Umpire.findById(umpireId);
      if (!umpire) return next(new ErrorHandler("Umpire not found", 404));
  
      if (umpire.photo.public_id) {
        await deleteFilesFromCloudinary([umpire.photo.public_id]);
      }
  
      await umpire.deleteOne();
  
      res.status(200).json({
        success: true,
        message: "Umpire deleted successfully",
      });
    } catch (err) {
      next(err);
    }
};
  

export { 
    getAllUmpires,searchUmpireByName,
    newUmpire, updateUmpire, deleteUmpire, getUmpireDetails
};
