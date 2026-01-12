import { serve } from "inngest/next";
import { inngest } from "@/lib/ingest/inngest";
import downloadCloudinaryVideoAndProcessWithAi from "@/lib/download";

const processVideoAI = inngest.createFunction(
  { id: "process-video-scenes" },
  { event: "video.uploaded" },
  async ({ event, step }) => {
    const { videoUrl, type } = event.data;

    const result = await step.run("gemini-analysis", async () => {
      if(type ==="video"){
        
      }
      return await downloadCloudinaryVideoAndProcessWithAi(
        videoUrl,
        "my_file",
        "video.mp4"
      );
    });

    return { success: true, aiOutput: result };
  }
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processVideoAI],
});
