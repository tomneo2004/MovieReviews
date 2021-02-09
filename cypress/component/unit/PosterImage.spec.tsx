import React from 'react';
import {mount} from '@cypress/react';
import PosterImage from '../../../src/components/unit/PosterImage/PosterImage';

describe('PosterImage Component', ()=>{
  const imageSrc = 'https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

  it('Render Successful', ()=>{
      mount(<PosterImage id='posterImage' imageURL={imageSrc} imageWidth={200} />);

      cy.get('#posterImage')
        .should('be.visible');
  })

  it('Image width', ()=>{
      mount(<PosterImage id='posterImage' imageWidth={300} />);

      cy.get('#posterImage')
        .find('img')
        .invoke('css', 'width')
        .should('equal', '300px');
  })

  it('Image height', ()=>{
      mount(<PosterImage id='posterImage' imageWidth={300} aspectRatio={2} />);

      cy.get('#posterImage')
        .find('img')
        .invoke('css', 'height')
        .should('equal', '600px');
  })

  it('Image alt', ()=>{
      mount(<PosterImage id='posterImage' imageWidth={300} aspectRatio={2} alt='myImage' />);
      
      cy.get('img[alt="myImage"]')
        .should('exist');
  })
})

export {}