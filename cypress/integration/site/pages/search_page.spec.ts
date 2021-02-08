describe('Search Page', ()=>{
    it('Successfully loaded', ()=>{
        cy.visit('/search?query=avenger');
        cy.url().should('include', 'search?query=avenger');
    })

    it('Scroll page', () => {
      cy.window().scrollTo('bottom');
      cy.window().scrollTo('top');
      cy.window().its('pageYOffset')
        .should('eq', 0);
    })

    it('No movies found', ()=>{
      cy.get('#nav-search-bar')
        .find('input')
        .clear()
        .type('You will never found a movie with this keywords{enter}');
      
      cy.url().should('include', 'search?query=');
      cy.contains(/\bYou will never found a movie with this keywords\b/);
    })

    it('Type search keyword', ()=>{
        cy.get('#nav-search-bar')
          .find('input')
          .clear()
          .type('abc')
          .should('have.value', 'abc');
    })

    it('Search new movie', ()=>{
        cy.get('#nav-search-bar')
          .find('input')
          .clear()
          .type('a{enter}');
        
        cy.url().should('include', 'search?query=a');

        cy.get('#nav-search-bar')
          .find('input')
          .clear()
          .type('new world{enter}');

        cy.url().should('include', 'search?query=new%20world');
    })

    it('Go to next page', ()=>{
        cy.get('#nav-search-bar')
        .find('input')
        .clear()
        .type('avenger{enter}');

        cy.get('#paging')
          .find('button')
          .its('length')
          .should('be.greaterThan', 0)
      
        cy.get('#paging')
        .find('button[aria-label="Go to page 2"]')
        .click()

        cy.url()
          .should('include', 'page=2')
          
    })
})

export {}