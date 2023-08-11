
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

//import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";

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

export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  //const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  return (

    <div className={styles.header}>
      <div className={styles.left}>
        <div>
          <Link href="/" passHref role="button">
            <div className="flex flex-row items-center justify-start gap-2">
            <Image
              src={`/logo.png`}
              alt="Logo"
              width={45}
              height={45}
              style={{ cursor: "pointer" }}
            />
            <div className="text-sm font-bold text-black dark:text-white">Granderby Market</div>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.right}>

        {address ? (
          
          <ConnectWallet theme="light" />

        ) : (
          <>
            <Image
              src={`/horseRace/logo.png`}
              alt="Logo"
              width={45}
              height={45}
              style={{ cursor: "pointer" }}
            />
          </>
        )}

{/*
        {address ? (
          <>
            <a
              className={styles.secondaryButton}
              onClick={() => disconnectWallet()}
            >
              Disconnect Wallet
            </a>
            <p style={{ marginLeft: 8, marginRight: 8, color: "grey" }}>|</p>
            <p>{address.slice(0, 6).concat("...").concat(address.slice(-4))}</p>
          </>
        ) : (
          <a
            className={styles.mainButton}
            onClick={() => connectWithMetamask()}
          >
            Connect Wallet
          </a>
        )}
        */}

      </div>

    </div>
    
  );
}
