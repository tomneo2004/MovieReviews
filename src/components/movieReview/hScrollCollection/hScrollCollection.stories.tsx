import { Box } from '@material-ui/core';
import React from 'react';
import Collection from './hScrollCollection';

export default {
  title: 'Horizontal Scroll Collection',
};

export const Default = () => {
    return (
        <Collection>
        {()=>[
          <Box>Item 1</Box>,
          <Box>Item 2</Box>,
          <Box>Item 3</Box>,
          <Box>Item 4</Box>,
        ]}
        </Collection>
    )
}