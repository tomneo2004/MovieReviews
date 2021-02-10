import mount from '@cypress/react/dist';
import React from 'react';
import SearchResults from '../../../src/components/movieReview/SearchResults/SearchResults';
import { IMovieData } from '../../../src/utils/api/model/apiModelTypes';

describe('Search Results Component', ()=>{

    it('Successful render', ()=>{
      cy.fixture<IMovieData[]>('fakeMovieData').then((data)=>{
        mount(<SearchResults id='results' data={data} />);

        cy.get('#results')
          .should('be.visible');
      })
    })

    it('Render data', ()=>{
      cy.fixture<IMovieData[]>('fakeMovieData').then((data)=>{
        mount(<SearchResults id='results' data={data} />);

        cy.get('#results')
          .children()
          .its('length')
          .should('be.greaterThan', 0);
      })
    })

    it('Waiting data', ()=>{
        mount(<SearchResults id='results' data={null} />);
        
        cy.get('#results')
          .should('be.visible');
    })

    it('Empty array of data', ()=>{
        const keywords = 'abc';

        mount(<SearchResults id='results' 
        data={[]} keywords={keywords} fallback={`No results for ${keywords}`} />);

        cy.contains(`No results for ${keywords}`);
    })
})

export {}