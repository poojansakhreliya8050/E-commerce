const { v2 } = require('cloudinary');
const fs = require('fs');


v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        //   upload file on cloudinary!!
        const response = await v2.uploader.upload(localFilePath, { resource_type: "auto" });
        console.log("File is uploaded successfully on cloudinary", response.url);

        //after uploaded delete that file from server
        fs.unlinkSync(localFilePath)

        return response;
    }
    catch (e) {
        console.log("cloudinary Error!!", e);
        //any error aries from file so delete that file from server
        fs.unlinkSync(localFilePath)
        return null
    }
}

module.exports = uploadOnCloudinary

