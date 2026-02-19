import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Platform Pesan Massal WhatsApp SaaS | AutoWhatsApp.web.id",
  description:
    "Platform yang mengutamakan pengembang untuk pesan massal. Integrasikan API multi-tenant kami yang tangguh ke dalam aplikasi Anda dan jangkau pelanggan secara instan di aplikasi favorit mereka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
