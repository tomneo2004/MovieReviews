import React from 'react';
import {mount} from '@cypress/react';
import PosterImage from '../../../src/components/concrete/PosterImage/PosterImage';

describe('PosterImage component', ()=>{
  const imageSrc = 'https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

  describe('Render successful', ()=>{{
    beforeEach(()=>{
      mount(<PosterImage id='PosterImage' imageURL={imageSrc} />);
    })

    it('Visible', ()=>{
      cy.get('#PosterImage')
        .should('be.visible');
    })
  }})

  describe('ImageURL', ()=>{
    beforeEach(()=>{
      mount(<PosterImage id='PosterImage' imageURL={imageSrc} aspectRatio={2} />).as('PosterImage');  
    })

    it('Correct url prop', ()=>{
      cy.get('@PosterImage')
      .its('props.imageURL')
      .should('equal', imageSrc);
    })
  })


  // describe('Fixed Size', ()=>{
  //   beforeEach(()=>{
  //     mount(<PosterImage imageURL={imageSrc} aspectRatio={2} />).as('PosterImage');  
  //   })

  //   it('Image width', ()=>{
  //     cy.get('@PosterImage')
  //       .its('props.imageWidth')
  //       .should('equal', 300)
  //   })

  //   it('Image height', ()=>{
  //     cy.get('@PosterImage')
  //       .its('props.aspectRatio')
  //       .should('equal', 2);
  //   })
  // })

  describe('Alt', ()=>{
    beforeEach(()=>{
      mount(<PosterImage id='PosterImage' imageURL={imageSrc} aspectRatio={2} alt='myImage' />);
    })

    it('Image alt', ()=>{
      cy.get('#PosterImage')
        .find('img')
        .invoke('attr', 'alt')
        .should('equal', 'myImage');
    })
  })
})

export {}