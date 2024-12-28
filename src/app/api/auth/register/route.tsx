import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);
    const verifyToken = crypto.randomBytes(32).toString('hex');

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        verifyToken,
        emailVerified: null
      },
    });

  
    await sendVerificationEmail(email, verifyToken);

    return NextResponse.json(
      { message: "User created successfully. Please check your email to verify your account." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}