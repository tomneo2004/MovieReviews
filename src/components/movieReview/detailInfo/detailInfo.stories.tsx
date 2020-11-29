import React from 'react';
import DetailInfo from './detailInfo';

export default {
  title: 'Detail Info',
};

const genres = [
  {id:1, name:'Drama'},
  {id:2, name:'War'},
  {id:3, name:'Thrill'},
  {id:4, name:'Horro'},
  {id:5, name:'Sci-fi'},
]

export const Default = () => {
    return (
        <DetailInfo
        title='Film title here'
        releaseDate='2020-8-12'
        length={125}
        genre={genres}
        userScore={0}
        tagline='This is film tag line'
        overview={`After the fall of the Galactic Empire, 
        lawlessness has spread throughout the galaxy. 
        A lone gunfighter makes his way through the outer reaches, 
        earning his keep as a bounty hunter.`}
        />
    )
}

export const GenreTitle = () => {
  return (
      <DetailInfo
      title='Film title here'
      releaseDate='2020-8-12'
      length={125}
      genre={genres}
      genreTitle='Categories:'
      userScore={40}
      tagline='This is film tag line'
      overview={`After the fall of the Galactic Empire, 
      lawlessness has spread throughout the galaxy. 
      A lone gunfighter makes his way through the outer reaches, 
      earning his keep as a bounty hunter.`}
      />
  )
}

export const OverviewTitle = () => {
  return (
      <DetailInfo
      title='Film title here'
      releaseDate='2020-8-12'
      length={125}
      genre={genres}
      userScore={70}
      tagline='This is film tag line'
      overview={`After the fall of the Galactic Empire, 
      lawlessness has spread throughout the galaxy. 
      A lone gunfighter makes his way through the outer reaches, 
      earning his keep as a bounty hunter.`}
      overviewTitle='Story:'
      />
  )
}