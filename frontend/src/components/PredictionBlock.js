import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import classNames from 'classnames'

const useStyles = makeStyles(() => createStyles({
  label: {
    color: '#fff',
  },
  percentage: {
    fontSize: '2.4em',
  },
  predictionClass: {
    fontSize: '2.0em',
  },
  root: {
    backgroundColor: 'rgb(0.5,0,176,255)',
    border: '1px solid #00b0ff',
    height: '100%',
  }
}));

const PredictionBlock = ({ predictionClass, predictionPercentage }) => {
  const classes = useStyles()

  return (
    <Grid container alignContent="center" alignItems="center" className={classes.root}>
      <Grid item container justify="center">
        <Typography className={classNames(classes.label, classes.predictionClass)}>{predictionClass}</Typography>
      </Grid>
      <Grid item container justify="center">
        <Typography className={classNames(classes.label, classes.percentage)}>{predictionPercentage}%</Typography>
      </Grid>
    </Grid>
  );
}

export default PredictionBlock
