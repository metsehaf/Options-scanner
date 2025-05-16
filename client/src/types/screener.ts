export interface IStock {
    id?: number | string;
    ticker: string;
    changes: number;
    price: string;
    changesPercentage: string;
    companyName: string;
  }
  
  export interface mostActiveStock {
    title: string;
    description: string;
    "mostActiveStock": IStock[];
  }
  
  export interface mostGainersStock {
    title: string;
    description: string;
    "mostGainerStock": IStock[];
  }
  
  export interface mostLosersStock {
    title: string;
    description: string;
    "mostLoserStock": IStock[];
  }
  
  export interface ScreenerClientProps {
    slug: string;
  }
  
 export interface IStockPercent {
    symbol: string;
    change: number;
    price: string;
    changesPercentage: string;
    name: string;
  }