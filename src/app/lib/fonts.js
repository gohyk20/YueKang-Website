import { Geist, Geist_Mono, Kirang_Haerang, PT_Sans } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const PTSans = PT_Sans({
  variable: "--font-PT-sans",
  subsets: ["latin"],
  weight: "700",
})

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const kirang = Kirang_Haerang({
  variable: "--font-kirang-haerang",
  subsets: ["latin"],
  weight: "400",
  display: 'swap',
});