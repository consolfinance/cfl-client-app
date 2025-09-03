import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { dummyLoanTypes } from "@/utils/dummy/loantypes";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ loanId: string }>;
}) {
  const { loanId } = await params;
  const token = (await cookies()).get("token")?.value;

  // Find the corresponding loan type from dummy data
  const matchedLoan = dummyLoanTypes.find((loan) => loan.slug === loanId);

  if (!matchedLoan) {
    // If the loan doesn't exist, redirect to 404 or a fallback
    return redirect("/404");
  }

  // Payload to send to your API route
  const payload = {
    loanType: matchedLoan.type,
    loanSlug: matchedLoan.slug,
    name: matchedLoan.name,
    description: matchedLoan.description,
    step: 1,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/application/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        referer: process.env.NEXT_PUBLIC_APP_URL as string,
        authorization: `Bearer ${token}`,
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store", // disable caching to ensure fresh request
    }
  );

  if (!response.ok) {
    const data = await response.json();
    console.error("Failed to create loan application:", data);
    return redirect("/?error=failed-to-create-application");
  }

  const data = await response.json();

  // Redirect to the application page
  return redirect(`/applications/${data.documentId}`);
}
