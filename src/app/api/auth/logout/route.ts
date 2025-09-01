import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.redirect(new URL("/auth/login", req.url));

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });

    response.cookies.set("user", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });

    response.cookies.set("token_exp", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("Error in logout route:", error);
    return NextResponse.json(
      { message: "Failed to log out. Please try again." },
      { status: 500 }
    );
  }
}
