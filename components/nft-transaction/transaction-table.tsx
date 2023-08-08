import React, { useEffect } from 'react';

import cn from 'classnames';

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { ArrowRight } from '@/components/icons/arrow-right';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { LinkIcon } from '@/components/icons/link-icon';

import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';

import { useAddress } from '@thirdweb-dev/react';
import { add, set } from 'lodash';

import { nftDropContractAddressHorse } from '@/config/contractAddresses';

import { tr } from 'date-fns/locale';
import { array } from 'yup';

/*
export const TransactionData = [
  {
    id: 0,
    transactionType: 'Receive',
    createdAt: '2023-07-18 11:32:20',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '32.2231345',
      usdBalance: '11,032.24',
    },
  },
  {
    id: 1,
    transactionType: 'Send',
    createdAt: '2023-07-16 16:28:42',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '43.534',
      usdBalance: '1,032.24',
    },
  },
  {
    id: 2,
    transactionType: 'Receive',
    createdAt: '2023-07-15 06:20:20',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '645.45',
      usdBalance: '21,032.24',
    },
  },
  {
    id: 3,
    transactionType: 'Send',
    createdAt: '2023-07-15 02:43:25',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '1225.634',
      usdBalance: '1,232.24',
    },
  },
  {
    id: 4,
    transactionType: 'Receive',
    createdAt: '2023-07-15 02:43:25',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '43.5422',
      usdBalance: '9,032.24',
    },
  },
  {
    id: 5,
    transactionType: 'Receive',
    createdAt: '2023-07-15 02:43:25',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '18443.24245',
      usdBalance: '31,032.24',
    },
  },
  {
    id: 6,
    transactionType: 'Receive',
    createdAt: '2023-07-15 17:33:28',
    //symbol: 'BTC',
    status: 'Completed',
    address: '0x0898hshiw36...',
    amount: {
      balance: '422.24245',
      usdBalance: '31,032.24',
    },
  },
];
*/

const COLUMNS = [
  {
    //Header: 'ID',
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">ID</div>,
    accessor: 'id',
    minWidth: 100,
    maxWidth: 100,
  },
  /*
  {
    Header: 'Type',
    accessor: 'transactionType',
    minWidth: 30,
    maxWidth: 40,
  },
  */
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Type</div>,
    accessor: 'transactionType',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltext-left">
        {value === 'Send' ? (
          <div className="-tracking-[1px] ">
            <LongArrowRight className="h-5 w-5  md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-7 xl:w-7" />
            <span className="text-gray-600 dark:text-gray-400">{value}</span>
          </div>
        ) : (
          <div className="-tracking-[1px]">
            <LongArrowLeft className="h-5 w-5  md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-7 xl:w-7" />
            <span className="text-gray-600 dark:text-gray-400">{value}</span>
          </div>
        )}
      </div>
    ),
    minWidth: 40,
    maxWidth: 40,
  },

  /*
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Amount</div>,
    accessor: 'amount',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="-tracking-[1px] ltr:text-right rtl:text-left">
        <strong className="mb-0.5 flex justify-end text-base md:mb-1.5 md:text-lg lg:text-base 3xl:text-2xl">
          {Number(value.balance).toFixed(2)}
          <span className="inline-block text-[#2b57a2] ltr:ml-1.5 rtl:mr-1.5 md:ltr:ml-2 md:rtl:mr-2">
            ROM
          </span>
        </strong>

      </div>
    ),
    minWidth: 100,
    maxWidth: 200,
  },
  */
  /*
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Asset</div>,
    accessor: 'symbol',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">{value}</div>
    ),
    minWidth: 80,
    maxWidth: 120,
  },
  */
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Date</div>,
    accessor: 'createdAt',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">{value}</div>
    ),
    minWidth: 100,
    maxWidth: 130,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Address</div>,
    accessor: 'address',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-end">
        <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />
        {value == '0x0000000000000000000000000000000000000000'
          ? 'Drops'
          : value.length > 10
          ? value.substring(0, 10) + '...'
          : value}
      </div>
    ),
    minWidth: 90,
    maxWidth: 150,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Status</div>,
    accessor: 'status',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="font-bold text-green-600 ltr:text-right rtl:text-left">
        {value}
      </div>
    ),
    minWidth: 70,
    maxWidth: 100,
  },
];

