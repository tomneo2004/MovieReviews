import React from 'react';
import {mount} from '@cypress/react';
import RoundButton from '../../../src/components/unit/RoundButton/RoundButton';

describe('Round Button Component', ()=>{
    it('Render Successful', ()=>{
        mount(<RoundButton>text</RoundButton>);
        cy.contains('text')
          .should('be.visible');
        
    })

    it('Corner radius', ()=>{
        mount(<RoundButton cornerRadius='5px'>text</RoundButton>);
        cy.contains('text')
          .should('be.visible');
    })

    it('Text style', ()=>{
        mount(<RoundButton cornerRadius='5px'>text</RoundButton>);
        cy.get('.MuiButton-text')
          .contains('text')
          .should('be.visible');
    })

    it('Outlined style', ()=>{
        mount(<RoundButton cornerRadius='15px' variant='outlined'>text</RoundButton>);
        cy.get('.MuiButton-outlined')
          .contains('text')
          .should('be.visible');
    })

    it('Contained style', ()=>{
        mount(<RoundButton cornerRadius='20px' variant='contained'>text</RoundButton>);
        cy.get('.MuiButton-contained')
          .contains('text')
          .should('be.visible');
    })
})