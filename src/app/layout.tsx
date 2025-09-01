import type { Metadata } from "next";
import { Geist, Geist_Mono, Questrial } from "next/font/google";
import { View } from "reshaped";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import App from "@/components/Reshaped/App/App";
import Sidebar from "@/components/Sidebar/Sidebar";
import "@radix-ui/themes/styles.css";
import "@radix-ui/themes/tokens/base.css";
import "@/styles/base/reset.scss";
import styles from "./layout.module.scss";

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
        <App>
          <AuthWrapper>
            <View backgroundColor="elevation-raised">
              <div className={styles.page}>
                <Sidebar />
                <div className={styles.pageContent}>{children}</div>
              </div>
            </View>
          </AuthWrapper>
        </App>
      </body>
    </html>
  );
}
