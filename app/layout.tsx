import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Footer from "@/components/app-components/footer";
import Navbar from "@/components/app-components/navabar";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

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
        <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto] max-w-full">
          <Navbar />
          <Suspense>{children}</Suspense>
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
