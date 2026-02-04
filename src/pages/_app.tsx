import type { AppProps } from "next/app";
import { Inter, Outfit } from "next/font/google";

import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import SmoothScroll from "@/components/SmoothScroll";

import "@/styles/globals.css";

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
    <div className={`${inter.variable} ${outfit.variable} main-font`}>
      <SmoothScroll /> 
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
