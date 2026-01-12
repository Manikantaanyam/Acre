import * as fs from "fs";
import { Gemini } from "./gemini";

const ai = Gemini();

export default async function imageUnderstanding(path: string, prompt: string) {
  try {
    const base64ImageFile = fs.readFileSync(path, { encoding: "base64" });

    const content = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile,
        },
      },
      { text: prompt },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: content,
    });

    console.log(response.text);
  } catch (error) {
    console.error("Image Processing Error:", error);
    throw error;
  } finally {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }
}
