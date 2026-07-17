import {  v2 as cloudinary} from "cloudinary";

    
export const initCloudinary=()=>{

  const cloudName =process.env.CLOUDINARY_CLOUD_NAME;
  const apikey=process.env. CLOUDINARY_API_KEY
  const secretKey=process.env.CLOUDINARY_API_SECRET

  if (!cloudinary|| !apikey||!secretKey) {
    throw new Error('clodinary secret are missing ')
    
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apikey,
    api_secret: secretKey,

  })
  return cloudinary;
}
