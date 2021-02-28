import moment from "moment/moment";

/**
 * convert UTC datetime to date in string
 * @param utcDateTime  UTC datetime in string
 * @param format refer to  https://momentjs.com/docs/#/parsing/string-format/ default YYYY-MM-DD
 */
export function dateFromUTC(
  utcDateTime: string,
  format: string = "YYYY-MM-DD"
) {
  const date = moment(utcDateTime);
  return date.format(format);
}

/**
 * format a datetime
 *
 * @param datetime date time
 * @param format format
 */
export function formatDateTime(
  datetime: string,
  format: string = "YYYY-MMM-DD"
) {
  const data = moment(datetime);
  return data.format(format);
}

export default {};
