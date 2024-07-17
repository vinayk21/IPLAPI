const cloudinary = require('cloudinary').v2;
const  fs = require('fs');

cloudinary.config({ 
    cloud_name: process.env.FILE_UPLOAD_CLOUD_NAME || 'vinaykamaliya', 
    api_key: process.env.FILE_UPLOAD_API_KEY || '464441878514926', 
    api_secret: process.env.FILE_UPLOAD_API_SECRET || 'w4h1nE3Fjph5S0TKm2ERKFWfwWc'
});

const uploadFileOnCloudnary = async (localfilePath) =>{
    try {
        if(!localfilePath) return null
        //uploadfile on cloudnary
       
        if (!fs.existsSync(localfilePath)) {
            throw new Error(`File not found: ${localfilePath}`);
        }
        let response = await cloudinary.uploader.upload(localfilePath, {
            resource_type: 'auto'
        });
        fs.unlinkSync(localfilePath)
        // console.log('file uploaded on cloudnary',response);
        return response
    } catch (error) {
        fs.unlinkSync(localfilePath)
        console.log("errors--->");
    }
}


module.exports =  {uploadFileOnCloudnary}