import mongoose, { Schema, Document } from 'mongoose';

export interface IDeployment extends Document {
  url: string;
  templateName: string;
  version: string;
  deployedAt: Date;
}

export interface IDeploymentInput {
  url: IDeployment['url'];
  templateName: IDeployment['templateName'];
  version: IDeployment['version'];
}

const schema = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    templateName: {
      type: String,
      required: true
    },
    version: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: 'deployedAt', updatedAt: false } }
);

export const DeploymentsModel = mongoose.model<IDeployment>('Deployment', schema);
