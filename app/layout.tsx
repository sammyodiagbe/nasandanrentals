import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Footer from "@/components/app-components/footer";
import Navbar from "@/components/app-components/navabar";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import DataContextProvider from "@/context/dataContext";

export const metadata = {
  title: "Nasandan rentals - Cars for rent",
  description: "The fastest and easiest way to get going.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="../assets/images/favicon.svg" sizes="any" />
      </head>
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
