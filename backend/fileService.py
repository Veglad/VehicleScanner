import subprocess
import json
import os
import csv

SINGLE_RESULT_FILE_PATH = 'singleResult.txt'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowedFile(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def saveUploadedFile(requestFiles, uploadFolder):
    if 'file' not in requestFiles:
        raise Exception('No file part')
    file = requestFiles['file']

    if file.filename == '':
        raise Exception('No selected file')

    if file and allowedFile(file.filename):
        fileFullName = os.path.join(uploadFolder, file.filename)
        file.save(fileFullName)
        return fileFullName
        
    raise Exception('file format not allowed')
