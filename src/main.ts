import { sendImageToChannel } from "./bot/telegram/bot";
import { generateImage } from "./images/image-generator";
import { getTodayAndTomorrow } from "./utils/date";

export async function main() {
  const [today, tomorrow] = getTodayAndTomorrow();

  const imagePath = await generateImage(
    "./cat.png",
    `Damn it's ${today} already?`,
    "What's next?",
    `A ${tomorrow}? Fuck everything!`
  );

  await sendImageToChannel(imagePath);
}
