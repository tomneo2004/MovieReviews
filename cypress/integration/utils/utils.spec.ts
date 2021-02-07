import {dateFromUTC} from '../../../src/utils/timeConverter';

describe('Utils test', ()=>{
    context('timerConverter.ts', ()=>{
        it('Convert time', ()=>{
            expect(dateFromUTC('2021-11-05T13:15:30Z')).eq('2021-11-05');
        })
    })
})

export {}