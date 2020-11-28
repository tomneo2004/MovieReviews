export default function convertFilmLength(minutes:number){
    const h = minutes / 60 | 0;
    const m = minutes % 60 | 0;
    let str = '';

    if(h > 0) str += `${h}h `;
    if(m > 0) str += `${m}m`;

    return str;
}