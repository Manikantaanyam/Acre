import { serve } from "inngest/next";
import { inngest } from "@/lib/ingest/inngest";
import downloadCloudinaryVideoAndProcessWithAi from "@/lib/download";
import prisma from "@/lib/prisma";

const processVideoAI = inngest.createFunction(
  { id: "process-item-scenes" },
  { event: "item.uploaded" },
  async ({ event, step }) => {
    const { itemId, type } = event.data;

    const item = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    await prisma.item.update({
      where: { id: itemId },
      data: {
        status: "PROCESSING",
      },
    });

    console.log(item.storageUrl);
    const result = await step.run("gemini-analysis", async () => {
      return await downloadCloudinaryVideoAndProcessWithAi(
        item.storageUrl as string,
        "my_file",
        type
      );
    });

    await prisma.item.update({
      where: { id: itemId },
      data: { status: "READY" },
    });

    return { success: true, aiOutput: result };
  }
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processVideoAI],
});
