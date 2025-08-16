import type { VercelRequest, VercelResponse } from "@vercel/node";
import { main } from "../main";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await main();
    res.status(200).send("Image sent!");
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to send image");
  }
}
