import mount from '@cypress/react/dist';
import React from 'react';
import SearchResults from '../../src/components/movieReview/searchResults/searchResults';

describe('Search Results Component', ()=>{
    it('Skelentons results', ()=>{
        mount(<SearchResults data={null} />);
        
        cy.get('.MuiSkeleton-root')
          .its('length')
          .should('be.greaterThan', 0);
    })
})

export {}