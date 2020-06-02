import json
import os
from flask import Flask, request, redirect, url_for
import detectionService
import fileService

UPLOAD_FOLDER = 'uploadings'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/predict', methods=['POST'])
def predictByImage():
    filePath = fileService.saveUploadedFile(request.files, app.config['UPLOAD_FOLDER'])
    darknetRelatedFilePath = os.path.join('../', filePath)
    resultDict =  detectionService.getPrediction('./darknet', 'data/vehicle.data', 
            'cfg/vehicle-yolov3.cfg', 'vehicle-yolov3_last.weights', 
            darknetRelatedFilePath, 0.00001, 'data/vehicle.names')
    return json.dumps(resultDict)

@app.route('/detect', methods=['POST'])
def detectByImage():
    filePath = fileService.saveUploadedFile(request.files, app.config['UPLOAD_FOLDER'])
    darknetRelatedFilePath = os.path.join('../', filePath)
    resultDict = detectionService.getDetectionResults('./darknet', 'data/vehicle.data', 
        'cfg/vehicle-yolov3.cfg', 'vehicle-yolov3_last.weights', 
        darknetRelatedFilePath, 0.00001, 'data/vehicle.names')
    return json.dumps(resultDict)

@app.route('/health')
def health():
    return 'Working...'