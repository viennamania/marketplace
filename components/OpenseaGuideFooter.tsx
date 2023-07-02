import styles from "../../styles/Thirdweb.module.css";
import React from "react";

export default function OpenseaGuideFooter() {

  const url = "https://opensea.io/collection/granderby-horse-nft";

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: -120,
          right: -80,
          height: 300,
          width: 150,
          border: "1px solid #eaeaea",
          transform: "rotate(45deg)",
          backgroundColor: " #262935",
          cursor: "pointer",
        }}
        role="button"
        onClick={() => window.open(url, "_blank")}
      />

      <div
        style={{
          position: "fixed",
          bottom: 18,
          right: 18,
        }}
      >
        <img
          src={"/logo-opensea.png"}
          alt="opensea url"
          width={40}
          height={40}
          role="button"
          style={{ cursor: "pointer" }}
          onClick={() => window.open(url, "_blank")}
        />



      </div>
    </>
  );
}
