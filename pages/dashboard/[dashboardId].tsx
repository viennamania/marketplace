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


import type { NextPage } from "next";

import Papa from 'papaparse';
import { set } from 'date-fns';

import axios from "axios";

import { useRouter } from "next/router";



export type BlogPost = {
  title: string;
  description: string;
};

export type HolderWallet = {
  address: string;
  balance: number;
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


/*
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const DashboardPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {

  
*/


//const DashboardPage: NextPageWithLayout = () => {
const DashboardPage: NextPage = () => {


  const router = useRouter();

  // De-construct listingId out of the router.query.
  // This means that if the user visits /listing/0 then the listingId will be 0.
  // If the user visits /listing/1 then the listingId will be 1.
  const { dashboardId } = router.query as { dashboardId: string };

  const [pageNumber, setPageNumber] = useState(dashboardId ? Number(dashboardId) : 0);

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

  const [walletListData, setWalletListData] = useState<HolderWallet[]>([]);

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

    /*
    const settings = {
      apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.
      network: Network.MATIC_MAINNET, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);
    */

    console.log("dashboardId", dashboardId);



    setPageNumber(dashboardId ? Number(dashboardId) : 0);


    const getBalance = async () => {


      const arrAddress : String[] = [];

      async function buildVocab() {
        await fetch("/wallet.csv")
        .then((resp) => resp.text())
        .then((text) => {

          Papa.parse(text, { header: true }).data.forEach( (row :any) => {

            //console.log("row", row);

            //vocab[row.word] = row.definition;

            

            //if (row.wallet) {

            //if (row) {
              arrAddress.push(row.address);
              
            //}

          });

          //console.log("text", text);
          ///arrAddress.push(text.trim());
  
          /*
          const data = Papa.parse(text, { header: true }).data;

          console.log("data", data);
          */

        })
        
      }

      await buildVocab();


      
      //console.log("arrAddress", arrAddress);

      
      const arrHolderWallet : HolderWallet[] = [];


      console.log("pageNumber", pageNumber);

      //for (let i = 0; i < arrAddress.length; i++) {
      //for (let i = pageNumber*20+0; i < pageNumber*20+1; i++) {

      let i = pageNumber*20;

        const arr20Address = arrAddress.slice(i, i + 20);

        console.log("arr20Address", arr20Address);

        const res = await axios({
          method: 'post',
          url: "https://api.polygonscan.com/api",
          params:{
            module: "account",
            action: "balancemulti",
            address: arr20Address.join(","),
            tag: "latest",
            apikey: "MSRJCSFB5MSNWRMM9NI53ET78RJ4VWU1FV",
          }
        });

        const result = res.data.result;

        for (var j = 0; j < result.length; j++) {

          //console.log("result[j]", result[j]);
          const balance = result[j]?.balance ? result[j]?.balance : 0;

          let balanceInEth = Number(ethers.utils.formatEther(balance)).toFixed(2);


          const holderWallet = { address: String(arr20Address[j]), balance: Number(balanceInEth) };

          arrHolderWallet.push(holderWallet);

        }

      //}

      //console.log("arrHolderWallet", arrHolderWallet);
    

      setWalletListData(arrHolderWallet);

      


    };

    getBalance();


  }, [dashboardId, pageNumber]);




  return (

    <div className=" text-sm leading-loose p-10 mt-20 text-justify">
      

      <div className="flex flex-col items-center justify-center gap-3 bg-gray-800 pb-5 pt-10 text-white ">

        <div className="text-2xl font-bold">Wallet List</div>

        <div className="text-lg">Wallets with 1 or more MATIC</div>

        <div className='flex flex-row gap-2'>
          <Link href="/dashboard/0" passHref role="button">0</Link>
          <Link href="/dashboard/1" passHref role="button">1</Link>
          <Link href="/dashboard/2" passHref role="button">2</Link>
          <Link href="/dashboard/3" passHref role="button">3</Link>
          <Link href="/dashboard/4" passHref role="button">4</Link>
          <Link href="/dashboard/5" passHref role="button">5</Link>
          <Link href="/dashboard/6" passHref role="button">6</Link>
          <Link href="/dashboard/7" passHref role="button">7</Link>
          <Link href="/dashboard/8" passHref role="button">8</Link>
          <Link href="/dashboard/9" passHref role="button">9</Link>
          <Link href="/dashboard/10" passHref role="button">10</Link>
          <Link href="/dashboard/11" passHref role="button">11</Link>
          <Link href="/dashboard/12" passHref role="button">12</Link>
          <Link href="/dashboard/13" passHref role="button">13</Link>
          <Link href="/dashboard/14" passHref role="button">14</Link>
          <Link href="/dashboard/15" passHref role="button">15</Link>
          <Link href="/dashboard/16" passHref role="button">16</Link>
          <Link href="/dashboard/17" passHref role="button">17</Link>
          <Link href="/dashboard/18" passHref role="button">18</Link>
          <Link href="/dashboard/19" passHref role="button">19</Link>
          <Link href="/dashboard/20" passHref role="button">20</Link>
          <Link href="/dashboard/21" passHref role="button">21</Link>
          <Link href="/dashboard/22" passHref role="button">22</Link>
          <Link href="/dashboard/23" passHref role="button">23</Link>
          <Link href="/dashboard/24" passHref role="button">24</Link>
          <Link href="/dashboard/25" passHref role="button">25</Link>

        </div>

        
        <div className="text-lg">Page {pageNumber}</div>

        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Wallet Address</th>
              <th className="px-4 py-2">Balance(MATIC)</th>
            </tr>
          </thead>
          <tbody>
            {walletListData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{pageNumber*(20) + index + 1}</td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2 text-right">{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>




    </div>
  );

};

/*
DashboardPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
*/

export default DashboardPage;