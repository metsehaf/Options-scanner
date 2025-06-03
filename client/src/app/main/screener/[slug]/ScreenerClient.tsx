"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./ScreenerClient.module.scss";
import ScreenerSkeleton from "@components/skeletons/ScreenerSkeleton";
import { ScreenerClientProps, IStock, IStockPercent } from "@types/screener";
import { scannerService } from "@lib/services/scanner.service";

const columns: GridColDef[] = [
  { field: "ticker", headerName: "Ticker", flex: 1 },
  { field: "companyName", headerName: "Company Name", flex: 2 },
  { field: "price", headerName: "Price", flex: 1 },
  { field: "changes", headerName: "Changes", flex: 1 },
  { field: "changesPercentage", headerName: "Change %", flex: 1 },
];

export default function ScreenerClient({ slug }: ScreenerClientProps) {
  const [rows, setRows] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    let isMountedCleanup = true;

    const fetchData = async () => {
      try {
        if (isMountedCleanup) {
          const fetchedData = await scannerService.getScanner(slug);

          if (isMountedCleanup) {
            setDataLoaded(true);
            const calculatedRows = (() => {
              if (!fetchedData) return [];

              if ("mostActiveStock" in fetchedData) {
                return fetchedData.mostActiveStock.map(
                  (row: IStock, index: number) => ({
                    id: row.ticker ?? index,
                    ...row,
                  })
                );
              } else if ("mostGainerStock" in fetchedData) {
                return fetchedData.mostGainerStock.map(
                  (row: IStock, index: number) => ({
                    id: row.ticker ?? index,
                    ...row,
                  })
                );
              } else if ("mostLoserStock" in fetchedData) {
                return fetchedData.mostLoserStock.map(
                  (row: IStock, index: number) => ({
                    id: row.ticker ?? index,
                    ...row,
                  })
                );
              }
              return (fetchedData || []).map((row: any, index: number) => {
                if ("ticker" in row && "companyName" in row) {
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
            setRows(calculatedRows);
          }
        } else if (isMountedCleanup) {
          setDataLoaded(true);
          setRows([]);
          setError("Failed to retrieve token."); // Set error
        }
      } catch (e: any) {
        if (isMountedCleanup) {
          console.error("Error fetching data:", e);
          setDataLoaded(true);
          setRows([]);
          setError(e.message || "An error occurred while fetching data."); // Set error
        }
      }
    };

    fetchData();

    return () => {
      isMountedCleanup = false;
    };
  }, [slug]);

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }
  if (!dataLoaded) {
    return <ScreenerSkeleton />;
  }

  return (
    <section className={styles.wrapper}>
      <h1 className="text-2xl font-bold">
        {rows.length > 0 && "title" in rows[0] ? rows[0].title : "Screener"}
      </h1>
      <p className={styles.subheading}>
        {rows.length > 0 && "description" in rows[0]
          ? rows[0]?.description
          : ""}
      </p>
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
        />
      </div>
    </section>
  );
}
