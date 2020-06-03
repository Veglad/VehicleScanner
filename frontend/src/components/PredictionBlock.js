import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import classNames from 'classnames'

const useStyles = makeStyles(() => createStyles({
  label: {
    color: '#1b1b1b',
  },
  percentage: {
    fontSize: '2.4em',
  },
  predictionClass: {
    fontSize: '2.0em',
  },
  root: {
    backgroundColor: '#00b0ff',
    minHeight: '100%'
  }
}));

const PredictionBlock = ({ predictionClass, predictionPercentage }) => {
  const classes = useStyles()

  return (
    <Grid container alignContent="center" className={classes.root}>
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
