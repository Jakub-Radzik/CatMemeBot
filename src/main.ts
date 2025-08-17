import path from "path";
import fs from "fs";
import { sendImageToChannel } from "./bot/telegram/bot";
import { generateImage } from "./images/image-generator";
import { getTodayAndTomorrow, isSunday, isWednesday } from "./utils/date";

export async function main() {
  const [today, tomorrow] = getTodayAndTomorrow();

  const buffer = await generateImage(
    path.join(__dirname, "cat.png"),
    `Damn it's ${today} already?`,
    "What's next?",
    `A ${tomorrow}? Fuck everything!`
  );

  await sendImageToChannel(buffer);

  if (isWednesday()) {
    const wednesdayImage = fs.readFileSync(
      path.join(__dirname, "./images/wednesday.jpg")
    );
    await sendImageToChannel(wednesdayImage);
  }
}

export async function sunday() {
  if (isSunday()) {
    const sundayImage = fs.readFileSync(
      path.join(__dirname, "./images/sunday.jpg")
    );
    await sendImageToChannel(sundayImage);
  }
}
