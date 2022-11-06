//@ts-ignore
import moment from "moment";

export class DateUltils {
  static HH_MM_12 = "hh:mm A";
  static DD_MM = "DD/MM";
  static formatTimeStamp = (timestamp: any, formatString: string) => {
    const dateFromTimestamp = new Date(timestamp * 1000);

    return moment(dateFromTimestamp).format(formatString);
  };
}
