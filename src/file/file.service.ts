import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import { retry } from 'rxjs';

@Injectable()
export class FileService {
  private s3: AWS.S3;

  constructor(private config: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
      region: config.get('AWS_REGION'),
    });
  }

  async uploadToS3(file: any, bucketName: string) {
    if (!file?.buffer) {
      throw new Error('No file data received');
    }

    const key = `${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      const result = await this.s3.upload(params).promise();
      return {
        url: result.Location,
        key: result.Key,
      };
    } catch (error) {
      throw new Error(`S3 Upload Error: ${error.message}`);
    }
  }

  async saveFileLocally(file: any) {
    console.log(file);

    return file;
    if (!file?.buffer) {
      throw new Error('No file data received');
    }

    const uploadPath = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
    const filePath = path.join(uploadPath, filename);

    try {
      await fs.promises.writeFile(filePath, file.buffer);
      return {
        path: filePath,
        url: `/uploads/${filename}`,
        filename,
      };
    } catch (error) {
      throw new Error(`File save error: ${error.message}`);
    }
  }
}