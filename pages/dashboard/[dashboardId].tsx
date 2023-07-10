import cn from 'classnames';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';

import Link from 'next/link';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useEffect, useState } from 'react';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';

import { useCopyToClipboard } from 'react-use';
import { Copy } from '@/components/icons/copy';


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


import { CSVLink, CSVDownload } from "react-csv";



export type BlogPost = {
  title: string;
  description: string;
};

export type HolderWallet = {
  address: string;
  balance: number;
  nfts: any;
  attributes: any;
};



export type HolderWalletforCSV = {
  address: string;
  nfts: string;
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

  let [copyButtonStatus, setCopyButtonStatus] = useState('Copy');
  let [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = (url: any) => {
    copyToClipboard(url);
    setCopyButtonStatus('Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };


  const router = useRouter();

  // De-construct listingId out of the router.query.
  // This means that if the user visits /listing/0 then the listingId will be 0.
  // If the user visits /listing/1 then the listingId will be 1.
  const { dashboardId } = router.query as { dashboardId: string };

  const [pageNumber, setPageNumber] = useState(dashboardId ? Number(dashboardId) : null);

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

  const [csvData, setCsvData] = useState<HolderWalletforCSV[]>([]);

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


    
    const settings = {
      apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.
      network: Network.MATIC_MAINNET, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);
    

    ///console.log("dashboardId", dashboardId);



    //////setPageNumber(dashboardId ? Number(dashboardId) : 0);


    const getBalance = async () => {


      setLoading(true);


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

      const arrHolderWalletforCSV : HolderWalletforCSV[] = [];

      


      console.log("pageNumber", pageNumber);

      //for (let i = 0; i < arrAddress.length; i++) {
      //for (let i = pageNumber*20+0; i < pageNumber*20+1; i++) {

      /*
        let i = pageNumber*20;

        const arr20Address = arrAddress.slice(i, i + 20);

        //console.log("arr20Address", arr20Address);

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
        */

        //for (var j = 0; j < 100; j++) {

        if (pageNumber === null) return;

        for (var j = pageNumber*100; j < pageNumber*100+100; j++) {




          /*

          //console.log("result[j]", result[j]);
          const balance = result[j]?.balance ? result[j]?.balance : 0;

          let balanceInEth = Number(ethers.utils.formatEther(balance)).toFixed(2);
          */


          const balanceInEth = 0;


          console.log("arrAdd[j]", j + ": " + arrAddress[j]);


          // Get all NFTs
          ////const response = await alchemy.nft.getNftsForOwner(String(arr20Address[j]), {
          const response = await alchemy.nft.getNftsForOwner(String(arrAddress[j]), {


            omitMetadata: false, // // Flag to omit metadata
            contractAddresses: [nftDropContractAddressHorse],
          });


          ///console.log("response", response);

          const attributes = [];

          for (var k = 0; k < response.ownedNfts.length; k++) {

            if (response.ownedNfts[k].tokenUri?.gateway) {

              /*
              fetch(response.ownedNfts[k].tokenUri?.gateway!)
              .then((response) => response.json())
              .then((responseJson) => {
                //return responseJson.movies;
                console.log("responseJson", responseJson.attributes[0].value);
                console.log("responseJson", responseJson.attributes[1].value);

                const asset = responseJson.attributes[0].value;
                const grade = responseJson.attributes[1].value;

                //attributes = { asset, grade };

                //attributes.push({ asset, grade });

              })
              .catch((error) => {
                console.error(error);
              });
              */


              const res = await fetch(response.ownedNfts[k].tokenUri?.gateway!);
              const responseJson = await res.json();

              //console.log("responseJson", responseJson.attributes[0].value);
              //console.log("responseJson", responseJson.attributes[1].value);

              const asset = responseJson.attributes[0].value;
              const grade = responseJson.attributes[1].value;
              const image = responseJson.image;

              const tokenid = response.ownedNfts[k].tokenId;

              attributes.push({ tokenid,  asset, grade, image });

            }

          }



          /////const holderWallet = { address: String(arr20Address[j]), balance: Number(balanceInEth), nfts: response.ownedNfts, attributes: attributes};

          const holderWallet = { address: String(arrAddress[j]), balance: Number(balanceInEth), nfts: response.ownedNfts, attributes: attributes};


          arrHolderWallet.push(holderWallet);


          let attributesString = "";

          attributes.map((item) => (
              attributesString += item.asset + " " + item.grade + " " + item.tokenid + "\n"
          ))



          ////arrHolderWalletforCSV.push( { address: String(arr20Address[j]), nfts: attributesString });
          arrHolderWalletforCSV.push( { address: String(arrAddress[j]), nfts: attributesString });

          

        }

      //}

      //console.log("arrHolderWallet", arrHolderWallet);
    

      
      setWalletListData(arrHolderWallet);


      setCsvData(arrHolderWalletforCSV);
      

      /*
      arrHolderWallet.map((item) => (

        item.nfts.map((nft: any, index: any) => (
          tokenId: nft.tokenId,
          asset: item.attributes[index].asset,

        ))

      ))

      */


      /*
      setCsvData(
        arrHolderWallet.map((item) => (



          item.nfts.map((nft: any, index: any) => (
            tokenId: nft.tokenId,
            asset: item.attributes[index].asset,
            grade: item.attributes[index].grade,
          )),
          
          
          {
          address: item.address,
          balance: item.balance,


          //nfts: item.nfts,
          //attributes: item.attributes,

        }))
      )
      */



      setLoading(false);


    };

    getBalance();


  }, [pageNumber]);




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


        </div>

        {/*
        <div className='flex flex-row gap-2'>


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


        </div>
        <div className='flex flex-row gap-2'>

          <Link href="/dashboard/20" passHref role="button">20</Link>
          <Link href="/dashboard/21" passHref role="button">21</Link>
          <Link href="/dashboard/22" passHref role="button">22</Link>
          <Link href="/dashboard/23" passHref role="button">23</Link>
          <Link href="/dashboard/24" passHref role="button">24</Link>
          <Link href="/dashboard/25" passHref role="button">25</Link>
          <Link href="/dashboard/26" passHref role="button">26</Link>
          <Link href="/dashboard/27" passHref role="button">27</Link>

        </div>
  */}
        
        <div className="text-lg">Page {pageNumber}</div>

        <CSVLink
          data={csvData}
          filename={"wallet-list-page-" + pageNumber + ".csv"}
        >
          Download CSV file
          
        </CSVLink>


      {loading ? (
        <div className="text-lg">Loading...</div>
      ) : (
        


        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Num</th>
              <th className="px-4 py-2">Wallet Address</th>
              <th className="px-4 py-2">MATIC</th>
              <th className="px-4 py-2">Horses(TokenId)</th>
            </tr>
          </thead>
          <tbody>
            {walletListData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-right">{pageNumber*(100) + index + 1}</td>

                <td className="border px-4 py-2 text-xs">

                  <div className='flex flex-row gap-2'>

                    {/*item.address.substring(0, 6) + "..." + item.address.substring(item.address.length - 4)*/}

                    {item.address}

{/*
                    <div className="pl-2">
                      <button
                        onClick= {() => {
                        
                          handleCopyToClipboard(item.address)

    
                        }}
                      >

                        <div className="flex flex-row gap-2 justify-center items-center">
                          <span className="text-md flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-14 xl:w-14">
                            <Copy className="h-4 w-4 lg:h-5 lg:w-5" />
                          </span>
                          <span className="mt-2 block text-xs -tracking-widest text-gray-600 dark:text-gray-400">
                            {copyButtonStatus}
                          </span>
                        </div>
                      </button>
                    </div>
                      */}

                  </div>

                </td>

                <td className="border px-4 py-2 text-right">{item.balance}</td>

                <td className="border px-4 py-2 flex flex-col gap-0 justify-left items-left">

                  
                  <table className="table-auto"> 

                  {item.nfts.map((nft: any, index: any) => (


                    <tr
                      key={index}
                      className=''
                    >

                      <td className='w-[30px] text-right'>{nft.tokenId}</td>

                      <td className='p-2'>{item.attributes[index].asset}</td>

                      <td className='p-2'>{item.attributes[index].grade}</td>

                      <td>
                        <Link
                          key={index}
                          className=" gap-2 flex flex-row justify-center items-center p-1 border-gray-600 text-gray-400 transition-all hover:border-gray-300 hover:text-gray-100 dark:border-gray-700 dark:text-gray-400 "
                          href={"#"}
                          onClick={() => window.open("https://opensea.io/assets/matic/"+ nftDropContractAddressHorse + "/"+nft.tokenId, "_blank")}
                          >

                        
                          <Image
                            //src={nft.media[0].thumbnail}
                            src={item.attributes[index].image}
                            alt={nft.tokenId}
                            width={50}
                            height={50}
                            className="rounded-lg"
                          />
                        

                        </Link>
                      </td>

                    </tr>


                  ))}

                  </table>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}

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
