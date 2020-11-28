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
        />
    )
}