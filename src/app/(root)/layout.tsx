// import "./globals.css";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1 relative lg:shrink">
        <Header />
        <main className="flex h-screen flex-1 flex-col px-4 pb-6 pt-28 max-md:pb-14 sm:px-6 lg:px-14 bg-dark-2 overflow-y-auto">
          {children}
        </main>
      </div>
      <Toaster />
      <NextTopLoader color="#0E78F9" showSpinner={false} />
    </div>
  );
}
