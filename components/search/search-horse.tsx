import Button from '@/components/ui/button';

import Feeds from '@/components/search/feeds-horse';
import OwnedFeeds from '@/components/search/feeds-horse-owned';
import ListedFeeds from '@/components/search/feeds-horse-listed';

import { useDrawer } from '@/components/drawer-views/context';
import { Filters, GridSwitcher, SortList } from '@/components/search/filters';
import { OptionIcon } from '@/components/icons/option';

import ParamTab, { TabPanel } from '@/components/ui/param-tab';


export default function Search() {
  const { openDrawer } = useDrawer();

  const tabMenu = [
    {
      title: 'Items',
      path: 'items',
    },
    {
      title: 'Owned',
      path: 'owned',
    },
    {
      title: 'Listed',
      path: 'listed',
    },
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
      <div className="grid 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)]">

{/*
        <div className="hidden border-dashed border-gray-200 ltr:border-r ltr:pr-8 rtl:border-l rtl:pl-8 dark:border-gray-700 2xl:block">
          <Filters />
        </div>
  */}

          <span className="m-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            Granderby Horse NFT
          </span>

          <span className="m-3 text-xm font-medium text-gray-900 dark:text-white sm:text-sm">
            Items 3,645 · Created Jun 2023 · Creator earnings 0% · Chain Polygon · Category Gaming
          </span>


      
        <ParamTab tabMenu={tabMenu} >


          <TabPanel className="focus:outline-none  ">

            <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">

              <div className="relative z-10 mb-6 flex items-center justify-between ">

                <div className='w-full flex items-right justify-end'>

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

                <div className='w-full flex items-right justify-end'>

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


          <TabPanel className="focus:outline-none  ">

            <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">

              <div className="relative z-10 mb-6 flex items-center justify-between ">

                <div className='w-full flex items-right justify-end'>

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


        </ParamTab>
       


{/*
        <div className="fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 sm:hidden">
          <Button onClick={() => openDrawer('DRAWER_SEARCH')} fullWidth>
            Filters
          </Button>
        </div>
  */}

      </div>
    </>
  );
}
