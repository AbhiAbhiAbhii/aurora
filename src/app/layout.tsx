import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const GeistVariable = localFont({
  src:'../../public/fonts/GeistVariableVF.woff2',
  weight: '400',
  variable: '--font-geist'
})

export const metadata: Metadata = {
  title: "Aurora-Gradical",
  description: "Welcome to Aurora Gradical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${GeistVariable.variable} ${inter.variable}`}
      >
        {children}
      </body>    
    </html>
  );
}
