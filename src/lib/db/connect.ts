const mongoose = require("mongoose");

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const MONGO_URL = `mongodb://root:example@db:27017/test?authSource=admin`;

const connect = async () => {
  console.log("Connecting to MongoDB...");
  console.log(MONGO_URL);

  await mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      console.log("MongoDB connection error");
      console.error(error);
      process.exit(1);
    });
};

export default connect;
