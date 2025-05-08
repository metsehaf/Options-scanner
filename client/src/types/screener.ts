export interface IStock {
    ticker: string;
    changes: number;
    price: string;
    changesPercentage: string;
    companyName: string;
  }
  
  export interface mostActiveStock {
    "mostActiveStock": IStock[];
  }
  
  export interface mostGainersStock {
    "mostGainerStock": IStock[];
  }
  
  export interface mostLosersStock {
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