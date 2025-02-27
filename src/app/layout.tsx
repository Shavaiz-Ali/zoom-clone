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
  title: "YOOM",
  description: "Video calling App",
  icons: {
    icon: "/logo-mobile.svg",
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
