import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";

registerFont(path.join(__dirname, "../fonts/Arial.ttf"), { family: "Arial" });

export async function generateImage(
  imagePath: string,
  topText: string,
  bottomText: string,
  bottomText2: string
): Promise<Buffer> {
  const image = await loadImage(imagePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);

  ctx.font = "bold 65px Arial";
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

    // Black background box
    ctx.fillStyle = "black";
    ctx.fillRect(
      x - metrics.width / 2 - padding,
      boxVpos,
      metrics.width + padding * 2,
      textHeight + padding * 2
    );

    // White text
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

  // Return image buffer instead of saving to disk
  return canvas.toBuffer("image/png");
}
