// import { cookies } from "next/headers";
// import axios from "axios";
// import FormData from "form-data"; // ✅ Node version

// export async function POST(request: Request) {
//   try {
//     const token = (await cookies()).get("token")?.value;
//     const user = (await cookies()).get("user")?.value;
//     if (!token) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     // Parse the incoming form data (from the browser)
//     const incomingFormData = await request.formData();

//     // Convert to Node-compatible form-data
//     const form = new FormData();
//     console.log({ incomingFormData });
//     for (const [key, value] of incomingFormData.entries()) {
//       const fileName = `user-${JSON?.parse(user ?? "{}")?.documentId}_${
//         (value as File)?.name
//       }`;
//       if (typeof value === "string") {
//         form.append(key, value);
//       } else {
//         const arrayBuffer = await (value as Blob).arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);
//         form.append("files", buffer, fileName);
//       }
//     }

//     // Axios request with proper headers
//     const { data } = await axios.post(`${process.env.API_URL}/upload`, form, {
//       headers: {
//         ...form.getHeaders(),
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error updating transaction in Strapi:", error);
//     if (axios.isAxiosError(error)) {
//       console.log({ errResp: error.response, errResData: error.response?.data });
//       const status = error.response?.status ?? 500;
//       const message = error.response?.data?.error?.message ?? "An error occurred";
//       const details =
//         error.response?.data?.error?.details ?? "No additional details available";
//       return new Response(JSON.stringify({ message, details }), { status });
//     }
//     return new Response("An error occurred", { status: 500 });
//   }
// }

import { cookies } from "next/headers";
import axios from "axios";
import FormData from "form-data"; // Node.js compatible

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    const user = (await cookies()).get("user")?.value;
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Parse the incoming form data (from the browser)
    const incomingFormData = await request.formData();

    // Extract files and their keys (assuming frontend sends "files" and "fileKeys")
    const files = incomingFormData.getAll("files");
    const fileKeys = incomingFormData.getAll("fileKeys");

    // Convert to Node-compatible form-data
    const form = new FormData();

    // Keep track of keys & fileNames to return later
    const uploadMap: { fileKey: string; fileName: string }[] = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const fileKeyEntry = fileKeys[index];

      // Ensure fileKey is a string or fallback
      const fileKey =
        typeof fileKeyEntry === "string" ? fileKeyEntry : `file-${index}`;

      if (typeof file === "string") {
        // If it's a string (shouldn't be for files), skip it
        continue;
      }

      // Compose fileName with user info
      const fileName = `user-${JSON?.parse(user ?? "{}")?.documentId}_${file.name}`;

      // Convert Blob/File to Buffer for Node
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      form.append("files", buffer, fileName);

      uploadMap.push({ fileKey, fileName });
    }

    // Make request to Strapi upload endpoint
    const { data } = await axios.post(`${process.env.API_URL}/upload`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`,
      },
    });

    // Map Strapi response files with their corresponding fileKey
    // Assumes Strapi response data is an array of uploaded file objects
    // and order is the same as uploadMap order
    const filesWithKeys = data.map(
      (file: { id: number; url: string; mime: string }, idx: number) => ({
        id: file.id,
        fileKey: uploadMap[idx]?.fileKey ?? null,
        name: uploadMap[idx]?.fileName ?? null,
        url: file.url,
        mime: file.mime,
      })
    );

    return new Response(JSON.stringify(filesWithKeys), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
