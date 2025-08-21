import path from "path";
import fs from "fs";
import { sendImageToChannel } from "./bot/telegram/bot";
import { generateImage } from "./images/image-generator";
import {
  getTodayAndTomorrow,
  isFriday,
  isSunday,
  isWednesday,
} from "./utils/date";
import { sendImageOnce } from "./bot/discord/bot";

export async function main() {
  const [today, tomorrow] = getTodayAndTomorrow();

  const buffer = await generateImage(
    path.join(__dirname, "cat.png"),
    `Damn it's ${today} already?`,
    "What's next?",
    `A ${tomorrow}? Fuck everything!`
  );

  await sendImageToChannel(buffer);
  await sendImageOnce(buffer);

  if (isFriday()) {
    const fridayVideo = fs.readFileSync(
      path.join(__dirname, "./images/friday_sailer.mp4")
    );
    await sendImageToChannel(fridayVideo);
    await sendImageOnce(fridayVideo);
  }

  if (isWednesday()) {
    const wednesdayImage = fs.readFileSync(
      path.join(__dirname, "./images/wednesday.jpg")
    );
    await sendImageToChannel(wednesdayImage);
    await sendImageOnce(wednesdayImage);
  }
}

export async function sunday() {
  if (isSunday()) {
    const sundayImage = fs.readFileSync(
      path.join(__dirname, "./images/sunday.jpg")
    );
    await sendImageToChannel(sundayImage);
    await sendImageOnce(sundayImage);
  }
}
