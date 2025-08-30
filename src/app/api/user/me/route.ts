import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const { data } = await axios.get(`${process.env.API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = NextResponse.json(
      {},
      {
        status: 200,
      }
    );

    response.cookies.set("user", JSON.stringify(data), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error("Error updating transaction in Strapi:", error);
    if (axios.isAxiosError(error)) {
      console.log({ errResp: error.response, errResData: error.response?.data });
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.error?.message ?? "An error occurred";
      const details =
        error.response?.data?.error?.details ?? "No additional details available";
      return new Response(JSON.stringify({ message, details }), { status });
    }
    return new Response("An error occurred", { status: 500 });
  }
}
