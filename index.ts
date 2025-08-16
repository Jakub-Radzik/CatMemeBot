import { sendImageToChannel } from "./src/bot/telegram/bot";
import { generateImage } from "./src/images/image-generator";
import { getTodayAndTomorrow } from "./src/utils/date";

const [today, tomorrow] = getTodayAndTomorrow();

async function main() {
  const imagePath = await generateImage(
    "./src/cat.png",
    `Damn it's ${today} already?`,
    "What's next?",
    `A ${tomorrow}? Fuck everything!`
  );

  await sendImageToChannel(imagePath);
}

main().catch(console.error);
