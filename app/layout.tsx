import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "MeetMeHalfway",
  description: "Find the perfect meeting spot between two locations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body className="bg-cream font-quicksand min-h-screen">
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
