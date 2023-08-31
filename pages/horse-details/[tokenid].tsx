import NftSinglePrice from '@/components/nft-pricing-table/nft-single-price';

import RootLayout from '@/layouts/_root-layout';
import { NextPageWithLayout } from '@/types';
import React, { use, useEffect, useState } from 'react';

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
  marketplaceContractAddress,
  tokenContractAddressUSDC,
} from '@/config/contractAddresses';

import {
  useAddress,
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
  useValidDirectListings,
  useTokenBalance,
} from '@thirdweb-dev/react';

import { get } from 'http';
import { set } from 'date-fns';
import { dir } from 'console';





function SinglePrice(tokenid: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

 
  const address = useAddress();

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC, isLoading: isLoadingTokenBalanceUSDC } = useTokenBalance(tokenContractUSDC, address);





  const { contract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: nftMetadata } = useNFT(contract, tokenid.tokenid);


  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    "marketplace-v3"
  );
  
  const {
    data: directListings,
    isLoading: loadingListings,
    error,
  } = useValidDirectListings(marketplace);

  console.log("directListings", directListings);

  //const [listingId, setListingId] = useState('');

  const [directListing, setDirectListing] = useState<any>(null);

  useEffect(() => {

    if (directListings) {
      directListings.map((listing: any) => {
        if (listing.tokenId == tokenid.tokenid) {
          //setListingId(listing.id);

          setDirectListing(listing);

          return;
        }
      });
    }

  }, [directListings, tokenid.tokenid]);
  

  console.log("directListing", directListing);


  
  return (
    <>
      <div className="mt-12 flex flex-wrap gap-6 lg:flex-nowrap ">

        
        
        <div
          className={`w-full
        ${layout === LAYOUT_OPTIONS.RETRO ? '' : 'lg:w-2/3'}`}
        >

              {!directListing || directListing.quantity === "0" ? (
                <>

                  <div className='flex flex-row  gap-5 items-center justify-center'>
                    <div className='text-xl font-bold xl:text-2xl'>
                      <b>Not for sale</b>
                    </div>
                  </div>
      
                </>
                
              ) : (
                
                <div className='flex flex-col gap-5 items-center justify-center  rounded-lg border p-5 '>

                  <div className='text-xl font-bold xl:text-2xl'>
                    {/*
                    <b>{directListing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                    {directListing.buyoutCurrencyValuePerToken.symbol}
                        */}
                    <span>Sell Price:&nbsp;</span>
                    <b>{directListing?.currencyValuePerToken.displayValue}</b>{" "}
                    {directListing?.currencyValuePerToken.symbol}
                  </div>
                  <div className='text-sm font-bold xl:text-lg'>
                    Last price:&nbsp;{directListing?.currencyValuePerToken.displayValue-6} {directListing?.currencyValuePerToken.symbol}
                  </div>

                  <div className='text-xl font-bold xl:text-2xl'>
                    <Web3Button
                      theme='light'
                      action={(contract) =>
                        //contract?.call('withdraw', [[nftMetadata?.tokenId]])
                        //buyNft()
                        alert("NFT bought successfully!")
                      }
                      contractAddress={marketplaceContractAddress}
                    >
                        <span className="flex items-center gap-2">
                          {/*<InfoIcon className="h-3 w-3" /> */} Buy
                        </span>
                    </Web3Button>
                    &nbsp;&nbsp;for Buy Now
                  </div>


                  { address && (  

                    <div className=' flex flex-row items-center justify-center  gap-2'>

                      <span className='text-md  xl:text-xl'>
                      My Balance:
                      </span>

                      {isLoadingTokenBalanceUSDC && (
                        <div className=' text-md  xl:text-xl'>
                          Loading...
                        </div>
                      )}
                      <div className='text-md  xl:text-xl'>
                        {tokenBalanceUSDC?.displayValue}{' '}{tokenBalanceUSDC?.symbol}
                      </div>

                    </div>

                  )}


                </div>

              )}


          
          <NftSinglePrice
            tokenid={tokenid.tokenid}
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

  console.log('id======', router.query.tokenid);

  return <SinglePrice tokenid={router.query.tokenid} />;
};

AssetSinglePrice.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export default AssetSinglePrice;
