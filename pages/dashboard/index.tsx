import cn from 'classnames';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';

import Link from 'next/link';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useEffect, useState } from 'react';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';

//import { renderPaperCheckoutLink } from '@paperxyz/js-client-sdk';

//import { useAccount } from 'wagmi';

//import RootLayout from './layout';

import RootLayout from '@/layouts/_root-layout';

import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';


import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from '@thirdweb-dev/react';

import {
  nftDropContractAddressHorse,
  tokenContractAddressGRD,
} from '../../config/contractAddresses';


import { Network, Alchemy } from "alchemy-sdk";
import { ethers } from 'ethers';

//import fs from "fs";
import { parse } from "csv-parse";

import { walletList } from '@/data/static/wallet-list';


export type BlogPost = {
  title: string;
  description: string;
};

const dummyPosts: BlogPost[] = [
  {
    title: 'Lorem Ipsum Dolor Sit Amet',
    description:
      'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Vestibulum Ante Ipsum Primis',
    description:
      'Faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel.',
  },
  {
    title: 'Mauris Blandit Aliquet Elit',
    description:
      'Etiam erat velit, scelerisque in dictum non, consectetur eget mi. Vestibulum ante ipsum primis in faucibus.',
  },
  {
    title: 'Cras Ultricies Ligula Sed',
    description:
      'Pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  },
];

/*
export async function getStaticProps() {
  return {
    props: {
      data,
    },
  }
}
*/


/* ======================================
              Main Component
======================================= */



export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const DashboardPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {


//const DashboardPage: NextPageWithLayout = () => {


  const { layout } = useLayout();

  const address = useAddress();

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  console.log('owenedNfts', ownedNfts);

  const [loading, setLoading] = useState(true);
  const [hasNFT, setHasNFT] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Thirdweb Stuff
  //const sdk = new ThirdwebSDK('mumbai');

  //const sdk = new ThirdwebSDK('goerli');

  const sdk = new ThirdwebSDK('polygon');

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
  const shareableLink = process.env.NEXT_PUBLIC_SHAREABLE_LINK!;
  const minimumBalance = 1;
  const erc1155TokenId = 0;

  /*
  const { address, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      console.log('Connected');
    },
    onDisconnect() {
      console.log('Disconnected');
      setPosts([]);
      setHasNFT(false);
    },
  });
  

  useEffect(() => {
    const checkNFT = async () => {
      const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await contract.erc1155.balanceOf(
          address,
          erc1155TokenId
        );
        // const balance = await contract.erc721.balanceOf(address);
        const isValid = balance.gte(minimumBalance);

        if (isValid) {
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          setHasNFT(true);
        } else {
          setPosts([]);
          setHasNFT(false);
        }
      }
    };

    checkNFT();
  }, [address]);

  // Fixes Hydration Issues
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return null;
  */

  useEffect(() => {

    const getBalance = async () => {

      /*
      fs.createReadStream("./data/walletcsv")
      .pipe(parse({ delimiter: ",", from_line: 1 }))
      .on("data", function (row) {

        console.log(row[0]);

      })
      */

      const walletListData = walletList;

      walletListData.map((item, index) => (

        console.log(item.code)

      ));
      

      const settings = {
        apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.
        network: Network.MATIC_MAINNET, // Replace with your network.
      };

      const alchemy = new Alchemy(settings);

      alchemy.core
        .getBalance("0xbdbedd84769c5b8afb9f7e63e3ea3fe6f1f69c45", "latest")
        .then(
          (balance) => {
            
            const balanceInEth = ethers.utils.formatEther(balance);
            console.log("Balance: " + Number(balanceInEth).toFixed(2));
          },
        );

    };

    getBalance();
  }, []);




  return (

    <div className=" text-sm leading-loose p-10 mt-20 text-justify">
      






    </div>
  );

};

DashboardPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default DashboardPage;
