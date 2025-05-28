import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HorizontalNav from "@/components/layout/HorizontalNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eric Khodorenko's Portfolio",
  description: "Portfolio of UC Berkeley EECS student Eric Khodorenko",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-neutral-900 text-neutral-200">
        
        <main className="flew-grow pt-16">
          {children} { /* when you visit / (the homepage), content rendered by "src/app/page.tsx" is passed as children to Root Layout here
                        When you visit /about, content rendered by "src/app/about/page.tsx" is passed as children to rootlayout */}
        </main>
      </body>
    </html>
  );
}
// next.js has this {children} thing where basically other parts pages of the website will use Rootlayout, i.e. layout.tsx
//   to essentially build themselves based on that template. they pass in their content into the children part.
//   If you create another website page, like an about section, you put a folder inside app folder called "about", and then put a page.tsx within that folder
//   and that's where you build out that page. and that will be injected into rootlayout where children lies. 