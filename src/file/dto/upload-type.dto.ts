import { ApiProperty } from '@nestjs/swagger';

export class UploadTypeDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  file: any;
}