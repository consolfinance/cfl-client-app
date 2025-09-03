import { cookies } from "next/headers";

import axios from "axios";

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    console.log({ token });
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();

    const { data } = await axios.post(
      `${process.env.API_URL}/loan-applications/new`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(data), { status: 200 });
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
