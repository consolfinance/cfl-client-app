import type { Metadata } from "next";
import { Geist, Geist_Mono, Questrial } from "next/font/google";
import {
  Theme,
  // ThemePanel
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "@radix-ui/themes/tokens/base.css";
import "@/styles/base/reset.scss";
import AuthWrapper from "@/components/Auth/AuthWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Consol Finance",
  description: "Consol Finance App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${questrial.variable}`}
      >
        <Theme
          accentColor="purple"
          // appearance="dark"
        >
          <AuthWrapper>
            <div className="page">{children}</div>
          </AuthWrapper>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
