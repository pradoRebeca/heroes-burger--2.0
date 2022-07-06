import { Schema, model, Document } from "mongoose";

interface ProductInterface extends Document {
  name: string;
  descrption: string;
  price: number;
  promotionPrice?: number;
  image?: string;
}

const ProductSchema = new Schema({
  name: { type: String, require: true, index: { unique: true } },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  promotionPrice: Number,
  image: String
});

export default model<ProductInterface>("Product", ProductSchema);
