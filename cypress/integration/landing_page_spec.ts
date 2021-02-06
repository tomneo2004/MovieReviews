describe('Landing Page', () => {
    it('Successfully loaded', () => {
        cy.visit('/');
    })

    it('Hero title', () => {
        cy.get('#hero-title')
          .contains('Welcome');
    })

    it('Type search keyword', () => {
        const keyword = 'avenger';

        cy.get('#search-area')
          .find('input')
          .type(keyword)
          .should('have.value', keyword);
    })

    it('Scroll page', () => {
        cy.window().scrollTo('bottom');
        cy.window().scrollTo('top');
        cy.window().its('pageYOffset')
          .should('eq', 0);
    })
})

export {}