export default function TransactionTable() {
  
  //const data = React.useMemo(() => transactionData, [ ]);

  const columns = React.useMemo(() => COLUMNS, []);

  const [transactions, setTransactions] = React.useState([]);

  const address = useAddress();

  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      //data,
      data: transactions,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  const { pageIndex } = state;

  const pageKey = '1';
  const pageSize = '10';

  useEffect(() => {

    const getTransactions = async () => {

      //if (address) {

        // post to api to get transactions
        const formInputs = {
          pageKey: pageKey,
          pageSize: pageSize,
          contract: nftDropContractAddressHorse,
          //address: address,
        };

        const res = await fetch('/api/nft/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formInputs),
        });

        const data = await res.json();

        console.log('getTransactions data: ', data);

        /*
         {
      blockNum: '0x2bdb72c',
      uniqueId: '0x16829eebbf7552840016bf10235d596f643d4fbb69655ef54ccf52f64ea88b34:log:25',
      hash: '0x16829eebbf7552840016bf10235d596f643d4fbb69655ef54ccf52f64ea88b34',
      from: '0x6271117e328c1720bae5d4cca95eda7554bcfa70',
      to: '0x15fd1e771828260182b318ef812660badf207fba',
      value: 33,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'ROM',
      category: 'erc20',
      rawContract: [Object]
    },
    */

        ///setTransers(data.transfers);

        const transactions = [] as any;

        data.transactions?.map((transfer: any) => {
          const transactionData = {
            id: transfer.blockNum,
            //transactionType: transfer.from === address ? 'Send' : 'Receive',
            transactionType: 'Send',
            createdAt: transfer.createdAt,
            
            //address: transfer.from === address ? transfer.to : transfer.from,
            address: transfer.to,

            amount: {
              balance: transfer.value,
              usdBalance: '11,032.24',
            },
            status: 'Completed',
          };

          //console.log('transactionData: ', transactionData);

          ////setTransers((transfers) => [...transfers, transactionData]);

          transactions.push(transactionData);
        });

        ///console.log('transactions: ', transactions);

        setTransactions(transactions);
      }

    //};

    getTransactions();

  //}, [address]);
      
  }, []);

  return (
    <div className="m-5 border rounded-lg">

      <div className=" rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
        <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
          <h2 className="mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white sm:text-md md:mb-0 md:text-xl">
            Item Activity
          </h2>
        </div>
      </div>

      
       
          <div className="-mx-0.5 dark:[&_.os-scrollbar_.os-scrollbar-track_.os-scrollbar-handle:before]:!bg-white/50">

            <Scrollbar style={{ width: '100%' }} autoHide="never" className="">

           
              <div className="px-0.5">
                <table
                  {...getTableProps()}
                  className="transaction-table w-full border-separate border-0"
                >
                  <thead className="text-sm text-gray-500 dark:text-gray-300">
                    {headerGroups.map((headerGroup, idx) => (
                      <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                        {headerGroup.headers.map((column, idx) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            key={idx}
                            className="group  bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
                          >
                            <div className="flex items-center">
                              {column.render('Header')}
                              {column.canResize && (
                                <div
                                  {...column.getResizerProps()}
                                  className={`resizer ${
                                    column.isResizing ? 'isResizing' : ''
                                  }`}
                                />
                              )}
                              <span className="ltr:ml-1 rtl:mr-1">
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <ChevronDown />
                                  ) : (
                                    <ChevronDown className="rotate-180" />
                                  )
                                ) : (
                                  <ChevronDown className="rotate-180 opacity-0 transition group-hover:opacity-50" />
                                )}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    {...getTableBodyProps()}
                    className="text-xs font-medium text-gray-900 dark:text-white 3xl:text-sm"
                  >


                  {address && (
                    <>
                    {page.map((row, idx) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          key={idx}
                          className="mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                        >
                          {row.cells.map((cell, idx) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                key={idx}
                                className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
                              >
                                {cell.render('Cell')}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}

                    </>
                  )}

                  </tbody>
                </table>
              </div>

            

            </Scrollbar>
          </div>

          <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-5 py-4 text-sm shadow-card dark:bg-light-dark lg:py-6">
            <div className="flex items-center gap-5">
              <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                title="Previous"
                shape="circle"
                variant="transparent"
                size="small"
                className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
              >
                <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
              </Button>
              <div>
                Page{' '}
                <strong className="font-semibold">
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </div>
              <Button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                title="Next"
                shape="circle"
                variant="transparent"
                size="small"
                className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
              >
                <LongArrowRight className="h-auto w-4 rtl:rotate-180 " />
              </Button>
            </div>
          </div>
        
    
    </div>
  );
}
