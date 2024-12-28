// app/api/auth/verify/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { message: "Missing verification token" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { verifyToken: token },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verifyToken: null,
      },
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?message=Email verified successfully. You can now login.`);
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Error verifying email" },
      { status: 500 }
    );
  }
}