import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useDirectListing,
} from "@thirdweb-dev/react";

import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
} from "@thirdweb-dev/sdk";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { marketplaceContractAddress } from "../../addresses";
import styles from "../../styles/Home.module.css";

const ListingPage: NextPage = () => {
  // Next JS Router hook to redirect to other pages and to grab the query from the URL (listingId)
  const router = useRouter();

  // De-construct listingId out of the router.query.
  // This means that if the user visits /listing/0 then the listingId will be 0.
  // If the user visits /listing/1 then the listingId will be 1.
  const { listingId } = router.query as { listingId: string };

  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // Initialize the marketplace contract
  const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace-v3");

  // Fetch the listing from the marketplace contract
  /*
  const { data: listing, isLoading: loadingListing } = useListing(
    marketplace,
    listingId
  );
  */

  const {
    //mutateAsync: createDirectListing,
    data: directListing,
    isLoading: loadingListing,
    error,
  } = useDirectListing(marketplace, listingId);


  // Store the bid amount the user entered into the bidding textbox
  const [bidAmount, setBidAmount] = useState<string>("");

  if (loadingListing) {
    return <div className={styles.loadingOrError}>Loading...</div>;
  }


  console.log("directListing", directListing);

  if (!directListing) {
    return <div className={styles.loadingOrError}>Listing not found</div>;
  }

  
  async function createBidOrOffer() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Polygon);
        return;
      }

      /*
      // If the listing type is a direct listing, then we can create an offer.
      if (listing?.type === ListingType.Direct) {
        await marketplace?.direct.makeOffer(
          listingId, // The listingId of the listing we want to make an offer for
          1, // Quantity = 1
          NATIVE_TOKENS[ChainId.Goerli].wrapped.address, // Wrapped Ether address on Goerli
          bidAmount // The offer amount the user entered
        );
      }
    */

      // If the listing type is an auction listing, then we can create a bid.
      /*
      if (directListing?.type === ListingType.Auction) {

        ////////await marketplace?.auction.makeBid(listingId, bidAmount);

      }
      */

      /*
      alert(
        `${
          directListing?.type === ListingType.Auction ? "Bid" : "Offer"
        } created successfully!`
      );
      */
     alert("Offer created successfully!");

    } catch (error) {
      console.error(error);
      alert(error);
    }
  }


  async function buyNft() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Goerli);
        return;
      }

      // Simple one-liner for buying the NFT
      /*
      await marketplace?.buyFromListing(listingId, 1);
      */


      alert("NFT bought successfully!");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (

    <div className={styles.container} style={{}}>
      <div className={styles.listingContainer}>
        <div className={styles.leftListing}>
          <MediaRenderer
            src={directListing.asset.image}
            className={styles.mainNftImage}
          />
        </div>

        <div className={styles.rightListing}>
          <h1>{directListing.asset.name}</h1>
          <p>
            Owned by{" "}
            <b>
              {/*
              {directListing.sellerAddress?.slice(0, 6) +
                "..." +
                directListing.sellerAddress?.slice(36, 40)}
              */}
                {directListing.creatorAddress?.slice(0, 6) +
                "..." +
                directListing.creatorAddress?.slice(36, 40)}
            </b>
          </p>

          <h2>
            {/*
            <b>{directListing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
            {directListing.buyoutCurrencyValuePerToken.symbol}
                */}
            <b>{directListing.currencyValuePerToken.displayValue}</b>{" "}
            {directListing.currencyValuePerToken.symbol}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
            }}
          >
            <button
              style={{ borderStyle: "none" }}
              className={styles.mainButton}
              onClick={buyNft}
            >
              Buy
            </button>
            <p style={{ color: "grey" }}>|</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <input
                type="text"
                name="bidAmount"
                className={styles.textInput}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Amount"
                style={{ marginTop: 0, marginLeft: 0, width: 128 }}
              />
              <button
                className={styles.mainButton}
                onClick={createBidOrOffer}
                style={{
                  borderStyle: "none",
                  background: "transparent",
                  width: "fit-content",
                }}
              >
                Make Offer
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ListingPage;
