import React from 'react';
import { shallow } from 'enzyme';
import RoundButton from '../roundButton';

describe('Round Button Component', ()=>{
    it('render without issues', ()=>{
        const component = shallow(<RoundButton />);
        expect(component.length).toBe(1);
    })
})