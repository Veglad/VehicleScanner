import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Boundingbox from 'react-bounding-box'

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

const params = {
  image: 'http://i.imgur.com/gF7QYwa.jpg',
  boxes: [
    // coord(0,0) = top left corner of image
    //[x, y, width, height]
    {coord: [0, 0, 250, 250], label: "test"},
    {coord: [300, 0, 250, 250], label: "A"},
    {coord: [700, 0, 300, 25], label: "B"},
    {coord: [1100, 0, 25, 300], label: "C"}
  ],
  options: {}
}

const PredictionBlock = ({ detectionResult }) => {
  const classes = useStyles()

  return (
    <Grid container alignContent="center" alignItems="center">
      <Boundingbox image={params.image} boxes={params.boxes} options={params.options} />
    </Grid>
  );
}

export default PredictionBlock
