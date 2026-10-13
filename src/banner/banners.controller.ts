import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFiles,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { BannersService } from './banners.service.js';
import { CreateBannerDto } from './create-banner.dto.js';
import { cloudinaryStorage } from "../common/cloudinary/cloudinary.config.js";

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: cloudinaryStorage,
      limits: { fileSize: 200 * 1024 * 1024 },
    }),
  )
  async createBanner(
    @Body() createBannerDto: CreateBannerDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const data = await this.bannersService.createBanner(createBannerDto, files);

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Banner created successfully',
      data,
    };
  }

  @Get()
  async getBanners() {
    const data = await this.bannersService.getAllBanners();

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Banners retrieved successfully',
      data,
    };
  }
}