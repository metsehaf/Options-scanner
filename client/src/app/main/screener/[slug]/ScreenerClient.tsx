'use client';

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import {createFetcherWithToken} from '@lib/fetcher';
import useSWR from 'swr';
import styles from './ScreenerClient.module.scss';
import { ScreenerClientProps, IStock, mostActiveStock, mostGainersStock, mostLosersStock, IStockPercent } from '@types/screener';


const columns: GridColDef[] = [
  { field: 'ticker', headerName: 'Ticker', flex: 1 },
  { field: 'companyName', headerName: 'Company Name', flex: 2 },
  { field: 'price', headerName: 'Price', flex: 1 },
  { field: 'changes', headerName: 'Changes', flex: 1 },
  { field: 'changesPercentage', headerName: 'Change %', flex: 1 },
];


export default function ScreenerClient({ slug }: ScreenerClientProps) {
  const [token, setToken] = useState<string | null>(null);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch('/api/token');
        const json = await res.json();
        if (json.token) setToken(json.token);
        else console.error('Token not received:', json);
      } catch (e) {
        console.error('Token fetch failed:', e);
      }
    };

    getToken();
  }, []);

  const fetcher = token ? createFetcherWithToken(token) : null;

  const { data, error, isLoading } = useSWR<mostActiveStock | mostGainersStock | mostLosersStock | IStock[] | IStockPercent[]>(
    token && fetcher ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/scanner/${slug}` : null,
    fetcher
  );

  if (isLoading) return null; //
  if (error) return <p>Error loading screener data</p>;
  console.log('Screener data:', data);
  const rows = (() => {
    if (data && 'mostActiveStock' in data) {
      return data?.mostActiveStock.map((row: IStock, index: number) => ({
        id: row.ticker ?? index, // fallback to index if ticker is missing
        ...row,
      }));
    } else if (data && 'mostGainerStock' in data) { // Updated to match backend format
      console.log('Screener data:', data);
      return data?.mostGainerStock.map((row: IStock, index: number) => ({
        id: row.ticker ?? index,
        ...row,
      }));
    } else if (data && 'mostLoserStock' in data) {
      return data?.mostLoserStock.map((row: IStock, index: number) => ({
        id: row.ticker ?? index,
        ...row,
      }));
    }
    return data?.map((row, index: number) => {
      if ('ticker' in row && 'companyName' in row) {
        return {
          id: row.ticker ?? index,
          ...row,
        } as IStock;
      } else {
        return {
          id: index,
          ticker: row.symbol,
          companyName: row.name,
          changes: row.change,
          ...row,
        } as IStockPercent;
      }
    });
  })();

  return (
    <section className={styles.wrapper}>
      <h1 className="text-2xl font-bold">{slug.replace(/-/g, ' ')}</h1>
      <p className={styles.subheading}>Most Active Stocks</p>
      <div className={styles.dataGridContainer}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 25, page: 0 } },
          }}
          checkboxSelection
          sortingMode="client"
          onSortModelChange={setSortModel}
        />
      </div>
    </section>
  );
}
