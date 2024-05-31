import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

const font = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SHORT LINK",
    description: "Link Shortner app built on Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`min-h-screen bg-black flex items-center justify-center overflow-hidden ${font.className}`}>
                <ToastProvider>{children}</ToastProvider>
            </body>
        </html>
    );
}
