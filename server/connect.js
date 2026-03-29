import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    const { MONGODB_URI, MONGODB_NAME } = process.env;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_NAME,
    });

    console.log(`MongoDB connected successfully: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("MongoDB initial connection failed:", err.message);
    process.exit(1); // OK to exit during startup
  }
};

// Optional runtime listeners
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});
