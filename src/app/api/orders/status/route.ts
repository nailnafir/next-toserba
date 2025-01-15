import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const code = body.data.reference_id;

    await prisma.order.update({
      where: {
        code: code,
      },
      data: {
        status: body.data.status === "SUCCEDED" ? "success" : "failed",
      },
    });
  } catch (error) {
    console.log("API Orders Status Error: ", error);
    
    return NextResponse.json({
      success: false,
    });
  }

  return NextResponse.json({
    success: true,
  });
}
