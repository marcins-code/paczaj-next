import { Db, MongoClient } from 'mongodb';

export const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_TEST_DB}?authSource=admin`;
export const connectionOptions = { wtimeoutMS: 2500, useNewUrlParser: true };

class DB {
  static database: Db;
  static client: MongoClient;

  static async setUp(url: string = uri) {
    if (!this.client) {
      await this.setClient(url);
      await this.setConnection();
    }

    return this.database;
  }

  static async setConnection() {
    this.database = this.client.db(process.env.MONGO_TEST_DB);
  }

  static closeConnection() {
     return this.client.close()
  }

  static async setClient(url: string = uri) {
    const client = new MongoClient(url);
    await client.connect();
    this.client = client;
  }
}

export default DB;