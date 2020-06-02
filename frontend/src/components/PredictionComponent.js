import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  image: {
    
  },
}));

const predictionType = {
  PREDICTION: 'PREDICTION',
  DETECTION: 'DETECTION'
}

const PredictionComponent = ({ imagePath, prediction = {}, isLoading }) => {
  const classes = useStyles()

  const noContent = !prediction.type

  return (
    <Grid container spacing={2}>
      <Grid item>
        <img src={imagePath} className={classes.image} />
      </Grid>
      <Grid item container>
        {() => {
          if (noContent) {
            return isLoading ? <CircularProgress /> : null
          }
          
          return prediction.type === predictionType.PREDICTION
          ? <div>prediction</div>
          : <div>detection</div>
        }}
      </Grid>
    </Grid>
  );
}

export default PredictionComponent
