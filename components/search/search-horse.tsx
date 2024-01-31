import Button from '@/components/ui/button';

import Feeds from '@/components/search/feeds-horse';
import OwnedFeeds from '@/components/search/feeds-horse-owned';
import ListedFeeds from '@/components/search/feeds-horse-listed';

import { useDrawer } from '@/components/drawer-views/context';


import {
  Filters,
  GridSwitcher,
  SortList,
} from '@/components/search/filters-horse';



import { OptionIcon } from '@/components/icons/option';

import ParamTab, { TabPanel } from '@/components/ui/param-tab';

import Image from 'next/image';


export default function Search() {

  ////const { openDrawer, isOpen } = useDrawer();

  ///console.log("isOpen: " + isOpen);

  const { openDrawer } = useDrawer();



  const tabMenu = [
    {
      title: 'Items',
      path: 'items',
    },
    {
      title: 'Listed',
      path: 'listed',
    },
    /*
    {
      title: 'Owned',
      path: 'owned',
    },
    */
    /*
    {
      title: 'Portfolio',
      path: 'portfolio',
    },
    {
      title: 'History',
      path: 'history',
    },
    */
  ];



  return (
    <>
      <div className="mt-10 flex flex-col text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl">

        <div className="justify-left flex flex-row items-center">

          <Image
            src="/horseRace/Hrs_00006009.png"
            alt="Granderby Horse NFT"
            width={28}
            height={28}
            className="rounded-full"
          />

          <span className="ml-3">Granderby Horse NFT</span>
        </div>
        <span className="mt-3 text-sm">
          Items 3,645 · Created Jun 2023 · Creator earnings 0% · Chain Polygon ·
          Category Gaming
        </span>
      </div>

      {/*
      <div className="grid 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)]">
      */}

      <div className="flex w-full ">

        {/* Filters */}
        {/*
        <div className="mt-10 hidden border-dashed border-gray-200 ltr:border-r ltr:pr-8 rtl:border-l rtl:pl-8 dark:border-gray-700 2xl:block">
          <Filters />
        </div>
        */}

      
        

        <div className="m-3 block ">
          
          <ParamTab tabMenu={tabMenu}>

            {/* Total list of items */}
            <TabPanel className="focus:outline-none  ">

              <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">
                
                <div className="relative z-10 mb-6 flex items-center justify-between ">

                  <div className="items-right flex w-full justify-end">

                    <div className="flex gap-6 3xl:gap-8 ">
                      <SortList />

                      <div className="hidden 3xl:block">
                        <GridSwitcher />
                      </div>

                      <div className="hidden sm:block 2xl:hidden">
                        <Button
                          shape="rounded"
                          size="small"
                          variant="ghost"
                          color="gray"
                          onClick={() => openDrawer('DRAWER_SEARCH')}
                          className="!h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                        >
                          <OptionIcon className="relative h-auto w-[18px]" />
                        </Button>
                      </div>


                    </div>
                  </div>
                </div>

                <Feeds />
              </div>
            </TabPanel>

            <TabPanel className="focus:outline-none  ">
              <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">
                <div className="relative z-10 mb-6 flex items-center justify-between ">
                  <div className="items-right flex w-full justify-end">
                    <div className="flex gap-6 3xl:gap-8 ">
                      <SortList />

                      <div className="hidden 3xl:block">
                        <GridSwitcher />
                      </div>

                      <div className="hidden sm:block 2xl:hidden">
                        <Button
                          shape="rounded"
                          size="small"
                          variant="ghost"
                          color="gray"
                          onClick={() => openDrawer('DRAWER_SEARCH')}
                          className="!h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                        >
                          <OptionIcon className="relative h-auto w-[18px]" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <ListedFeeds />
              </div>
            </TabPanel>

            {/*
            <TabPanel className="focus:outline-none  ">
              <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">
                <div className="relative z-10 mb-6 flex items-center justify-between ">
                  <div className="items-right flex w-full justify-end">
                    <div className="flex gap-6 3xl:gap-8 ">
                      <SortList />

                      <div className="hidden 3xl:block">
                        <GridSwitcher />
                      </div>

                      <div className="hidden sm:block 2xl:hidden">
                        <Button
                          shape="rounded"
                          size="small"
                          variant="ghost"
                          color="gray"
                          onClick={() => openDrawer('DRAWER_SEARCH')}
                          className="!h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                        >
                          <OptionIcon className="relative h-auto w-[18px]" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <OwnedFeeds />
              </div>
            </TabPanel>
            */}


          </ParamTab>
        </div>

        <div className="fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 sm:hidden">

          {/* dark mode off */}

          <Button
            //color="info"
            onClick={() => openDrawer('DRAWER_SEARCH')}
            fullWidth
          >
            Filters
          </Button>
        </div>

      </div>
    </>
  );

}
