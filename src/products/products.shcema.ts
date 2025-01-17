import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ min: 0 })
  price: number;

  @Prop({ min: 1 })
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
