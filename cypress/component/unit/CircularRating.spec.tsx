import React from 'react';
import {mount} from '@cypress/react';
import CircularRating, { getCircularRating } from '../../../src/components/unit/CircularRating/CircularRating';

describe('CircularRating Component', ()=>{
    it('Render successful', ()=>{
        mount(<CircularRating id='rating' />);

        cy.get('#rating')
          .should('be.visible');
    })

    it('Value range with progress', ()=>{
        mount(<CircularRating id='rating' maxValue={10} value={5} />);
        
        cy.get('#rating')
          .contains('5')
          .should('exist');
    })

    it('None number rating', ()=>{
        mount(<CircularRating id='rating' maxValue={10} value={null} />);
        cy.get('#rating')
          .should('not.exist');
    })

    it('Pre-made circular Progress', ()=>{
        mount(getCircularRating(77));

        cy.contains('77')
          .should('exist');
    })
})

export {}