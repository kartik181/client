import type { Metadata } from "next";
import { Source_Sans_3 as FrontSans } from "next/font/google";
import "./globals.css";

const fontSans =FrontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: "AI-Poweredd PDF Summarization",
  description: "Save hours of reading time. Transform lengthy PDF into clear, accurate summaries in seconds. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
