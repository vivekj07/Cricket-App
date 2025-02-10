import multer from "multer"

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

const singleImage = upload.single("avatar")
const multiImage = upload.array("files", 10)

export { singleImage, multiImage }