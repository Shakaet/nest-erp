import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from './banner.schema.js';
import { CreateBannerDto } from './create-banner.dto.js';


@Injectable()
export class BannersService {
  constructor(
    @InjectModel(Banner.name) private readonly bannerModel: Model<BannerDocument>,
  ) {}

  async createBanner(
    createBannerDto: CreateBannerDto,
    files: Express.Multer.File[],
  ): Promise<Banner> {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one banner image is required');
    }

    const images = files.map((file) => ({
      url: file.path,
      key: file.filename,
    }));

    const newBanner = await this.bannerModel.create({
      title: createBannerDto.title,
      path: createBannerDto.path || '/',
      images,
      status: 'active', 
    });

    return newBanner;
  }

  async getAllBanners(): Promise<Banner[]> {
    return this.bannerModel.find().sort({ createdAt: -1 }).exec();
  }
}