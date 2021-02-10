import React from 'react';
import {mount} from '@cypress/react';
import CircularRating, { getCircularRating } from '../../../src/components/unit/CircularRating/CircularRating';

describe('CircularRating component', ()=>{
  describe('Render successful', ()=>{
    beforeEach(()=>{
      mount(<CircularRating id='rating' />);
    })
  
    it('Visible', ()=>{
        cy.get('#rating')
          .should('be.visible');
    })
  })
  
  describe('Value', ()=>{
    beforeEach(()=>{
      mount(<CircularRating id='rating' maxValue={10} value={5} />);
    })
  
    it('Value range with progress', ()=>{
        cy.get('#rating')
          .contains('5')
          .should('exist');
    })
  })
  
  describe('Null value', ()=>{
    beforeEach(()=>{
      mount(<CircularRating id='rating' maxValue={10} value={null} />);
    })
  
    it('None number rating', ()=>{
        cy.get('#rating')
          .should('not.exist');
    })
  })
  
  describe('Pre-made', ()=>{
    beforeEach(()=>{
      mount(getCircularRating(77));
    })
  
    it('Pre-made circular Progress', ()=>{
        cy.contains('77')
          .should('exist');
    })
  })
})

export {}