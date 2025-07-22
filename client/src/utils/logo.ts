export const getLogoUrl = (symbol: string): string => {
  // Try using Clearbit or fallback to a local asset or known CDN
  return `https://logo.clearbit.com/${symbol.toLowerCase()}.com`;
};
