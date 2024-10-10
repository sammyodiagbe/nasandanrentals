import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Footer from "@/components/app-components/footer";
import Navbar from "@/components/app-components/navabar";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import DataContextProvider from "@/context/dataContext";

export const metadata = {
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <DataContextProvider>
          <div className="">
            <Navbar />
            <Suspense>
              <div className="min-h-[calc(100vh-70px)]">{children}</div>
            </Suspense>
            <Toaster />
            <Footer />
          </div>
        </DataContextProvider>
      </body>
    </html>
  );
}
