import { Injectable } from '@nestjs/common';
import { initCloudinary } from '../cloudinary/cloudinary.client';
import { InjectModel } from '@nestjs/mongoose';
import { Media, MediaDocument } from './media/media.shema';
import { rpcBadRequest } from '@app/rpc';

@Injectable()
export class MediaService {
  
  type InputMedia={
    fileName:string;
    mimeType:string;
    base64:string;
    uploadByUserId:string;
  }
  private readonly cloudinary= initCloudinary()
  constructor(
   @InjectModel(Media.name) private mediaModel: Media<MediaDocument>
  )    
   {}

   async  uploadProductImage(input:InputMedia){
   
      if(!input.base64){
         rpcBadRequest("base64 is required")
      }
      if(!input.mimeType.startsWith("image")){
         rpcBadRequest("mimeType must be image")
      }
  const buffer=Buffer.from(input.base64,"base64")
   }

  ping() {
    return {
      ok: true,
      service: "media",
      new: new Date().toISOString()
    };
  }
}
