import multer from "multer";
import { ErrorHandler } from "./error.js"; 

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5, 
    },
    fileFilter: (req, file, cb) => {
        cb(null, true); 
    },
});

const singleImage = (req, res, next) => {
    upload.single("avatar")(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
            return next(new ErrorHandler("Please Upload File Less Than 5MB", 400));
        } else if (err) {
            return next(new ErrorHandler(err.message, 400));
        }
        next();
    });
};

const multiFile = (req, res, next) => {
    upload.array("files", 10)(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
            return next(new ErrorHandler("Please Upload File Less Than 5MB", 400));
        } else if (err) {
            return next(new ErrorHandler(err.message, 400));
        }
        next();
    });
};

export { singleImage, multiFile };
