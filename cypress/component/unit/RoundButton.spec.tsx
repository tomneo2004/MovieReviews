import React from 'react';
import {mount} from '@cypress/react';
import RoundButton from '../../../src/components/unit/RoundButton/RoundButton';

describe('RoundButton component', ()=>{
  describe('Render Successful', ()=>{
    beforeEach(()=>{
      mount(<RoundButton id='btn'>text</RoundButton>);
    })
  
    it('Visible', ()=>{
        cy.get('#btn')
          .should('be.visible');
    })
  })
  
  describe('Round corner 5px', ()=>{
    beforeEach(()=>{
      mount(<RoundButton id='btn' cornerRadius='5px'>text</RoundButton>);
    })
  
    it('Corner radius', ()=>{
        cy.get('#btn')
          .invoke('css', 'borderRadius')
          .should('equal', '5px');
    })
  })
  
  describe('Style text', ()=>{
    beforeEach(()=>{
      mount(<RoundButton id='btn' cornerRadius='5px'>text</RoundButton>);
    })
  
    it('Text style', ()=>{
        cy.get('#btn')
          .contains('text')
          .should('be.visible');
    })
  })
  
  describe('Style outlined', ()=>{
    beforeEach(()=>{
      mount(<RoundButton id='btn' cornerRadius='15px' variant='outlined'>text</RoundButton>);
      cy.waitForReact();
    })
    
    it('Outlined style', ()=>{
        cy.get('#btn')
          .contains('text')
          .should('be.visible');
    })
  })
  
  describe('Style contained', ()=>{
    beforeEach(()=>{
      mount(<RoundButton cornerRadius='20px' variant='contained'>text</RoundButton>);
      cy.waitForReact();
    })
  
    it('Contained style', ()=>{
        cy.react('RoundButton')
          .contains('text')
          .should('be.visible');
    })
  })
})

export {}