import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import config from "../../config";

const DISCORD_TOKEN = config.DISCORD_TOKEN;
const CHANNEL_ID = config.DISCORD_CHANNEL_ID;

export async function sendImageOnce(imageBuffer: Buffer, caption?: string) {
  if (!DISCORD_TOKEN) throw new Error("❌ Missing Discord token");
  if (!CHANNEL_ID) throw new Error("❌ Missing Discord channel id");

  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });

  try {
    await client.login(DISCORD_TOKEN);
    const channel = (await client.channels.fetch(CHANNEL_ID)) as TextChannel;
    if (!channel) throw new Error("❌ Channel not found");

    await channel.send({
      content: caption ?? "",
      files: [{ attachment: imageBuffer, name: "image.png" }],
    });

    console.log("📸 Image sent to Discord successfully!");
  } catch (err) {
    console.error("❌ Failed to send image:", err);
  } finally {
    await client.destroy(); // logout & close connection
  }
}

export async function sendVideoOnce(videoBuffer: Buffer, caption?: string) {
  if (!DISCORD_TOKEN) throw new Error("❌ Missing Discord token");
  if (!CHANNEL_ID) throw new Error("❌ Missing Discord channel id");

  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });

  try {
    await client.login(DISCORD_TOKEN);
    const channel = (await client.channels.fetch(CHANNEL_ID)) as TextChannel;
    if (!channel) throw new Error("❌ Channel not found");

    await channel.send({
      content: caption ?? "",
      files: [{ attachment: videoBuffer, name: "video.mp4" }],
    });

    console.log("🎥 Video sent to Discord successfully!");
  } catch (err) {
    console.error("❌ Failed to send video:", err);
  } finally {
    await client.destroy(); // logout & close connection
  }
}
