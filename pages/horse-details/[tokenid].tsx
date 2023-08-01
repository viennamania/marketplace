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

import Image from '@/components/ui/image';



import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';

import { useRouter } from 'next/router';

import { Network, Alchemy } from 'alchemy-sdk';

import {
  nftDropContractAddressHorse
} from '@/config/contractAddresses';

import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
} from '@thirdweb-dev/react';

import { get } from 'http';
import { set } from 'date-fns';




function SinglePrice(tokenid: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

 

  const { contract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );
  const { data: nftMetadata } = useNFT(contract, tokenid.tokenid);




  const settings = {
    ///apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key. creath.park@gmail.com

    apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key. songpalabs@gmail.com
    network: Network.MATIC_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  useEffect(() => {


    async function getNFTMetadata() {

      const metadata = await alchemy.nft.getNftMetadata(
        nftDropContractAddressHorse,
        tokenid.tokenid,
      )

      ///setNftMetadata(metadata);

      console.log('metadata======', metadata);

    }

    ///getNFTMetadata();


  }, [alchemy.nft, tokenid.tokenid]);


  return (
    <>
      <div className="mt-20 flex flex-wrap gap-6 lg:flex-nowrap">

        
        
        <div
          className={`w-full 2xl:w-full 
        ${layout === LAYOUT_OPTIONS.RETRO ? '' : 'lg:w-2/3'}`}
        >

          
          <NftSinglePrice
            tokenid={tokenid.tokenid}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
        
        

        {layout === LAYOUT_OPTIONS.RETRO ? (
          <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        ) : (
          <div className="w-full rounded-lg bg-white py-8 shadow-card dark:bg-light-dark xl:max-w-[358px]">
            <h2 className="px-8 text-base font-medium uppercase text-gray-700 dark:text-gray-200">
              NFT Info
            </h2>

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

      <div className="mt-10">
        <HistoryTable />
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
