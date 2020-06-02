import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  image: {
    background: '2C2CFF',
    opacity: 0.5,
    border: '1px solid rgb(44, 44, 255);',
    color: 'white',
  },
  percentage: {
    fontSize: '1.8em',
  },
}));

const PredictionBlock = ({ predictionClass, predictionPercentage }) => {
  const classes = useStyles()

  return (
    <Grid container alignContent="center" alignItems="center">
      <Typography>{predictionClass}</Typography>
      <Typography className={percentage}>`${predictionPercentage}%`</Typography>
    </Grid>
  );
}

export default PredictionBlock
