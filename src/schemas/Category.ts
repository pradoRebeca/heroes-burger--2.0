import { Schema, model, Document } from "mongoose";

interface CategoryInterface extends Document {
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true, index: { unique: true } },
});

export default model<CategoryInterface>("Category", CategorySchema);
