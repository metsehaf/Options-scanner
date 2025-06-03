import React from "react";
import StockPreviewClient from "./watchlistclient";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    console.error("Slug is missing or undefined");
    return <div>Error: Slug is required</div>;
  }

  return <StockPreviewClient slug={slug} />;
}
