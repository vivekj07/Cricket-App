import { ErrorHandler } from "../middlewares/error.js";
import { FileUplaod } from "../models/FileUpload.js";
import { deleteFilesFromCloudinary, uploadFlilesToCloudinary } from "../utils/features.js";

const getAllFiles = async (req, res,next) => {
  try {
    const files = await FileUplaod.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      files,
    });
  } catch (error) {
    next(error);
  }
}

const newfilesUpload = async (req, res,next) => {
  try {
    const files = req.files;
    const description = req.body.description || "";
    if (!files || files.length === 0) return next(new ErrorHandler("Please Provide Files", 400));

    const results = await uploadFlilesToCloudinary(files, "CricketApp/OtherFiles");

    const arr= results.map(({ public_id, url }) => ({
      file:{public_id,url},
      description,
    }));
    let a=await FileUplaod.insertMany(arr);

    res.status(200).json({
      success: true,
      message: `${a.length} Files uploaded Successfully`,
    });
  }catch (error) {
      next(error);
  }
}

const deleteFile = async (req, res,next) => {   
  try {
    const {publicId} = req.body;
    if (!publicId) return next(new ErrorHandler("Please Provide Public Id", 400));

    const file = await FileUplaod.findOneAndDelete({ "file.public_id": publicId });

    if (!file) return next(new ErrorHandler("File Not Found", 404));

    await deleteFilesFromCloudinary([publicId]);

    res.status(200).json({success:true, message: "Files Deleted Successfully" });
  } catch (error) {
    next(error);
  }
}


export {getAllFiles, newfilesUpload, deleteFile };