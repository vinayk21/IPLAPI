import {v2 as fileupload} from 'cloudinary'
import fs from 'fs'
fileupload.config({ 
    cloud_name: process.env.FILE_UPLOAD_CLOUD_NAME, 
    api_key: process.env.FILE_UPLOAD_API_KEY, 
    api_secret: process.env.FILE_UPLOAD_API_SECRET 
});

const uploadFileOnCloudnary = async (localfilePath) =>{
    try {
        if(!localfilePath) return null
        //uploadfile on cloudnary
      let responce =  await fileupload.uploader.upload(localfilePath,{
            resource_type:'auto'
        })
        console.log('file uploaded on cloudnary',responce);
    } catch (error) {
        fs.unlinkSync(localfilePath)
    }
}


export  {uploadFileOnCloudnary}