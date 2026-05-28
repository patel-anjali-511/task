import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexLearn | Next-Gen Learning Dashboard",
  description: "A futuristic, highly animated education platform dashboard.",
};

export const viewport: Viewport = {
  themeColor: "#06060e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#06060e] text-white selection:bg-violet-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
