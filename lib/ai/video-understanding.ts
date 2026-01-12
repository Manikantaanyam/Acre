import * as fs from "fs";
import { Gemini } from "./gemini";

const ai = Gemini();

export default async function videoUnderstanding(path: string, prompt: string) {
  try {
    const myfile = await ai.files.upload({
      file: path,
      config: { mimeType: "video/mp4" },
    });

    if (!myfile.name || !myfile.uri || !myfile.mimeType) {
      throw new Error("No video");
    }

    let fileMetadata = await ai.files.get({ name: myfile.name });

    while (fileMetadata.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      fileMetadata = await ai.files.get({ name: myfile.name });
    }

    if (fileMetadata.state === "FAILED") {
      throw new Error("Video processing failed on server.");
    }

    console.log("\nVideo is ACTIVE. Generating response...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          fileData: {
            fileUri: fileMetadata.uri,
            mimeType: fileMetadata.mimeType,
          },
        },
        { text: prompt },
      ],
    });

    console.log("response", response.text);
  } catch (e) {
    console.log("Error", e);
  } finally {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }
}
