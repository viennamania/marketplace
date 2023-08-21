import type { AppProps } from "next/app";
import type { NextPageWithLayout } from '@/types';

import Head from "next/head";
import Header from "@/components/Header";
import OpenseaGuideFooter from "@/components/OpenseaGuideFooter";
import Footer from "@/components/Footer";
import "../styles/globals.css";



type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

import {
  ThirdwebProvider,
  paperWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';

// This is the chain your dApp will work on.
import { Polygon } from '@thirdweb-dev/chains';

import { Analytics } from '@vercel/analytics/react';

import { useState } from 'react';

import {Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";

import ModalsContainer from '@/components/modal-views/container';
////import DrawersContainer from '@/components/drawer-views/container';

import InventoriesButton from '@/components/inventories/inventories-button';
import InventoriesDrawer from '@/components/inventories/inventories-drawer';


/*
function MyApp({ Component, pageProps }: AppProps) {
*/

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  // inject the next app with the latest version of `@google/model-viewer`

  //could remove this if you don't need to page level layout
  const getLayout = Component.getLayout ?? ((page) => page);

  ////const [queryClient] = useState(() => new QueryClient());
  const queryClient = new QueryClient();

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
        <meta property="og:image" content="/intro-bg.png"></meta>

        <meta property="og:image:width" content="1400"></meta>
        <meta property="og:image:height" content="1400"></meta>

        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content="/intro-bg.jpg"></meta>

      </Head>

      <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>

          <ThirdwebProvider
            
            
            //clientId={process.env.THIRDWEB_CLIENT_ID || ''}

            clientId="79125a56ef0c1629d4863b6df0a43cce"


            activeChain={Polygon}
            supportedWallets={[
              walletConnect(),
              metamaskWallet(),

              paperWallet({

                paperClientId: 'efa05253-e8b1-4adb-b978-996f8f2f409c',
              }),
            ]}
            
            sdkOptions={{
              gasless: {
                openzeppelin: {
                  ///relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
                  relayerUrl: 'https://api.defender.openzeppelin.com/autotasks/3067ee45-9e49-4a66-ad9f-21855aa5ceac/runs/webhook/32a6dbb5-b039-403b-bd1c-ff44e65cf6ab/R2wNZuXcnMwPyhxGBfwdEh',

                },
              },
            }}
            
           
          >      
      
      <Header />

            {/*
      <Component {...pageProps} />
      */}

      {getLayout(<Component {...pageProps} />)}

      {/*
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      */}
      
      <Analytics />


      <ModalsContainer />

      {/*
      <DrawersContainer />
      */}

      <InventoriesButton />
      <InventoriesDrawer />

      
      <OpenseaGuideFooter />
  


      <Footer />


    </ThirdwebProvider>
    </Hydrate>
    </QueryClientProvider>

    </>


  );

}

///export default MyApp;

export default CustomApp;
