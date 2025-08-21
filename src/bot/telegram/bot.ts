import TelegramBot from "node-telegram-bot-api";
import config from "../../config";

const BOT_TOKEN = config.BOT_TOKEN;
const CHANNEL_ID = config.CHANNEL_ID;

if (!BOT_TOKEN) {
  throw new Error("Lack of credentials - bot token");
}

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

export async function sendImageToChannel(
  imageBuffer: Buffer,
  caption?: string
) {
  if (!CHANNEL_ID) {
    throw new Error("Lack of credentials - channel id");
  }

  try {
    await bot.sendPhoto(CHANNEL_ID, imageBuffer, { caption });
    console.log("Image sent successfully!");
  } catch (err) {
    console.error("Failed to send image:", err);
  }
}

export async function sendVideoToChannel(
  videoBuffer: Buffer,
  caption?: string
) {
  if (!CHANNEL_ID) {
    throw new Error("Lack of credentials - channel id");
  }

  try {
    await bot.sendVideo(CHANNEL_ID, videoBuffer, { caption });
    console.log("Video sent successfully!");
  } catch (err) {
    console.error("Failed to send video:", err);
  }
}
