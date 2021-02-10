import React from 'react';
import {mount} from '@cypress/react';
import HorizontalScroll, { HScrollChildProp } from '../../../src/components/unit/HorizontalScroll/HorizontalScroll';
import Box from '@material-ui/core/Box';

describe('HorizontalScroll component', ()=>{
  const items: HScrollChildProp[] = [];

  before(()=>{
    for(let i:number=0; i<40; i++){
        items.push({
            id:i,
            element: (<Box>item {i}</Box>)
        })
    }  
  })

  describe('Render successful', ()=>{
    before(()=>{
        mount(<HorizontalScroll id='hScroll'>{()=>items}</HorizontalScroll>);
    })
  
    it('Visible', ()=>{
        cy.get('#hScroll')
          .should('be.visible');
    })
  })

  describe('Render items', ()=>{
    before(()=>{
        mount(<HorizontalScroll id='hScroll'>{()=>items}</HorizontalScroll>);
    })
  
    it('40 items', ()=>{
        
        cy.get('#hScroll')
          .children('div')
          .children('#item')
          .its('length')
          .should('equal', 40);
    })
  })

  describe('Overflow', ()=>{
    before(()=>{
        mount(<HorizontalScroll id='hScroll' width={100}>{()=>items}</HorizontalScroll>);
    })
  
    it('Scroll right', ()=>{
        
        cy.get('#hScroll')
          .children('div')
          .scrollTo('right');
    })

    it('Scroll left', ()=>{
        
        cy.get('#hScroll')
          .children('div')
          .scrollTo('left');
    })
  })

  describe('No data', ()=>{
    before(()=>{
        mount(<HorizontalScroll id='hScroll'>{()=>[]}</HorizontalScroll>);
    })

    it('Empty', ()=>{
        cy.get('#hScroll')
          .should('not.exist');
    })

    before(()=>{
        mount(<HorizontalScroll id='hScroll'>{()=>null}</HorizontalScroll>);
    })

    it('Null', ()=>{
        cy.get('#hScroll')
          .should('not.exist');
    })
  })
})