import path from "path";
import fs from "fs";
import { sendImageToChannel } from "./bot/telegram/bot";
import { generateImage } from "./images/image-generator";
import { getTodayAndTomorrow, isWednesday } from "./utils/date";

export async function main() {
  const [today, tomorrow] = getTodayAndTomorrow();

  const buffer = await generateImage(
    path.join(__dirname, "cat.png"),
    `Damn it's ${today} already?`,
    "What's next?",
    `A ${tomorrow}? Fuck everything!`
  );

  await sendImageToChannel(buffer);

  // TO BE REMOVED
  if (isWednesday() || true) {
    const wednesdayImage = fs.readFileSync("./images/wednesday.jpg");
    await sendImageToChannel(wednesdayImage);
  }
}
