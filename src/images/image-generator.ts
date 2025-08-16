import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import path from "path";

export async function generateImage(
  imagePath: string,
  topText: string,
  bottomText: string,
  bottomText2: string
): Promise<string> {
  const image = await loadImage(imagePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);

  ctx.font = "bold 65px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  const drawTextWithBackground = (
    text: string,
    x: number,
    y: number,
    boxVpos: number
  ) => {
    const metrics = ctx.measureText(text);
    const textHeight = 70; // Approx height of font
    const padding = 10;

    ctx.fillStyle = "black";
    ctx.fillRect(
      x - metrics.width / 2 - padding,
      boxVpos,
      metrics.width + padding * 2,
      textHeight + padding * 2
    );

    ctx.fillStyle = "white";
    ctx.fillText(text, x, y + textHeight / 2 - padding);
  };

  // Top text
  ctx.textBaseline = "top";
  drawTextWithBackground(topText, image.width / 2, 20, 45);

  // Bottom text
  ctx.textBaseline = "bottom";
  drawTextWithBackground(
    bottomText,
    image.width / 2,
    image.height - 160,
    image.height - 215
  );

  // Bottom second text
  ctx.textBaseline = "bottom";
  drawTextWithBackground(
    bottomText2,
    image.width / 2,
    image.height - 50,
    image.height - 105
  );

  const outPath = path.join(__dirname, "../images/output.png");
  fs.writeFileSync(outPath, canvas.toBuffer("image/png"));

  return outPath;
}
