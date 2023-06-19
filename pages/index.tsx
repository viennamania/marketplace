import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useValidDirectListings,
  useContract,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { marketplaceContractAddress } from "../addresses";

import Image from '@/components/ui/image';

import LogoMomocon from '@/assets/images/logo-momocon.svg';

import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import AnchorLink from '@/components/ui/links/anchor-link';

const Home: NextPage = () => {
  const router = useRouter();

  /////const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace");

  const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace-v3");

  ////const { data: listings, isLoading: loadingListings } = useValidDirectListings(marketplace);

  const {
    data: directListings,
    isLoading: loadingListings,
    error,
  } = useValidDirectListings(marketplace);


  console.log("directListings", directListings);

  return (
    <>

      {/* Content */}
      <div className={styles.container}>

        {/* Top Section */}
        <h3>Granderby Marketplace</h3>
        
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

        <hr className={styles.divider} />

{/*
        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link href="/create" className={styles.mainButton} style={{ textDecoration: "none" }}>
            Create A Listing
          </Link>
        </div>
*/}

        <div style={{ marginBottom: 200}}>
          {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Loading listings...</div>
            ) : (

              // Otherwise, show the listings
              <div className={styles.listingGrid}>
                {directListings?.map((listing) => (
                  <div
                    key={listing.id}
                    className={styles.listingShortView}
                    onClick={() => router.push(`/listing/${listing.id}`)}
                  >
                    <MediaRenderer
                      src={listing.asset.image}
                      style={{
                        borderRadius: 16,
                        // Fit the image to the container
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <h2 className={styles.nameContainer}>
                      <Link href={`/listing/${listing.id}`} className={styles.name}>
                        {listing.asset.name}
                      </Link>
                    </h2>


                    <p>
                      <b>{listing.currencyValuePerToken.displayValue}</b>{" "}
                      {listing.currencyValuePerToken.symbol}
                    </p>
                    
                    
                  </div>
                ))}
              </div>
            )

          }

        </div>

        <hr className={styles.divider} />

        <footer>

            <div className="flex-cols mt-10 flex items-center justify-center gap-3 bg-gray-800 pb-5 pt-10 text-white ">
              <div>Copyright ©MOMOCON</div>

{/*
              <AnchorLink href="/terms">Terms of Service</AnchorLink>

              <div>Privacy Policy</div>
        */}
            </div>

{/*
            <div className=" flex-cols flex items-center justify-center gap-3 bg-gray-800 pb-20 pt-3 text-white ">
              <div>
                <Image src={LogoMomocon} alt="MOMOCON" width={48} height={48} />
              </div>

              <AnchorLink
                href="https://www.instagram.com/nftgranderby"
                target="_blank"
                className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </AnchorLink>
              <AnchorLink
                href="https://twitter.com/nftgranderby"
                target="_blank"
                className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
              >
                <Twitter className="h-4 w-4" /> Twitter
              </AnchorLink>
            </div>
      */}



      </footer>


      </div>



    </>
  );
};

export default Home;
