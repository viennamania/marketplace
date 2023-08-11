import { coinIdData } from '@/data/static/coin-id';
import { CoinExplore } from '@/data/static/coin-list';
import React, { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';
import Explorers from '@/components/cryptocurrency-pricing-table/explorers';

import Link from "next/link";

import PriceHistoryTable from '@/components/nft-transaction/price-history-table';

import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useDirectListing,
  Web3Button,
  useAddress,
  useBalance,
  useTokenBalance,
} from "@thirdweb-dev/react";

import {
  nftDropContractAddressHorse,
  tokenContractAddressGRD,
  tokenContractAddressUSDC,
  marketplaceContractAddress,
} from '@/config/contractAddresses';


import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
  NATIVE_TOKEN_ADDRESS,
} from "@thirdweb-dev/sdk";

import { BigNumber, ethers } from 'ethers';





function NftInfo({nftMetadata} : any) {

  console.log('nftMetadata', nftMetadata);

  const listingId = nftMetadata?.metadata?.listingId;


  
  
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  function handleCopyToClipboard() {
    copyToClipboard(coinIdData.api_id);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }

  const address = useAddress();

  

  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    "marketplace-v3"
  );


  const {
    //mutateAsync: createDirectListing,
    data: directListing,
    isLoading: loadingListing,
    error,
  } = useDirectListing(marketplace, listingId);



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

      await marketplace?.directListings.buyFromListing(listingId, quantityDesired, address);


      alert("NFT bought successfully!");

    } catch (error) {
      console.error(error);
      alert(error);
    }
    
  }


  return (
    <div className="lg:mt-16 px-5 pb-10">


      <div className='flex flex-col justify-between items-left lg:visible invisible'>
        <Link className='flex text-left text-md capitalize text-blue-500 dark:text-white '
          href={`/`}
        >
          Granderby Horse NFT
        </Link>
        <div className='text-left text-3xl capitalize font-bold text-black dark:text-white'>
          {nftMetadata?.metadata?.name}
        </div>

        <div className="flex items-center gap-4 mt-5 ">
          {/*
          <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
            Owned by
          </div>
          <div className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
            {nftMetadata?.owner.substring(0, 6)}...
          </div>
          */}
          <p>
            Owned by{" "}
            <b>
              {/*
              {directListing.sellerAddress?.slice(0, 6) +
                "..." +
                directListing.sellerAddress?.slice(36, 40)}
              */}
                {nftMetadata?.owner?.slice(0, 6) +
                "..." +
                nftMetadata?.owner?.slice(36, 40)}
            </b>
          </p>


        </div>

        <h2>
          {/*
          <b>{directListing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
          {directListing.buyoutCurrencyValuePerToken.symbol}
              */}
          <b>{directListing?.currencyValuePerToken.displayValue}</b>{" "}
          {directListing?.currencyValuePerToken.symbol}
        </h2>



        <div className='flex flex-col w-full mt-3'>
          {!address ? (
            <div className='flex flex-col w-full '>

              <div>
                <Web3Button
                  theme="light"
                  action={(contract) =>
                    ////contract?.call('withdraw', [[nft.metadata.id]])
                    buyNft()

                  }
                  contractAddress={marketplaceContractAddress}
                >
                  Buy
                </Web3Button>
              </div>

              <p className="text-xl font-bold">
                to buy this NFT.
              </p>

            </div>
          )
          :
          (
            <div className='flex flex-col w-full '>
              
              <div>
                <Web3Button
                  
                  
                  theme="light"
                  action={(contract) =>
                    ////contract?.call('withdraw', [[nft.metadata.id]])
                    buyNft()
                  
                  
                  }
                  contractAddress={marketplaceContractAddress}
                >
                  Buy
                </Web3Button>
              </div>

            </div>

          )}
        </div>

      </div>

      <PriceHistoryTable />

      {/*
      <div className="mt-[10px] flex items-center gap-4">
        <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
          Explorers
        </div>
        <Explorers menu={CoinExplore} />
      </div>
      */}

      {/*
      <div className="mt-[10px] flex items-start gap-4">
        <div className="w-[100px] shrink-0 grow-0 basis-auto text-sm tracking-wider text-[#6B7280]">
          Wallets
        </div>
        <div className="flex flex-wrap items-center gap-[5px]">
          <span className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
            Ledger
          </span>
          <span className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
            Trezor
          </span>
          <span className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
            Xdefi
          </span>
          <span className="rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
            Coin98
          </span>
        </div>
      </div>
      <div className="mt-[10px] flex items-start gap-4">
        <div className="w-[100px] shrink-0 grow-0 basis-auto text-sm tracking-wider text-[#6B7280]">
          Community
        </div>
        <div className="flex flex-wrap items-center gap-[5px]">
          <AnchorLink
            href="https://reddit.com/r/bitcoin"
            target="_blank"
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </AnchorLink>
          <AnchorLink
            href="https://twitter.com/bitcoin"
            target="_blank"
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
          >
            <Twitter className="h-4 w-4" /> Twitter
          </AnchorLink>
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-4">
        <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
          Search on
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
          <SearchIcon /> Twitter
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-4">
        <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
          Source Code
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
          <Github /> Github
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-4">
        <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
          Api Id
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
          bitcoin
          <div title="Copy Address" onClick={() => handleCopyToClipboard()}>
            {copyButtonStatus ? (
              <Check className="h-auto w-3.5 text-green-500" />
            ) : (
              <Copy className="h-auto w-3.5" />
            )}
          </div>
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-4">
        <div className="w-[100px] text-sm tracking-wider text-[#6B7280]">
          Tags
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
          Cryptocurrency
        </div>
      </div>
      */}


    </div>
  );
}

export default NftInfo;
