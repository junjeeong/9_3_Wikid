import "@/styles/global.css";
import { Header } from "@/components/Layout/Header";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Header /> */}
      <Component {...pageProps} />
    </>
  );
}
