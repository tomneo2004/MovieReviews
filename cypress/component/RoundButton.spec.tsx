import React from 'react';
import {mount} from '@cypress/react';
import RoundButton from '../../src/components/unit/RoundButton/RoundButton';

describe('Round Button Component', ()=>{
    it('render without issues', ()=>{
        mount(<RoundButton>text</RoundButton>);
        cy.contains('text')
          .should('be.visible');
        
    })

    it('render with corner radius', ()=>{
        mount(<RoundButton cornerRadius='5px'>text</RoundButton>);
        cy.contains('text')
          .should('be.visible');
    })

    it('render with text only', ()=>{
        mount(<RoundButton cornerRadius='5px'>text</RoundButton>);
        cy.get('.MuiButton-text')
          .contains('text')
          .should('be.visible');
    })

    it('render with outlined style', ()=>{
        mount(<RoundButton cornerRadius='15px' variant='outlined'>text</RoundButton>);
        cy.get('.MuiButton-outlined')
          .contains('text')
          .should('be.visible');
    })

    it('render with contained style', ()=>{
        mount(<RoundButton cornerRadius='20px' variant='contained'>text</RoundButton>);
        cy.get('.MuiButton-contained')
          .contains('text')
          .should('be.visible');
    })
})