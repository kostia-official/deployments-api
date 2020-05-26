import mongoose, { Schema, Document } from 'mongoose';

export interface ITemplate extends Document {
  name: string;
  versions: string[];
}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    versions: [String]
  },
  { timestamps: false }
);

export const TemplatesModel = mongoose.model<ITemplate>('Template', schema);
