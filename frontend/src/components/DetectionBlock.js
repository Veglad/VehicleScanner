import React, { useRef, useEffect } from 'react'
import Boundingbox from 'react-bounding-box'
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  root: {
    '& canvas': {
      maxHeight: '100vh !important',
    },
  }
}));

const DetectionBlock = ({ image, boxes }) => {
  const classes = useStyles()
  const ref = useRef()

  useEffect(() => {
    setTimeout(() => {
      ref.current.querySelectorAll('canvas')[0].style.cssText = 'max-width: 100%; max-height: 100vh;'
      console.log(ref.current.querySelectorAll('canvas')[0])
      console.log(ref.current.querySelectorAll('canvas')[0].style)
    }, 1)
  }, [image])

  return <div ref={ref}>
    <Boundingbox image={image} boxes={boxes} />
  </div>
}

export default DetectionBlock
