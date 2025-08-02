import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

interface WebhookData {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string;
  last_name: string;
  image_url: string;
}

export async function POST(req: NextRequest) {
  const signingSecret = process.env.SIGNING_SECRET;

  if (!signingSecret) {
    throw new Error("SIGNING_SECRET environment variable is not set");
  }

  const wh = new Webhook(signingSecret);

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixSignature = headerPayload.get("svix-signature");
  const svixTimeStamp = headerPayload.get("svix-timestamp");

  if (!svixId || !svixSignature || !svixTimeStamp) {
    return new NextResponse("Missing required headers", { status: 400 });
  }
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixTimeStamp,
    "svix-signature": svixSignature,
  };

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const { data, type } = wh.verify(body, svixHeaders) as {
    data: WebhookData;
    type: string;
  };

  const userData = {
    _id: data.id,
    email: data.email_addresses[0].email_address,
    name: `${data.first_name} ${data.last_name}`,
    image: data.image_url,
  };
  await connectDB();

  switch (type) {
    case "user.created":
      await User.create(userData);
      break;
    case "user.updated":
      await User.findByIdAndUpdate(data.id, userData);
      break;
    case "user.deleted":
      await User.findByIdAndDelete(data.id);
      break;
    default:
      break;
  }

  return NextResponse.json({ message: "event received" });
}
