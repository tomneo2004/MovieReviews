import moment from 'moment';

export function dateFromUTC(utcDateTime:string){
    const date = moment(utcDateTime);
    return date.format('YYYY-MM-DD')
}