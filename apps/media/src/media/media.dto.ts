import { IsOptional, IsString } from 'class-validator';

export class UplaodProductImageDto {
  @IsString()
  fileName: string;

  @IsString()
  mineType: string;
  
  @IString()
  base64: string;
  
  @IsString()
  upLoadByUserId: string;
}


export class AttachToProductDto {
  @IsString()
  mediaId: string;

  @IsString()
  productId: string;

  @IsString()
  @IsOptional()
  attachedByUserId?: string;
   

}
