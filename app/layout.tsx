import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechSpec Store",
  description: "Cari HP Impianmu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-zinc-50 text-zinc-900`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}