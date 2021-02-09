import React from 'react';
import {mount} from '@cypress/react';
import PosterImage from '../../src/components/unit/PosterImage/PosterImage';

describe('Round Button Component', ()=>{
    it('Render Successful', ()=>{
        mount(<PosterImage id='posterImage' imageWidth={200} />);

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