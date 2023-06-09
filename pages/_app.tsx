import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import ThirdwebGuideFooter from "../components/ThirdwebGuideFooter";
import Footer from "../components/Footer";
import "../styles/globals.css";

// This is the chain your dApp will work on.
const activeChain = "polygon";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThirdwebProvider
      activeChain={activeChain}
    >
      <Head>
        <title>Granderby Marketplace with MOMOCON</title>

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          name="description"
          content="Granderby Marketplace"
        />
        <meta
          name="keywords"
          content="Granderby, Marketplace, NFT Marketplace, NFT Auction"
        />


        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="GRANDERBY"></meta>
        <meta property="og:title" content="GRANDERBY"></meta>
        <meta property="og:description" content="powered by MOMOCON"></meta>
        <meta property="og:image" content="/intro-bg.png"></meta>

        <meta property="og:image:width" content="1400"></meta>
        <meta property="og:image:height" content="1400"></meta>

        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content="/intro-bg.png"></meta>



      </Head>
      
      <Header />

      <Component {...pageProps} />
      {/*
      <ThirdwebGuideFooter />
  */}

{/*
      <Footer />
*/}

    </ThirdwebProvider>

  );

}

export default MyApp;
