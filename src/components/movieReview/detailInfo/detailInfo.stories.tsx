import React from 'react';
import DetailInfo from './detailInfo';

export default {
  title: 'Detail Info',
};

export const Default = () => {
    return (
        <DetailInfo
        title='Film title here'
        releaseDate='2020-8-12'
        length={125}
        genre={['Drama', 'War', 'Thrill', 'Horro', 'Sci-fi']}
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
      genre={['Drama', 'War', 'Thrill', 'Horro', 'Sci-fi']}
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
      genre={['Drama', 'War', 'Thrill', 'Horro', 'Sci-fi']}
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