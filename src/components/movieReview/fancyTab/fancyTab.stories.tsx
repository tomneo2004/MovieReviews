import { action } from '@storybook/addon-actions';
import React from 'react';
import FancyTab from './fancyTab';

export default {
  title: 'Fancy Tab',
};

const tabs = [
  {id:'1', value: 'first', label:'Tab 1'},
  {id:'2', value: 'second', label:'Tab 2'},
  {id:'3', value: 'third', label:'Tab 3'},
  {id:'4', value: 'fourth', label:'Tab 4'},
]

export const Default = () => {
    return (
        <FancyTab 
        tabData={tabs} 
        onChange={(value)=>{action('value')(value)}}
        />
    )
}