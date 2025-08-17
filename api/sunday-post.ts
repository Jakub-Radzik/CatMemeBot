import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sunday } from "../src/main";
import config from "../src/config";

const { CRON_SECRET } = config;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authHeader = req.headers["authorization"];

  if (!CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ success: false });
  }

  try {
    await sunday();
    res.status(200).send("Image sent!");
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to send image");
  }
}
