import {dateFromUTC} from '../../../src/utils/timeConverter';

describe('Time Converter', ()=>{
    it('Covert time', ()=>{
        expect(dateFromUTC('2021-11-05T13:15:30Z')).eq('2021-11-05');
    })
})

export {}