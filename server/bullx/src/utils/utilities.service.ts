import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitesService {
  // Calculate percentage
  public calcPercent(value: any, total: any) {
    const percent = (value / total) * 100;
    return percent > 100 ? 100 : this.roundUpDecimal(percent, 0);
  }

  // Convert minutes into hours:mins
  public convertMinsToTime(minutes: number) {
    const formula = 60;
    const min = minutes % formula;
    const hours = (minutes - min) / formula;
    const timeFormat = { hours, min };
    return timeFormat;
  }
  // Convert minutes to seconds
  public convertMinsToSecs(minutes: number) {
    const seconds = minutes * 60;
    return this.roundUpDecimal(seconds, 0);
  }
  public convertSecsToMins(seconds: number) {
    const minutes = seconds / 60;
    return this.roundUpDecimal(minutes, 0);
  }

  // Random shuffle
  public shuffle(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // Convert to bool values for checking falsy
  public checkBool(item: any) {
    // Boolean will convert any values into a bool value
    return Boolean(item);
  }

  // Extends dates
  public extendDate(date: string, extendTo: number) {
    const originalDate = new Date(date);
    const extendedDate = new Date(
      originalDate.setDate(originalDate.getDate() + extendTo),
    ).toISOString();
    return extendedDate;
  }
  // Gets first day of the month
  public getFirstDay() {
    const currentDate = new Date();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    return firstDay;
  }
  // Gets last day of the month
  public getLastDay() {
    const currentDate = new Date();
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    return lastDay;
  }

  // Round up decimal places
  public roundUpDecimal(value: number, place: number) {
    return Math.ceil(value * Math.pow(10, place)) / Math.pow(10, place);
  }
}
