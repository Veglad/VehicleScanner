import React, { useEffect, useState } from 'react'
import ReactDropzone from 'react-dropzone'
import classnames from 'classnames'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { uploadImage } from '../api/api'

const useStyles = makeStyles(() => createStyles({
  reject: {
    borderColor: "#d83b01 !important",
  },
  accept: {
    borderColor: "#107c10 !important",
  },
  dropzone: {
    textAlign: 'center',
    padding: 20,
    border: '3px dashed #eeeeee',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    marginBottom: 20,
  }
}));

const Dropzone = () => {
  const classes = useStyles()
  const [fileToUpload, setFileToUpload] = useState()

  const handleDrop = image => {
    setFileToUpload(image[0])
    console.log(image)
  }

  useEffect(() => {
    if (fileToUpload) {
      (async () => {
        const imageFormData = new FormData()
        console.log(fileToUpload)
        imageFormData.append('file', fileToUpload)
        imageFormData.append('filename', fileToUpload.name)
        console.log(imageFormData)
        const result = await uploadImage(imageFormData)
        console.log(result)
      })()
    }
  }, [fileToUpload])

  return (
    <div className="App">
      <ReactDropzone
        onDrop={handleDrop}
        accept="image/*"
        minSize={1024}
        maxSize={3072000}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
          const dropzoneClasses = classnames(classes.dropzone, {
            [classes.accept]: isDragAccept,
            [classes.reject]: isDragReject,
          })

          return (
            <div {...getRootProps({ className: dropzoneClasses })}>
              <input {...getInputProps()} />
              <span>{isDragActive ? "📂" : "📁"}</span>
              <p>Drag'n'drop images, or click to select files</p>
            </div>
          );
        }}
      </ReactDropzone>
    </div>
  );
}

export default Dropzone
