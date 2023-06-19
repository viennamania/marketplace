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
        <h1 className={styles.h1}>Granderby Marketplace</h1>
        
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

        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link href="/create" className={styles.mainButton} style={{ textDecoration: "none" }}>
            Create A Listing
          </Link>
        </div>

        <div className="main">
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


      </div>

    </>
  );
};

export default Home;
