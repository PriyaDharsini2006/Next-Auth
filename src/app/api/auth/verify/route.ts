import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/pages/auth/register?error=Missing verification token`
      );
    }

    const user = await prisma.user.findUnique({
      where: { verifyToken: token },
    });

    if (!user) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/pages/auth/register?error=Invalid verification token`
      );
    }

    
    if (!user.verifyTokenExpires || user.verifyTokenExpires < new Date()) {
     
      await prisma.user.delete({
        where: { id: user.id },
      });

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/pages/auth/register?error=Verification link expired. Please register again.`
      );
    }

    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verifyToken: null,
        verifyTokenExpires: null,
      },
    });

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/pages/auth/login?message=Email verified successfully. You can now login.`
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/pages/auth/register?error=Error verifying email`
    );
  }
}