import type { NextApiRequest, NextApiResponse } from 'next';

import { Network, Alchemy } from 'alchemy-sdk';

import { nftDropContractAddressHorse } from '@/config/contractAddresses';

/*
export default async function handler(req, res) {


  const { pageKey, pageSize } = JSON.parse(req.body);

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

*/

export default async function handler(
  req: NextApiRequest,
  //res: NextApiResponse<Data>
  res: NextApiResponse
) {
  const { pageKey, pageSize } = req.query;

  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    ///apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH',
    network: Network.MATIC_MAINNET,
  };
  const alchemy = new Alchemy(settings);

  try {
    const nfts = await alchemy.nft.getNftsForContract(
      nftDropContractAddressHorse,
      {
        pageKey: pageKey ? pageKey : null,
        pageSize: pageSize ? pageSize : null,

        //pageKey: pageKey ? pageKey : null,
        //pageSize: pageSize ? pageSize : null,
      }
    );

    {
      /*
    const nfts = await alchemy.nft.getNftsForContract(
      nftDropContractAddressHorse,
      {
        pageKey: pageKey ? pageKey : null,
        pageSize: pageSize ? pageSize : null,
      }
    );  
    */
    }

    //console.log('nfts', nfts);

    const formattedNfts = nfts.nfts.map((nft) => {
      const { contract, title, tokenType, tokenId, description, media, rawMetadata } = nft;

      //console.log('rawMetadata', rawMetadata);

      return {
        contract: contract.address,
        symbol: contract.symbol,
        media: media[0]?.gateway
          ? media[0]?.gateway
          : 'https://via.placeholder.com/500',
        collectionName: contract.openSea?.collectionName,
        verified: contract.openSea?.safelistRequestStatus,
        tokenType,
        tokenId,
        title,
        description,
        format: media[0]?.format ? media[0]?.format : 'png',
        
        //attributes: rawMetadata?.attributes,
        
        grade: rawMetadata?.attributes?.find(
          (attribute: any) => attribute.trait_type === 'Grade'
        )?.value,

      };
    });


    /*
          {names.filter(name => name.includes('J')).map(filteredName => (
        <li>
          {filteredName}
        </li>
      ))}
    */
    
    const filteredNfts = formattedNfts.filter(nft => (

        nft.title.length && nft.description.length && nft.media && nft.grade === 'B'
        
        /*
        {
          
          nft.attributes.map((attribute:any) => {
            attribute.trait_type === 'Grade' && attribute.value === 'A'
          })
          

        }
        */

      )
    );



    res.status(200).json({
      nfts: filteredNfts.length ? filteredNfts : null,
      pageKey: nfts.pageKey,
    });
    // the rest of your code
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message: 'something went wrong, check the log in your terminal',
    });
  }
}
