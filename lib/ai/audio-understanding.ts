import { createPartFromUri, createUserContent } from "@google/genai";
import { Gemini } from "./gemini";
import * as fs from "fs";

const ai = Gemini();
export default async function audioUnderStanding(path: string, prompt: string) {
  try {
    const myfile = await ai.files.upload({
      file: path,
      config: { mimeType: "audio/mp3" },
    });

    if (!myfile.uri || !myfile.mimeType) {
      throw new Error("No audio");
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(myfile.uri, myfile.mimeType),
        prompt,
      ]),
    });

    console.log(response.text);
  } catch (e) {
    console.log("Error", e);
  } finally {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }
}
