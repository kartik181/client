import type { Metadata } from "next";
import { Source_Sans_3 as FrontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const fontSans = FrontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AI-Poweredd PDF Summarization",
  description:
    "Save hours of reading time. Transform lengthy PDF into clear, accurate summaries in seconds. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1"> {children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
