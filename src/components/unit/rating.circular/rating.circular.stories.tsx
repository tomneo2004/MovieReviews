import React from 'react';
import CircularRating from './rating.circular.comp';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Box from '@material-ui/core/Box';

export default {
  title: 'Circular Rating',
};

export const Default = () => {
    return (
        <CircularRating />
    )
}

export const Postive = () => {
  return (
      <CircularRating value={70} />
  )
}

export const Average = () => {
  return (
      <CircularRating value={60} />
  )
}

export const Negative = () => {
  return (
      <CircularRating value={5} />
  )
}

export const TransparentBG = () => {
  return (
      <CircularRating value={5} bgcolor='rgba(0,0,0,0.5)' />
  )
}

export const MaskOpacity = () => {
  return (
      <CircularRating value={5} maskOpacity={0.7} />
  )
}

export const HideValue = () => {
  return (
      <CircularRating value={64} hideValue />
  )
}

export const ValueVariant = () => {
  return (
      <CircularRating value={64} valueVariant='h5' />
  )
}

export const ValueFontWeight = () => {
  return (
      <CircularRating value={64} valueVariant='h5' valueFontWeight={700} />
  )
}

export const EndAdornmentOnly = () => {
  return (
      <CircularRating value={64} hideValue valueEndAdornment={
        <ThumbsUpDownIcon style={{width:'25px', height:'25px'}} />
      } />
  )
}

export const ValueOnly = () => {
  return (
      <CircularRating value={64} />
  )
}

export const ValueWithPercentage = () => {
  return (
      <CircularRating value={64} valueEndAdornment={
        <Box>%</Box>
      } />
  )
}

export const ValueWithFontSize = () => {
  return (
      <CircularRating value={64} valueFontSize='1.5em' valueEndAdornment={
        <Box>%</Box>
      } />
  )
}

export const AnimateValue = () => {
  const [rating, setRating] = React.useState(0);

  React.useEffect(()=>{
    const intervalTimer = setInterval(()=>{
      setRating(rating=>rating+1);
    }, 100);
    return ()=>clearInterval(intervalTimer);
  }, []);

  return (
      <CircularRating value={rating} 
      minValue={0} maxValue={100} valueFontSize='1em' valueEndAdornment={
        <Box>%</Box>
      } />
  )
}

export const AnimateValueAndAdornemnt = () => {
  const postiveAdo = <ThumbUpIcon style={{width:'15px',height:'15px'}} />
  const negativeAdo = <ThumbDownIcon style={{width:'15px',height:'15px'}} />
  const averageAdo = <ThumbsUpDownIcon style={{width:'15px',height:'15px'}} /> 
  const [rating, setRating] = React.useState({
    value:0,
    ado:negativeAdo
  });

  React.useEffect(()=>{
    const intervalTimer = setInterval(()=>{
      setRating(rating=>{
        let newRating = {...rating};
        newRating.value+=1;
        if(newRating.value >= 70){
          newRating.ado = postiveAdo;
        }
        else if(newRating.value >= 50){
          newRating.ado = averageAdo;
        }
        else{
          newRating.ado = negativeAdo;
        }
        return newRating;
      });

    }, 100);
    return ()=>clearInterval(intervalTimer);
  }, []);

  return (
      <CircularRating size={80} progressSize={74} value={rating.value} 
      minValue={0} maxValue={100} valueFontSize='1em' valueFontWeight={600}
      valueVariant='h5' valueFlexDirection='column' valueEndAdornment={rating.ado} />
  )
}

