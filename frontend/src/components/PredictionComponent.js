import React, { useState, useEffect, useRef } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { predictionType } from '../App'
import DetectionBlock from './DetectionBlock';
import PredictionBlock from './PredictionBlock';

const useStyles = makeStyles(() => createStyles({
  image: {
    maxWidth: '100%',
  },
  cell: {
    flexGrow: '1',
  },
  loader: {
    color: '#00b0ff'
  }
}));

const getMinCoord = (center, length) => center - length / 2
const normalize = (value, canvasScale) => value * canvasScale

const mapPredictionToDetectionBlock = (predictions, image, targetDimens, fullImageDimens) => ({
  image,
  boxes: predictions.map(({ className, confidence, coordinates: { centerX, centerY, width, height } }) => {
    const normalized = {
      x: normalize(centerX, fullImageDimens.width),
      y: normalize(centerY, fullImageDimens.height),
      width: normalize(width, fullImageDimens.width),
      height: normalize(height, fullImageDimens.height),
    }

    return {
      label: `${className} ${(confidence * 100).toFixed(2)}%`,
      coord: [
        getMinCoord(normalized.x, normalized.width),
        getMinCoord(normalized.y, normalized.height),
        normalized.width,
        normalized.height
      ]
    }
  })
})

const PredictionComponent = ({ imagePath, prediction = {}, isLoading }) => {
  const classes = useStyles()
  const [imageDimens, setImageDimens] = useState()
  const [fullImageDimens, setFullImageDimens] = useState()
  const imageRef = useRef()

  const noContent = !prediction.type

  useEffect(() => {
    setTimeout(() => {
      setImageDimens({
        width: imageRef.current.offsetWidth,
        height: imageRef.current.offsetHeight
      })
    }, 1)
  }, [imagePath])

  useEffect(() => {
    const background = new Image();
    background.src = imagePath

    background.onload = (() => {
      setFullImageDimens({
        width: background.width,
        height: background.height
      })
    })
  }, [imagePath])

  return (
    <Grid container spacing={2} justify="center" alignItems="center" wrap="nowrap">
      <Grid item container className={classes.cell}>
        <img src={imagePath} className={classes.image} ref={imageRef} />
      </Grid>
      <Grid item container alignItems="stretch" className={classes.cell}>
        {(() => {
          if (noContent) {
            return isLoading
              ? <Grid container justify="center">
                <CircularProgress variant="indeterminate" className={classes.loader} />
              </Grid>
              : null
          }

          return prediction.type === predictionType.PREDICTION
            ? <PredictionBlock
              predictionClass={prediction.className}
              predictionPercentage={(prediction.confidence * 100).toFixed(2)}
            />
            : <DetectionBlock {...mapPredictionToDetectionBlock(
              prediction.predicitons,
              imagePath,
              imageDimens,
              fullImageDimens
            )} />
        })()}
      </Grid>
    </Grid>
  );
}

export default PredictionComponent
