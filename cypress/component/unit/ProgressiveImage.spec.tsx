import React from 'react';
import {mount} from '@cypress/react';
import ProgressiveImage from '../../../src/components/unit/ProgressiveImage/ProgressiveImage';

describe('ProgressiveImage component', ()=>{
    const imageSrc = 'https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

    describe('Render successful', ()=>{
        beforeEach(()=>{
            mount(<ProgressiveImage id='pi' imageSrc={imageSrc} />);
        })

        it('Visible', ()=>{
            cy.get('#pi')
            .should('be.visible');
        })
    })

    describe('Render image', ()=>{
        beforeEach(()=>{
            mount(<ProgressiveImage id='pi' imageSrc={imageSrc} />);
        })

        it('With image source', ()=>{  
            
            cy.get('#pi')
            .find('#current-bg')
            .invoke('attr', 'data-src')
            .should('eq', imageSrc);
        })
    })
})

export {}