import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BannerDocument = HydratedDocument<Banner>;

@Schema({ _id: false })
export class BannerImage {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  key: string;
}

@Schema({ timestamps: true })
export class Banner {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, default: '/' })
  path: string;

  @Prop({ type: [BannerImage], required: true })
  images: BannerImage[];

  @Prop({ default: 'active', enum: ['active', 'inactive'] })
  status: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);