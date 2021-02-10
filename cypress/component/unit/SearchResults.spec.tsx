import mount from '@cypress/react/dist';
import React from 'react';
import SearchResults from '../../../src/components/movieReview/SearchResults/SearchResults';
import { IMovieData } from '../../../src/utils/api/model/apiModelTypes';

describe('SearchResults component', ()=>{
  describe('Render successful', ()=>{
    beforeEach(()=>{
      cy.fixture<IMovieData[]>('fakeMovieData').then((data)=>{
        mount(<SearchResults id='results' data={data} />);
      })
    })
  
    it('Visible', ()=>{
      cy.get('#results')
          .should('be.visible');
    })
  
    it('Render data', ()=>{
      cy.get('#results')
          .children()
          .its('length')
          .should('be.greaterThan', 0);
    })
  })
  
  describe('Waiting data', ()=>{
    beforeEach(()=>{
      mount(<SearchResults id='results' data={null} />);
    })
  
    it('Loading placeholder', ()=>{
        cy.get('#loading-placeholder')
          .should('be.visible');
    })
  })
  
  describe('Empty data', ()=>{
  
    const keywords = 'abc';
  
    beforeEach(()=>{
      mount(<SearchResults id='results' 
        data={[]} keywords={keywords} fallback={`No results for ${keywords}`} />);
    })
    
    it('Empty array of data', ()=>{
        cy.contains(`No results for ${keywords}`);
    })
  })
})

export {}