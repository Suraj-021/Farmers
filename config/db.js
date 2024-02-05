import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB:", process.env.MongoDB_URL);
    const conn = await mongoose.connect(`${process.env.MongoDB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Connected to MongoDB database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`.bgRed.white);
  }
};

export default connectDB;
