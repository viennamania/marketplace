import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useValidDirectListings,
  useContract,
  Web3Button,
  useAddress,
  useBalance,
  useTokenBalance,
} from "@thirdweb-dev/react";

import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
  NATIVE_TOKEN_ADDRESS,
} from "@thirdweb-dev/sdk";


import { useRouter } from "next/router";

import {
  tokenContractAddressGRD,
  tokenContractAddressUSDC,
  marketplaceContractAddress,
} from '@/config/contractAddresses';

//import { marketplaceContractAddress } from "../addresses";

import Image from '@/components/ui/image';

import LogoMomocon from '@/assets/images/logo-momocon.svg';

import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import AnchorLink from '@/components/ui/links/anchor-link';

import LiveNftPricingSlider from '@/components/ui/live-nft-horse-pricing-slider';


import { useEffect, useState } from 'react'
import { TimerContainer } from '@/components/TimerContainer'
///import { Header } from '@/components/Header'
import { TimerInput } from '@/components/TimerInput'


import Search from '@/components/search/search-horse';


const Home: NextPage = () => {
  const router = useRouter();

  /////const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace");

  const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace-v3");

  ////const { data: listings, isLoading: loadingListings } = useValidDirectListings(marketplace);

  
  const {
    data: directListings,
    isLoading: loadingListings,
    error,
  } = useValidDirectListings(marketplace, {
      count: 100, // Number of listings to fetch
      //offeror: "{{offeror_address}}", // Has offers from this address
      //seller: "{{seller_address}}", // Being sold by this address
      //start: 0, // Start from this index (pagination)
      //tokenContract: "{{token_contract_address}}", // Only show NFTs from this collection
      //tokenId: "{{token_id}}", // Only show NFTs with this token ID
    },
  );
  

  const [inventories, setInventories] = useState<any[]>([]);

  
  const address = useAddress();

  const { data: balance, isLoading: isLoadingBalance } = useBalance(NATIVE_TOKEN_ADDRESS);

  const { contract: tokenContractGRD } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalanceGRD } = useTokenBalance(tokenContractGRD, address);

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC } = useTokenBalance(tokenContractUSDC, address);


  //console.log("directListings", directListings);


  const [time, setTime] = useState<number>(1);
  const [newTime, setNewTime] = useState<number>(0)
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  //const timeToDays = time * 60 * 60 * 24 * 1000;
  //const timeToDays = 60 * 60 * 24 * 1000 + 60 * 60 * 8 * 1000;

  var dString = "July, 28, 2023";
  var d1 = new Date(dString);

  //let countDownDate = new Date().getTime() + timeToDays;

  let countDownDate = d1.getTime() + 60 * 60 * 9 * 1000;


  useEffect(() => {


    var updateTime = setInterval(() => {
      var now = new Date().getTime();

      var difference = countDownDate.valueOf() - now;

      var newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      var newHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      var newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);


      if (difference <= 0) {
        clearInterval(updateTime);
        setMessage("The Launch Has Started");
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    })

    return () => {
      clearInterval(updateTime);
    }

  }, [time]);

  const handleClick = () => {

    setTime(newTime);
    console.log(time);
    setNewTime(0);
  };

  const handleChange = (e: any) => {
    let inputTime = e.target.value;
    setNewTime(inputTime);

  };



  useEffect(() => {


    /*
    const timer = setTimeout(() => {
      ///setMessage("The Launch Has Started");
    }, 1000 * 60 * 60 * 24 * 1000);

    return () => clearTimeout(timer);
    */



    const getInventory = async () => {
      

      const url = "https://granderby-market-bot-6639a95048b6.herokuapp.com/inventories";
      const res = await fetch(url);

      const data = await res.json();

      console.log(data);

      setInventories(data);

    }


    getInventory();



  }, []);



  return (
    <>

      {/* Content */}
      <div className="mt-28 flex flex-col justify-center items-center">

{/*

        <div className=" w-full justify-center items-center p-5  ">
          <Image
            //fill
            src="/banner.jpeg"
            alt="banner"
            width={2048}
            height={64}
            className="object-contain rounded-lg"
          />
        </div>
  */}

{/*
        <Header message={message} />
  */}


          {/*
          <div className=" w-full justify-center items-center pl-10 pr-10 ">
            <Image
              //fill
              src="/soldout.jpeg"
              alt="banner"
              width={2048}
              height={64}
              className="object-contain rounded-lg"
            />
          </div>
          <TimerContainer
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
          */}


{/*
<TimerInput value={newTime} handleClick={handleClick} handleChange={handleChange} />
*/}

        

{/*
        <div className=" w-full justify-center items-center p-5 lg:hidden ">
          <Image
            //fill
            src="/banner-sm.png"
            alt="banner"
            width={2048}
            height={64}
            className="object-contain rounded-lg"
          />
        </div>
  */}
  

        {address &&
        <>

        {/*
        <h3>
          <b>
            {!balance?.value
              ? 'Loading...'
              : Number(
                  ethers.utils.formatUnits(balance?.value, 18)
                ).toFixed(2)}
          </b>{' '}
          {balance?.symbol}
        </h3>
              */}
              {/*
        <h3>
          My Balance: <b>{Number(tokenBalanceGRD?.displayValue).toFixed(2)}</b>{' '}
          {tokenBalanceGRD?.symbol}
        </h3>
            */}
        
        {/*
        <h3 className="p-5">
          My Balance: <b>{Number(tokenBalanceUSDC?.displayValue).toFixed(2)}</b>{' '}
          {tokenBalanceUSDC?.symbol}
        </h3>
          */}

        
        {/*
        <p className={styles.explain}>
          Build an NFT marketplace using{" "}
          <b>
            {" "}
            <a
              href="https://thirdweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.purple}
            >
              thirdweb
            </a>
          </b>{" "}
          to list your ERC721 and ERC1155 tokens for auction or for direct sale.
        </p>
  */}

        </>
        }

        <hr className={styles.divider} />

{/*
        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link href="/create" className={styles.mainButton} style={{ textDecoration: "none" }}>
            Create A Listing
          </Link>
        </div>
*/}


{/*
<div className="flex flex-wrap">


                 
                <div className="mt-5 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">


<div className="w-[calc(100%-256px)]">
                <LiveNftPricingSlider limits={4} />

</div>

</div>
*/}




{/*
        <div className="mt-5 w-full text-2xl">
          Listings: {directListings?.length}
        </div>
*/}

        <div className="m-10">
          {
            // If the listings are loading, show a loading message
            ////loadingListings ? (

            !inventories ? (
              <>
                <div>Loading listings...</div>

              </>
            ) : (

              <>

                {/*
                <div className="mt-5 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
              */} 
                {/*
                  <AssetSlider coins={assetSlideData} />
                */}

{/*
                <div className=" w-full flex justify-center items-center p-5">
                  <video
                    id="intro-video"
                    src="/mov/nft.mp4"
                    muted
                    autoPlay
                    loop
                    className="rounded-lg"
                  ></video>
                </div>
              */}

           
           
                <div className={styles.listingGrid}>

                  {/*
                  {directListings?.map((listing) => (
                  */}

                  {inventories?.map((listing) => (

                
                    
                    <div
                      key={listing.id}
                      className={styles.listingShortView}
                      onClick={() => router.push(`/listing/${listing.id}`)}
                    >

                      <span className="text-xs mt-2 mb-2">Listing: {listing.id}</span>   

                      <h2 className={styles.nameContainer}>
                        
                        <Link href={`/listing/${listing.id}`} className={styles.name}>
                        
                          {listing.asset.name}
                          
                        </Link>
                          
                      </h2>



                      <div className=" w-full justify-center items-center p-5  ">
                      <Image
                        //fill
                        src={listing.asset.image ? listing.asset.image : "/default-nft.png"}
                        alt="nft"
                        width={500}
                        height={500}
                        className="object-contain rounded-lg"
                      />
                      </div>




                      <p>
                        <b>{listing.currencyValuePerToken.displayValue}</b>{" "}
                        {listing.currencyValuePerToken.symbol}
                      </p>
                      
                      
                    </div>
                  ))}

                </div>
                

              </>
      
            )

          }

        </div>


{/*
        <div className=" w-full justify-center items-center pl-10 pr-10 ">
          <Search />
        </div>
        */}

      </div>



    </>
  );
};

export default Home;
