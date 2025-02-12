import { ErrorHandler } from "../middlewares/error.js";
import { ContactUS } from "../models/ContactUS.js";

const getContactUSData = async (req, res, next) => {
  try {
    const contactUS = await ContactUS.find().sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      feedbacks:contactUS,
    });
  } catch (err) {
    next(err);
  }
};

const newContactUSData = async (req, res, next) => {  
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return next(new ErrorHandler("Please provide all required fields (name, email, message)", 400));
    }

    await ContactUS.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Thank U for contacting us. We will get back to you soon.",
    });
  } catch (err) {
    next(err);
  }

};

const deleteContactUSData = async (req, res, next) => {
  try {
    const { id:contactUSId } = req.params;

    const contactUS = await ContactUS.findById(contactUSId);
    if (!contactUS) return next(new ErrorHandler("Contact Us data not found", 404));

    await contactUS.deleteOne();

    res.status(200).json({
      success: true,
      message: "Contact Us data deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { getContactUSData, newContactUSData, deleteContactUSData };



