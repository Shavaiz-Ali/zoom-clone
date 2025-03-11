import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Sidebar from "@/components/shared/sidebar";
// import Header from "@/components/shared/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yoom - Next-Gen Video Conferencing",
  description:
    "HD video conferencing platform with screen sharing, collaboration tools, and enterprise-grade security",
  keywords: [
    "video conferencing",
    "Zoom alternative",
    "team collaboration",
    "virtual meetings",
    "web conferencing",
    "online meetings",
  ],
  icons: {
    icon: "/logo-mobile.svg",
  },
  openGraph: {
    title: "Yoom - Modern Video Collaboration Platform",
    description:
      "Host and join HD video meetings with screen sharing, recording, and real-time collaboration features",
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Yoom Video Conferencing",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yoom Video Conferencing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoom - Secure Video Conferencing Solution",
    description:
      "Enterprise-grade video collaboration platform with end-to-end encryption and AI-powered features",
    images: ["/images/twitter-card.jpg"],
    creator: "@yoom_team",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            layout: {
              socialButtonsVariant: "iconButton",
              logoImageUrl: "/logo.png",
            },
            variables: {
              colorText: "#ffffff",
              colorPrimary: "#0E78F9",
              colorBackground: "#1C1F2E",
              colorInputBackground: "#252A41",
              colorInputText: "#ffffff",
            },
          }}
        >
          <main className="bg-dark-2 min-h-screen w-full">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
