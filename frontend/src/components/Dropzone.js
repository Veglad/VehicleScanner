import React from 'react'
import ReactDropzone from 'react-dropzone'
import classnames from 'classnames'
import { makeStyles, createStyles } from '@material-ui/core/styles';

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
    opacity: 0.5,
    marginBottom: 20,
  },
  label: {
    color: '#2f2f30',
  },
}));

const Dropzone = ({ setFileToUpload }) => {
  const classes = useStyles()

  const handleDrop = image => {
    setFileToUpload(image[0])
  }

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
              <p className={classes.label}>Drag'n'drop images, or click to select files</p>
            </div>
          );
        }}
      </ReactDropzone>
    </div>
  );
}

export default Dropzone
