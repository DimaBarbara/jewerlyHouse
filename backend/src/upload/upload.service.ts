import { Injectable, BadRequestException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

interface MulterFile {
  originalname: string;
  buffer: Buffer;
  mimetype: string;
}

@Injectable()
export class UploadService {
  private s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    region: process.env.AWS_REGION!,
  });

  private isMulterFile(file: unknown): file is MulterFile {
    if (typeof file !== 'object' || file === null) return false;
    const obj = file as Record<string, unknown>;

    const originalname = obj['originalname'];
    const buffer = obj['buffer'];
    const mimetype = obj['mimetype'];

    if (typeof originalname !== 'string') return false;
    if (!Buffer.isBuffer(buffer)) return false;
    if (typeof mimetype !== 'string') return false;

    return true;
  }

  async uploadFile(file: unknown): Promise<string> {
    if (!this.isMulterFile(file)) {
      throw new BadRequestException('File is missing or invalid');
    }

    const { originalname, buffer, mimetype } = file;
    const key = `${uuid()}-${originalname.replace(/\s+/g, '_')}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
      ACL: 'public-read',
    };

    try {
      const result = await this.s3.upload(params).promise();

      return result.Location;
    } catch (err) {
      console.error('S3 upload error:', err);
      throw new BadRequestException('Failed to upload file to S3');
    }
  }
}
