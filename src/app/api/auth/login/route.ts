import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

function decodeJwt(token: string): { exp?: number } {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64").toString("utf-8");
  return JSON.parse(payload);
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const { data } = await axios.post(`${process.env.API_URL}/auth/local`, {
      ...payload,
    });

    const jwt = data.jwt;
    const user = data.user;

    if (!jwt) {
      return NextResponse.redirect(
        new URL("/login?error=MissingToken", request.url)
      );
    }

    await axios.get(`${process.env.API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const decoded = decodeJwt(jwt);
    const now = Math.floor(Date.now() / 1000);

    const exp = decoded.exp ?? now + 60 * 60 * 7;
    const maxAge = Math.max(exp - now, 0);

    const response = NextResponse.json(
      { message: "Successfully authenticated" },
      { status: 200 }
    );

    // Secure, HttpOnly token
    response.cookies.set("token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge,
    });

    // User info (optional, still HttpOnly)
    response.cookies.set("user", JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    // Non-HttpOnly token expiry for client-side reauth checks
    response.cookies.set("token_exp", exp.toString(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
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
