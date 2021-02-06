describe('Search Page', ()=>{
    it('Successfully loaded', ()=>{
        cy.visit('/search?query=avenger');
        cy.url().should('include', 'search?query=avenger');
    })

    it('Type search keyword', ()=>{
        cy.get('#nav-search-bar')
          .find('input')
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

    it('Scroll page', () => {
        cy.window().scrollTo('bottom');
        cy.window().scrollTo('top');
        cy.window().its('pageYOffset')
          .should('eq', 0);
    })

    it('Keywords not found for movies', ()=>{
        cy.get('#nav-search-bar')
          .find('input')
          .clear()
          .type('You will never found a movie with this keywords{enter}');
        
        cy.url().should('include', 'search?query=');
        cy.contains(/\bYou will never found a movie with this keywords\b/);
    })
})

export {}