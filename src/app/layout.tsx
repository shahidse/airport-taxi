import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

export const metadata = {
  title: "Airport Taxi Service",
  description: "Reliable airport transfers made simple.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative text-gray-900  transition-colors">
        {/* Background Image with Blur & Overlay */}
        <div className="fixed inset-0 z-[-1] bg-theme-hero">
          <div className="w-full h-full bg-gray-800/40  backdrop-brightness-70 blur-xs " />
        </div>
        <Navbar />
        <main className="pt-16">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
