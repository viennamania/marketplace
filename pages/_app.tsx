import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header";
import OpenseaGuideFooter from "../components/OpenseaGuideFooter";
import Footer from "../components/Footer";
import "../styles/globals.css";


import {
  ThirdwebProvider,
  paperWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';

// This is the chain your dApp will work on.
import { Polygon } from '@thirdweb-dev/chains';

import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {

  return (

    <>

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
        <meta property="og:image" content="/soldout.jpeg"></meta>

        <meta property="og:image:width" content="1400"></meta>
        <meta property="og:image:height" content="1400"></meta>

        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content="/intro-bg.jpeg"></meta>

      </Head>

      <ThirdwebProvider
            activeChain={Polygon}
            supportedWallets={[
              walletConnect(),
              metamaskWallet(),

              paperWallet({
                clientId: 'efa05253-e8b1-4adb-b978-996f8f2f409c',
              }),
            ]}
            /*
            sdkOptions={{
              gasless: {
                openzeppelin: {
                  relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
                },
              },
            }}
            */
           
          >      
      
      <Header />

      <Component {...pageProps} />
      <Analytics />


      
      <OpenseaGuideFooter />
  


      <Footer />


    </ThirdwebProvider>

    </>


  );

}

export default MyApp;
