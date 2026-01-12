import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { Stream } from "stream";
import videoUnderstanding from "./ai/video-understanding";
import { EFFICIENT_PROMPT } from "@/prompts/video-prompt";

export default async function downloadCloudinaryVideoAndProcessWithAi(
  url: string,
  targetDirectory: string,
  fileName: string
): Promise<void> {
  const uniquePrefix = Date.now();
  const uniqueFileName = `${uniquePrefix}_${fileName}`;
  const outputPath = path.resolve(targetDirectory, uniqueFileName);

  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
  }

  try {
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    const writer = fs.createWriteStream(outputPath);
    (response.data as Stream).pipe(writer);

    await new Promise<void>((resolve, reject) => {
      writer.on("finish", () => resolve());
      writer.on("error", (err) => reject(err));
    });

    console.log(`Successfully downloaded: ${fileName}`);

    const normalizedPath = outputPath.replace(/\\/g, "/");
    videoUnderstanding(normalizedPath, EFFICIENT_PROMPT);
  } catch (error) {
    console.error("Error in the download/upload pipeline:", error);
    throw error;
  }
}
