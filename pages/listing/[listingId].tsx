import NftSinglePrice from '@/components/nft-pricing-table/nft-single-price';

import RootLayout from '@/layouts/_root-layout';
import { NextPageWithLayout } from '@/types';
import React, { useEffect, useState } from 'react';

import NftInfo from '@/components/nft-pricing-table/nft-info';

import { CoinConverter } from '@/components/ui/transact-coin';
import CoinTabs from '@/components/cryptocurrency-pricing-table/coin-tabs';
import TopCoin from '@/components/cryptocurrency-pricing-table/top-coin';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import InfoDrawer from '@/components/cryptocurrency-pricing-table/info-drawer';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';

import HistoryTable from '@/components/race-history/history-table';

import TransactionTable from '@/components/nft-transaction/transaction-table';

import Image from '@/components/ui/image';
import Link from "next/link";



import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';

import { useRouter } from 'next/router';

import {
  nftDropContractAddressHorse,
  tokenContractAddressGRD,
  tokenContractAddressUSDC,
  marketplaceContractAddress,
} from '@/config/contractAddresses';

import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
  useDirectListing,
  useNetwork,
  useNetworkMismatch,
  ChainId,
  useAddress,
} from '@thirdweb-dev/react';

import { get } from 'http';
import { set } from 'date-fns';
import { Button } from '@mui/base';






function SinglePrice(listingId: any) {

  console.log("listingId", listingId);

  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();


  const address = useAddress();

  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    "marketplace-v3"
  );


  const {
    //mutateAsync: createDirectListing,
    data: directListing,
    isLoading: loadingListing,
    error,
  } = useDirectListing(marketplace, listingId.listingId);


  
  //console.log("directListing", directListing);

  /*
  if (loadingListing) {
    return <div className={styles.loadingOrError}>Loading...</div>;
  }

  

  if (!directListing) {
    return <div className={styles.loadingOrError}>Listing not found</div>;
  }
  */

    // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [ ,switchNetwork] = useNetwork();


  const { contract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: nftMetadata } = useNFT(contract, directListing?.tokenId);


  async function buyNft() {

    try {
      // Ensure user is on the correct network
      
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Polygon);
        return;
      }

      // Simple one-liner for buying the NFT
      /*
      await marketplace?.buyFromListing(listingId, 1);
      */

      // The ID of the listing you want to buy from
      //const listingId = 0;
      // Quantity of the asset you want to buy
      const quantityDesired = 1;

      await marketplace?.directListings?.buyFromListing(listingId, quantityDesired, address);


      alert("NFT bought successfully!");

    } catch (error) {
      console.error(error);
      alert(error);
    }
    
  }



  return (
    <>
      <div className="mt-20 flex flex-wrap gap-6 lg:flex-nowrap ">

        
        
        <div
          className={`w-full 2xl:w-full 
        ${layout === LAYOUT_OPTIONS.RETRO ? '' : 'lg:w-2/3'}`}
        >

          <div className='flex flex-row  gap-5 items-center justify-center'>
          <div className='text-xl font-bold xl:text-2xl'>
            {/*
            <b>{directListing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
            {directListing.buyoutCurrencyValuePerToken.symbol}
                */}
            <b>{directListing?.currencyValuePerToken.displayValue}</b>{" "}
            {directListing?.currencyValuePerToken.symbol}
          </div>

          

          <Web3Button
            theme='light'
            action={(contract) =>
              //contract?.call('withdraw', [[nft.metadata.id]])
              buyNft()
            }
            contractAddress={marketplaceContractAddress}
          >
              <span className="flex items-center gap-2">
                {/*<InfoIcon className="h-3 w-3" /> */} Buy
              </span>
          </Web3Button>
          </div>


          <NftSinglePrice
            tokenid={directListing?.tokenId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />

        </div>
        
        

        {layout === LAYOUT_OPTIONS.RETRO ? (
          <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        ) : (

          <div className="w-full rounded-lg bg-white py-8 shadow-card dark:bg-light-dark ">

            {/*
            <h2 className="px-8 text-base font-medium uppercase text-gray-700 dark:text-gray-200">
              NFT Info
            </h2>
            */}



            <NftInfo nftMetadata={nftMetadata}/>

            {/*
            <div>
              <span className="block border-t border-dashed border-t-gray-200 dark:border-t-gray-700" />
              <CoinConverter />
            </div>
            */}

            {/*
            <div className="px-8 pb-10">
              <h2 className="text-base font-medium uppercase text-gray-700 dark:text-gray-200">
                Top Coins
              </h2>
              <TopCoin />
            </div>
            */}
          </div>
        )}
      </div>

      <div className="mt-0">

        <TransactionTable />

            {/*
        <HistoryTable />
        */}

      </div>

      {/*
      <div className="mt-10">
        <CoinTabs />
      </div> 
      */}

    </>
  );
}





const AssetSinglePrice: NextPageWithLayout = () => {
  const router = useRouter();


  const { listingId } = router.query as { listingId: string };

  return <SinglePrice listingId={listingId} />;

};

AssetSinglePrice.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export default AssetSinglePrice;
