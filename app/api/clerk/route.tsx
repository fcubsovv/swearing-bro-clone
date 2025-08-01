import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "@/node_modules/next/headers";
import { NextRequest, NextResponse } from "next/server";

interface WebhookData {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string;
  lastname: string;
  image_url: string;
}

export async function POST(req: NextRequest) {
  const wh = new Webhook(process.env.SINGING_SECRET);
  const headerPayload = await headers();
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-signature": headerPayload.get("svix-signature"),
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
    name: `${data.first_name} ${data.lastname}`,
    image: data.image_url,
  };
  await connectDB();

  switch (type) {
    case "user.created":
      await User.create(userData);
      break;
    case "user.updated":
      await User.findByIdAndUpdate(data.id, userData);
    case "user.deleted":
      await User.findByIdAndDelete(data.id);
      break;
    default:
      break;
  }

  return NextResponse.json({ message: "event received" });
}
