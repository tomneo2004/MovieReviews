import mount from '@cypress/react/dist';
import React from 'react';
import SearchResults from '../../../src/components/concrete/SearchResults/SearchResults';
import { IMovieData } from '../../../src/utils/api/model/apiModelTypes';
import { RouterContext } from "next/dist/next-server/lib/router-context";

describe('SearchResults component', ()=>{
  describe('Render successful', ()=>{
    before(()=>{
      const router = {
        pathname: "/",
        route: "/",
        query: {},
        asPath: "/",
        components: {},
        isFallback: false,
        basePath: "",
        events: { emit: cy.spy(), off: cy.spy(), on: cy.spy() },
        push: cy.spy(),
        replace: cy.spy(),
        reload: cy.spy(),
        back: cy.spy(),
        prefetch: cy.stub().resolves(),
        beforePopState: cy.spy(),
        isLocaleDomain: true,
        isReady: true,
      };

      cy.fixture<IMovieData[]>('fakeMovieData').then((data)=>{
        mount(
          <RouterContext.Provider value={router} >  
            <SearchResults id='results' data={data} />
          </RouterContext.Provider>
        );
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