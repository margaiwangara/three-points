import mongoose from 'mongoose';

const mongoConfig: object = {
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export default async function() {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`, mongoConfig);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}
