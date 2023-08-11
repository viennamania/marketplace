import cn from 'classnames';

import { NFTList } from '@/data/static/horse-list';

import NFTGrid from '@/components/ui/nft-card';

//import AuthorImage from '@/assets/images/author.jpg';
import AuthorImage from '@/assets/images/author.jpg';

import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import { Network, Alchemy } from 'alchemy-sdk';

import { useEffect, useState } from 'react';

import { nftDropContractAddressHorse } from '@/config/contractAddresses';

import useSWR from 'swr';
import { fetcher } from '../../lib/utils';

import { StaticImageData } from 'next/image';
import { OptionalPropertiesInput } from '@thirdweb-dev/sdk';
import { set } from 'date-fns';

import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import Image from "next/image";

import { useRouter } from 'next/router';




export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();

  const router = useRouter();




  type NFT = {
    id: string;
    author: string;
    authorImage: StaticImageData;
    image: string;
    name: string;
    collection: string;
    price: string;
  };

  //const [employees, setEmployees] = useState<Employee[]>([]);

  const [horses, setHorses] = useState<NFT[]>([]);

  //const [cursor, setCursor] = useState<string | undefined>(undefined);


  const settings = {
    ///apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key. creath.park@gmail.com

    apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key. songpalabs@gmail.com
    network: Network.MATIC_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);



  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery (
    "infiniteCharacters",
    async (
      {
        ///pageParam = 1,

        pageParam = '',

      }
      ) =>

    /*
      await fetch(
        `https://rickandmortyapi.com/api/character/?page=${pageParam}`
      ).then((result) => result.json()),
      */
      await alchemy.nft.getNftsForContract(
        nftDropContractAddressHorse,
        {
          pageKey: pageParam,
          pageSize: 40,
        }
      ).then((result) => { //result
          ///console.log("result======>", result)
          return result
        }),
      
      /*
      .finally((result:any) => {
        pageParam = result.pageKey;
      }),
      */


    {
      getNextPageParam: (lastPage, pages   ) => {

        //console.log("lastPage======>", lastPage);
        //console.log("pages======>", pages);

        if (lastPage.pageKey) {
          return lastPage.pageKey;
        } else {
          return undefined;
        }

      },
    }

  );



  /////console.log("status======>", status);

/*
  useEffect(() => {
    const main = async () => {
      //Call the method to fetch metadata
      const response = await alchemy.nft.getNftsForContract(
        nftDropContractAddressHorse,
        {
          //pageKey: 'cursor',
          pageSize: 10,
        }
      );

      //console.log(response.pageKey);

      setCursor(response.pageKey);

      //Logging the response to the console

      ///setHorses(response.nfts)

      const NFTList = response.nfts.map((nft) => {
        const { contract, title, tokenType, tokenId, description, media } = nft;

        //console.log("mdia", media[0]);


        return {
          id: tokenId,
          author: contract.address,
          authorImage: AuthorImage,
          image: media[0]?.thumbnail
            ? media[0]?.thumbnail
            : 'https://via.placeholder.com/500',
          name: title,
          collection: contract.openSea?.collectionName
            ? contract.openSea?.collectionName
            : '',
          price: '0',


        };
      });

      setHorses(NFTList);

      ///setHorses([...horses, ...NFTList]);

      ///setHorses([...horses, ...response.nfts]);

      ///setHorses((horses) => [...horses, response.nfts]);

      ///setHorses((horses) => [...horses, NFTList]);

      //setHorses(horses.concat(response.nfts))

      ///console.log(NFTList);
    };

    main();
  }, [alchemy.nft]);

  */


  //const { data } = useSWR(`/api/getNftsForCollection`, fetcher);

  //console.log(data);

  return (

    <>

      
      {status === 'loading' && (
        <>
          <div className="flex flex-col items-center justify-center ">
            <div className='text-xl'>Loading horses...</div>

            <span className="mt-10 h-screen w-full flex justify-center items-top">
              <span className="animate-spin relative flex h-10 w-10 rounded-sm bg-purple-400 opacity-75"></span>
            </span>

          </div>
        </>
      )} 
      


      {status === "success" && (

        <InfiniteScroll
          dataLength={data?.pages.length * 20}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            
            <div className="mt-10 flex flex-col items-center justify-center ">
              <div className='text-xl'>Loading horses...</div>

              <span className="mt-10 h-screen w-full flex justify-center items-top">
                <span className="animate-spin relative flex h-10 w-10 rounded-sm bg-purple-400 opacity-75"></span>
              </span>

            </div>

          }
        >

            {data?.pages.map((page) => (

              <div
                key={page.pageKey}
                className={cn(
                  'grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4',
                  isGridCompact
                    ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
                    : '3xl:!grid-cols-3 4xl:!grid-cols-4',
                  className
                )}
>


                {page.nfts?.map((nft) => (
              

                    <div key={nft?.tokenId}
                      className='relative overflow-hidden bg-white rounded-lg shadow-lg'
                      onClick={() =>
                        //setTokenid(nft.metadata.id.toString()),
                        //setIsOpen(true)
                        router.push(
                          '/horse-details/' + nft?.tokenId
                        )
                      }
                    >


                      <Image
                        src={nft?.media[0]?.gateway ? nft?.media[0]?.gateway : '/default-nft.png' }
                        alt={nft?.title}
                        height={500}
                        width={500}
                        loading='lazy'
                      />
                      <div className='w-full m-2'>
                        <p className='text-md font-bold'>{nft?.title}</p>
                      </div>

                    </div>
            

                ))}
                
              </div>

            ))}

        </InfiniteScroll>

      )}


    </>

  );
}
