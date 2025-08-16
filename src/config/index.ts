import dotenv from "dotenv";

dotenv.config();

export default {
  BOT_TOKEN: process.env.BOT_TOKEN,
  CHANNEL_ID: process.env.CHANNEL_ID,
};
