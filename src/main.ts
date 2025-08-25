import path from "path";
import fs from "fs";
import { sendImageToChannel, sendVideoToChannel } from "./bot/telegram/bot";
import { generateImage } from "./images/image-generator";
import {
  getTodayAndTomorrow,
  isFriday,
  isMonday,
  isSunday,
  isWednesday,
} from "./utils/date";
import { sendImageOnce, sendVideoOnce } from "./bot/discord/bot";

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
    await sendVideoToChannel(fridayVideo);
    await sendVideoOnce(fridayVideo);
  }

  if (isWednesday()) {
    const wednesdayImage = fs.readFileSync(
      path.join(__dirname, "./images/wednesday.jpg")
    );
    await sendImageToChannel(wednesdayImage);
    await sendImageOnce(wednesdayImage);
  }

  if (isMonday()) {
    const mondayVideo = fs.readFileSync(
      path.join(__dirname, "./images/monday_sailer.mp4")
    );
    await sendVideoToChannel(mondayVideo);
    await sendVideoOnce(mondayVideo);
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
