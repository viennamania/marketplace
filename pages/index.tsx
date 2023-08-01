import { NextSeo } from 'next-seo';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';

import Search from '@/components/search/search-horse';

import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import RetroSearch from '@/components/search/retro-search';
import RootLayout from '@/layouts/_root-layout';

import { authorData } from '@/data/static/author';
import Image from "next/image";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const SearchPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {

  const { layout } = useLayout();

  // render retro layout
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return (
      <>
        <NextSeo title="Explore NTF" description="Granderby - Web3 NFT Game" />
        <RetroSearch />
      </>
    );
  }

  // render default create NFT component
  return (
    <>
      <NextSeo title="Explore NTF" description="Granderby - Web3 NFT Game" />

      <div className="relative mt-24 h-36 w-full overflow-hidden sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
        <Image
          src={authorData?.cover_image?.thumbnail}
          placeholder="blur"
          fill
          className="object-cover"
          alt="Cover Image"
        />
      </div>

      <div className=" text-sm leading-loose p-5 mt-0 text-justify">

        <Search />
        
      </div>
      
    </>
  );
};

/*
SearchPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
*/

export default SearchPage;
