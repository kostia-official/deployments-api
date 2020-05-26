import mongoose from 'mongoose';

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/deployments';

export const connect = () => {
  return mongoose
    .connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .catch(err => {
      console.error('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    });
};
