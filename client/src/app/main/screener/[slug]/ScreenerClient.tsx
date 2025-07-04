"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./ScreenerClient.module.scss";
import ScreenerSkeleton from "@components/skeletons/ScreenerSkeleton";
import {
  ScreenerClientProps,
  IStock,
  IStockPercent,
  mostActiveStock,
  mostGainersStock,
  mostLosersStock,
} from "@types/screener";
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
  const [pageTitle, setPageTitle] = useState<string>("Screener");
  const [pageDescription, setPageDescription] = useState<string>("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    let isMountedCleanup = true;

    const fetchData = async () => {
      try {
        if (isMountedCleanup) {
          const fetchedData:
            | mostActiveStock
            | mostGainersStock
            | mostLosersStock
            | any = await scannerService.getScanner(slug);
          if (isMountedCleanup) {
            setDataLoaded(true);
            const calculatedRows = (() => {
              if (!fetchedData) return [];

              if ("mostActiveStock" in fetchedData) {
                const mostActiveStock = fetchedData.mostActiveStock.map(
                  (row: IStock, index: number) => ({
                    id: row.ticker ?? index,
                    ...row,
                  })
                );
                return {
                  fetchedData: mostActiveStock,
                  title: fetchedData.title,
                  description: fetchedData.description,
                };
              } else if ("mostGainerStock" in fetchedData) {
                const mostGainerStock = fetchedData.mostGainerStock.map(
                  (row: IStock, index: number) => ({
                    id: row.ticker ?? index,
                    ...row,
                  })
                );
                return {
                  fetchedData: mostGainerStock,
                  title: fetchedData.title,
                  description: fetchedData.description,
                };
              } else if ("mostLoserStock" in fetchedData) {
                const mostLoserStock = fetchedData.mostLoserStock.map(
                  (row: IStock, index: number) => ({
                    id: row.ticker ?? index,
                    ...row,
                  })
                );
                return {
                  fetchedData: mostLoserStock,
                  title: fetchedData.title,
                  description: fetchedData.description,
                };
              }
              // Try to find the first array property in fetchedData to map over
              // Collect all array values except 'title' and 'description'
              const dataArraysObj = {
                title: fetchedData.title || "Screener",
                description: fetchedData.description || "",
                data: Object.entries(fetchedData)
                  .filter(
                    ([key, value]) => key !== "title" && key !== "description"
                  )
                  .map(([_, value]) => value)
                  .flat(),
              };
              // Map over the collected dataArrays to normalize the rows
              const mappedRows = dataArraysObj.data.map(
                (row: any, index: number) => {
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
                }
              );
              return {
                fetchedData: mappedRows,
                title: fetchedData.title || "Screener",
                description: fetchedData.description || "",
              };
            })();
            // Ensure calculatedRows is always an object with title/description/fetchedData
            const rowsData = Array.isArray(calculatedRows)
              ? []
              : calculatedRows.fetchedData;
            const title = Array.isArray(calculatedRows)
              ? "Screener"
              : calculatedRows.title || "Screener";
            const description = Array.isArray(calculatedRows)
              ? ""
              : calculatedRows.description || "";

            setRows(rowsData);
            setPageTitle(title);
            setPageDescription(description);
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
      <div className={styles.header}>
        <h1 className="text-2xl font-bold">
          {rows.length > 0 ? pageTitle : "Screener"}
        </h1>
        <p className={styles.subheading}>
          {rows.length > 0 ? pageDescription : ""}
        </p>
      </div>
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
          disableRowSelectionOnClick={true}
          onRowClick={(params) => {
            if (params.row.ticker) {
              window.location.href = `/main/watchlist/${params.row.ticker}`;
            }
          }}
          sx={{
            "& .MuiDataGrid-row": {
              cursor: "pointer",
              transition: "background 0.2s",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            },
          }}
        />
      </div>
    </section>
  );
}
