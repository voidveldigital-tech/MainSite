import Navbar from "@/layouts/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} main-font`}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}