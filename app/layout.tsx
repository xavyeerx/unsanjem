import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Preloader from "@/components/preloader";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "UNS Anjem - Antar Jemput Mahasiswa UNS",
  description:
    "Solusi mobilitas terpercaya untuk mahasiswa UNS. Pesan antar jemput dengan mudah hanya melalui satu chat.",
  icons: {
    icon: "/icon-light-32x32.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistMono.variable} font-sans antialiased`}>
        <Preloader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
