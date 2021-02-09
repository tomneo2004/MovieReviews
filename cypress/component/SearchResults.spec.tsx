import mount from '@cypress/react/dist';
import React from 'react';
import SearchResults from '../../src/components/movieReview/searchResults/searchResults';

describe('Search Results Component', ()=>{
    const fakeMovieData = [
        {
            "poster_path": "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
            "adult": false,
            "overview": "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
            "release_date": "2012-04-25",
            "genre_ids": [
              878,
              28,
              12
            ],
            "id": 24428,
            "original_title": "The Avengers",
            "original_language": "en",
            "title": "The Avengers",
            "backdrop_path": "/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg",
            "popularity": 7.353212,
            "vote_count": 8503,
            "video": false,
            "vote_average": 7.33
          },
    ]

    it('Successful render', ()=>{
        mount(<SearchResults id='results' data={fakeMovieData} />);
        
        cy.get('#results')
          .should('be.visible');
    })

    it('Skelentons results', ()=>{
        mount(<SearchResults id='results' data={null} />);
        
        cy.get('#results')
          .should('be.visible');
    })

    it('Empty array of data', ()=>{
        const keywords = 'abc';

        mount(<SearchResults id='results' 
        data={[]} keywords={keywords} fallback={`No results for ${keywords}`} />);

        cy.contains(`No results for ${keywords}`);
    })
})

export {}