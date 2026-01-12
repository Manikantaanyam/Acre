import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { inngest } from "@/lib/ingest/inngest";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json(
        { msg: "No input file is provided" },
        { status: 400 }
      );
    }

    const file = formData.get("file") as File | null;
    const fileType = formData.get("fileType") as string | null;

    if (!file || !fileType) {
      return NextResponse.json({ msg: "Missing data" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    await inngest.send({
      name: "video.uploaded",
      data: {
        videoUrl: uploadResult.secure_url,
        type: fileType,
      },
    });

    return NextResponse.json({
      sucess: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      resource_type: uploadResult.resource_type,
    });
  } catch (e) {
    console.log("eror", e);
    return NextResponse.json(
      {
        msg: "Upload Failed",
      },
      { status: 500 }
    );
  }
}
