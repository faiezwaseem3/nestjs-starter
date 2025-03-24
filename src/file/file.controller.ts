import { Controller, Post, UploadedFile, UseInterceptors, UseGuards, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UploadTypeDto } from './dto/upload-type.dto';
import { Multer } from 'multer'
@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload/local')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: UploadTypeDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload file to local storage' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  async uploadLocal(@UploadedFile() file: Multer.File) {
    return this.fileService.saveFileLocally(file);
  }

  @Post('upload/s3')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload to S3',
    type: UploadTypeDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload file to AWS S3' })
  @ApiResponse({ status: 201, description: 'File uploaded to S3 successfully' })
  async uploadS3(@UploadedFile() file: Multer.File) {
    const bucketName = this.fileService['config'].get('AWS_BUCKET_NAME');
    return this.fileService.uploadToS3(file, bucketName);
  }
}