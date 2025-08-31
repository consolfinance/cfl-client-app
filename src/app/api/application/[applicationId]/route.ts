import { cookies } from "next/headers";
import axios from "axios";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { applicationId } = await params;

    const { data } = await axios.get(
      `${process.env.API_URL}/loan-applications/user/${applicationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ applicationId: string }> }
) => {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { applicationId } = await params;

    const body = await request.json();

    const { data } = await axios.put(
      `${process.env.API_URL}/loan-applications/user/${applicationId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
};
