import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  try {
    // ✅ already connected
    if (isConnected) {
      console.log("Mongo already connected ✅");
      return;
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing ❌");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 🔥 MAX 5 sec wait
    });

    isConnected = true;

    console.log("MongoDB Connected ✅", conn.connection.host);
  } catch (error) {
    console.log("DB ERROR ❌", error.message);
    throw error; // 🔥 important (warna silent fail hoga)
  }
};

export default connectDB;