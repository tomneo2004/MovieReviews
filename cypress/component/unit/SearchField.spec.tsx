import mount from '@cypress/react/dist';
import React from 'react';
import SearchField from '../../../src/components/unit/SearchField/SearchField';

describe('SearchField component', ()=>{
  describe('Render successful', ()=>{
    beforeEach(()=>{
      mount(<SearchField id='search' />);
    })

    it('Visible', ()=>{
      cy.get('#search')
        .should('be.visible');
    })
  })

  describe('Type', ()=>{
    beforeEach(()=>{
      mount(<SearchField id='search' />);
    })

    it('Type some text', ()=>{
      cy.get('#search')
        .find('input')
        .type('This is text')
        .should('have.value', 'This is text');
    })
  })

  describe('Clear', ()=>{
    beforeEach(()=>{
      mount(<SearchField id='search' />);
    })

    it('Clear text', ()=>{
      cy.get('#search')
        .find('input')
        .type('This is text')
        .clear()
        .should('have.value', '');  
    })
  })

  describe('Properties', ()=>{
    beforeEach(()=>{
      mount(<SearchField value='abc' opacity={0.5} opacityHover={0.7} />, 
      {alias:'SearchField'});
    })

    it('Match properties', ()=>{
      cy.get('@SearchField')
        .its('props')
        .should('deep.equal', {
          value:'abc',
          opacity:0.5,
          opacityHover:0.7
        })
    })
  })

  describe('Callback', ()=>{
    it('OnFocus', ()=>{
      const focusStub = cy.stub();

      mount(<SearchField id='search' onFocus={focusStub} />);

      cy.get('#search')
        .find('input')
        .focus()
        .then(()=>{
          expect(focusStub).to.be.called;
        })
    })

    it('OnBlur', ()=>{
      const blurStub = cy.stub();

      mount(<SearchField id='search' onBlur={blurStub} />);

      cy.get('#search')
        .find('input')
        .focus()
        .blur()
        .then(()=>{
          expect(blurStub).to.be.called;
        })
    })

    it('OnKeyPress', ()=>{
      const onKeyPressStub = cy.stub();

      mount(<SearchField id='search' onKeyPress={onKeyPressStub} />);

      cy.get('#search')
        .find('input')
        .focus()
        .type('{enter}')
        .then(()=>{
          expect(onKeyPressStub).to.be.called;
        })
    })

    it('OnChange', ()=>{
      const onChangeStub = cy.stub();

      mount(<SearchField id='search' onKeyPress={onChangeStub} />);

      cy.get('#search')
        .find('input')
        .focus()
        .type('hyync')
        .then(()=>{
          expect(onChangeStub).to.be.callCount(5);
        })
    })
  })
})

export {}