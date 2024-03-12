import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

import { ThirdwebSDK } from '@thirdweb-dev/sdk';


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
} from '@/config/contractAddresses';




import { get } from '@vercel/edge-config';

import { kv } from '@vercel/kv';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { admin, address, tokenid, toaddress } = req.body;



  try {


    ///const admin = useAddress();

    console.log("admin", admin);

    if (admin != "0x1EcA452d5714F5ebeA7202c5F213840a61083a38" // oh
    && admin != "0x1a0d07acCEBA47158552A8ac3d52C2CFa558a64c" // oh2
    && admin != "0x26597616ed4e44379ba0Eb1EB86C4cFd82606F3E"
    && admin != "0x6a438b6e34499a88662911a5937557B737331B56" // oh3

    
    ) { // nevertry
      throw new Error("No admin found");
    }




    if (!address) {
      throw new Error("No address found");
    }
    console.log("address", address);

    if (!tokenid) {
      throw new Error("No tokenid found");
    }
    console.log("tokenid", tokenid);

    if (!toaddress) {
      throw new Error("No toaddress found");
    }
    console.log("toaddress", toaddress);
  
    
    //const privatekey = process.env[address];

    ///const privatekey = await get(address);

    const privatekey = await kv.get(address);


    //////console.log("privatekey", privatekey);


    if (!privatekey) {
      throw new Error("No private key found");
    }



    const sdk = ThirdwebSDK.fromPrivateKey(
      String(privatekey),
      "polygon",
      {
        gasless: {
          openzeppelin: {
            relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL || "",
          },
        },
      }
    );


    // sdk gasless setup
    //sdk.setRelayer("https://relayer.thirdweb.net");

    
    
    


    const contract = await sdk.getContract(nftDropContractAddressHorse);

    //console.log("contract", contract);

    
    /////const listings = await contract.directListings.getAllValid();

    const result = await contract.erc721.transfer(toaddress, tokenid);

    ///console.log("result", result);

    /*
    {
      to: '0x41FBA0bd9f4DC9a968a10aEBb792af6A09969F60',
      from: '0xe3262a948C7CeEBe9528C6Cb4Df8591d04cFa350',
      contractAddress: null,
      transactionIndex: 59,
      gasUsed: BigNumber { _hex: '0xf831', _isBigNumber: true },
      logsBloom: '0x00000000000000000000000000000000000000004000000000000000100000000000000000000000000000000000000000008000000000000000000004200000800000000000000000000008000000800000000000000000001100000000000008000000020000000000000000000800000000000000000080000010020000000000000000500000000000000000000000000008000000000000000000000000220080000000000400000000000000000000000000000000000000000000004000000002000000000001004000000000000000000000000001100000000020000010200000000000000000000000000000000000000000000000000000100000',
      blockHash: '0xbe4fc32a5d49975f04892e0b4dc23ee3f65145983ff395428c32c853dcf5fc35',
      transactionHash: '0x1ca0105f7535ba99b5326330b49addc8309851fca67af0cf1d68551ad8578e88',
      logs: [ [Object], [Object], [Object] ],
      blockNumber: 44945227,
      confirmations: 2,
      cumulativeGasUsed: BigNumber { _hex: '0xaa73bb', _isBigNumber: true },
      effectiveGasPrice: BigNumber { _hex: '0x1d832c1c88', _isBigNumber: true },
      status: 1,
      type: 2,
      byzantium: true,
      events: [ [Object], [Object], [Object] ]
    }
    */


    res.json({
      success: true,
      txid: "txid",
    })

  } catch (error: any) {
    console.log("error===", error);
    res.json({
      success: false,
      message: error.message,
    });
  }



  /*
  const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
  const token = <string>process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);

 

  // console.log(phone, message);
  client.messages
    .create({
      body: message,
      from: '+17622254217',
      to: phone,
    })
    .then((message) =>
      res.json({
        success: true,
      })
    )
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
      });
    });
    */


}
