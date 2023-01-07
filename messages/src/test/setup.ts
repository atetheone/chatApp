import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod: any;
beforeAll(async () => {
  process.env.JWT_SECRET = "rez433FE";
  mongod = await MongoMemoryServer.create();
  const mongoUri = mongod.getUri();

  await mongoose.disconnect();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongod.stop();
  await mongoose.connection.close();
});
