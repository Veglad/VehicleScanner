import subprocess
import json
import csv
import pandas as pd

SINGLE_RESULT_FILE_PATH = 'singleResult.txt'

EMPTY_RESPONSE = {
    'hasResult': False
}

def predict(darknetCommandPath, vehicleDataPath, cfgPath, modelPath, imagePath, thresh, outFilePath):
  return subprocess.Popen([
    darknetCommandPath, 'detector', 'test', vehicleDataPath,
    cfgPath, modelPath, imagePath, '-thresh', str(thresh),
    '-dont_show', '-out', outFilePath
  ], cwd="darknet")

def getDetectionResults(darknetCommandPath, vehicleDataPath, cfgPath, 
                               modelPath, imagePath, thresh, classesNamesFilePath):
  predict(
      darknetCommandPath, 
      vehicleDataPath, 
      cfgPath, 
      modelPath, 
      imagePath, 
      thresh, 
      '../' + SINGLE_RESULT_FILE_PATH
  ).wait()

  classesNames = pd.read_csv('darknet/' + classesNamesFilePath, header=None)[0]

  with open(SINGLE_RESULT_FILE_PATH) as jsonFile:
      data = json.load(jsonFile)
      predictions = []
      for rawPrediction in data:
        for objectPrediction in rawPrediction['objects']:
          prediction = {
              'hasResult': True,
              'className': classesNames[objectPrediction['class_id']],
              'confidence': objectPrediction['confidence'],
              'coordinates': {
                  'centerX': objectPrediction['relative_coordinates']['center_x'],
                  'centerY': objectPrediction['relative_coordinates']['center_y'],
                  'width': objectPrediction['relative_coordinates']['width'],
                  'height': objectPrediction['relative_coordinates']['height']
              }
          }
          predictions.append(prediction)
      return predictions

def getPrediction(darknetCommandPath, vehicleDataPath, cfgPath, modelPath, 
                         imagePath, thresh, classesNamesFilePath):
  predictions = getDetectionResults(
        darknetCommandPath, vehicleDataPath, cfgPath, 
        modelPath, imagePath, thresh, classesNamesFilePath
  )
  return EMPTY_RESPONSE if len(predictions) == 0 else max(predictions, key=(lambda p: p['confidence']))