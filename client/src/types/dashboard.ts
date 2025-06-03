import { StaticImageData } from "next/image";

export interface navLinks{
    title: string;
    url: string;
}

export type cardType = {
    title: string;
    content: string;
    image: StaticImageData;
}


export type CustomCardProps = {
    image: StaticImageData;
    title?: string;
    description?: string;
    height?: number | string;
    width?: number | string;
  };