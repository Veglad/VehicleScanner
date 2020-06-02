import React, { useEffect, useState } from 'react'
import './App.css';
import Dropzone from './components/Dropzone'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Prediction from './components/PredictionComponent'
import ButtonGroup from './components/ButtonGroup'
import { predictByImage, detectByImage } from './api/api'
import { Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  root: {
    padding: 32,
  },
  buttonGroup: {
    padding: 8
  },
  upload: {
    color: '#00b0ff',
    marginBottom: 16,
  },
}));

export const predictionType = {
  PREDICTION: 'PREDICTION',
  DETECTION: 'DETECTION'
}

const items = [
  {
    label: 'Detection',
    type: predictionType.DETECTION
  },
  {
    label: 'Prediction',
    type: predictionType.PREDICTION
  }
]

export default function App() {
  const classes = useStyles()
  const [fileToUpload, setFileToUpload] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState()
  const [prediction, setPrediction] = useState()
  const [selectedPredictionType, setSelectedPredictionType] = useState(predictionType.DETECTION)

  const handlePredictionSeleted = prediction => setSelectedPredictionType(prediction.type)
  const handleUpload = () => uploadFile(fileToUpload)
  const handleSetFileToUpload = file => {
    setPrediction(undefined)
    setFileToUpload(file)
  }

  const uploadFile = fileToUpload => {
    if (fileToUpload) {
      setIsLoading(true)

      const imageFormData = new FormData()
      imageFormData.append('file', fileToUpload)
      imageFormData.append('filename', fileToUpload.name)

      selectedPredictionType === predictionType.DETECTION
        ? detectByImage(imageFormData)
          .then(response => response.data)
          .then(predicitons => setPrediction({ predicitons, type: predictionType.DETECTION }))
          .finally(() => setIsLoading(false))

        : predictByImage(imageFormData)
          .then(response => response.data)
          .then(prediciton => setPrediction({ ...prediciton, type: predictionType.PREDICTION }))
          .finally(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    if (!fileToUpload) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(fileToUpload)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [fileToUpload])

  return (
    <Grid container className={classes.root} direction="column">
      <Grid item container className={classes.buttonGroup} justify="center">
        <ButtonGroup
          items={items}
          onItemSelected={handlePredictionSeleted}
          disabled={isLoading}
          selectedType={selectedPredictionType}
        />
      </Grid>
      <Grid item>
        <Dropzone fileToUpload={fileToUpload} setFileToUpload={handleSetFileToUpload} />
      </Grid>
      <Grid item container className={classes.buttonGroup} justify="center">
        <Button
          className={classes.upload}
          onClick={handleUpload}
          disabled={isLoading || !fileToUpload}
        >Upload</Button>
      </Grid>
      <Grid item>
        <Prediction imagePath={preview} isLoading={isLoading} prediction={prediction} />
      </Grid>
    </Grid>
  );
}
