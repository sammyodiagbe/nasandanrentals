import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/app-components/footer";
import Navbar from "@/components/app-components/navabar";
import { Suspense } from "react";

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
      <body className="bg-background text-foreground ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto] ">
            <Navbar />
            <Suspense>{children}</Suspense>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
