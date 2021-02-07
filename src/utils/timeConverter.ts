import moment from 'moment';

/**
 * convert UTC datetime to date in string
 * @param utcDateTime  UTC datetime in string
 * @param format refer to  https://momentjs.com/docs/#/parsing/string-format/ default YYYY-MM-DD
 */
export function dateFromUTC(utcDateTime:string, format:string='YYYY-MM-DD'){
    const date = moment(utcDateTime);
    return date.format(format)
}