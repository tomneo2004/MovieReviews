import React from 'react';
import {mount} from '@cypress/react';
import RoundButton from '../../../src/components/unit/roundButton/roundButton';

describe('Round Button Component', ()=>{
    it('render without issues', ()=>{
        // const component = shallow(<RoundButton />);
        // expect(component.length).eq(1);
        mount(<RoundButton>text</RoundButton>);
        cy.get('button').find('.MuiButton-label').should('contain.text', 'text');
        
    })
})