import React, { useEffect, useState } from 'react'
import './App.css';
import Dropzone from './components/Dropzone'
import Prediction from './components/PredictionComponent'
import { predictByImage, detectByImage } from './api/api'

export default function App() {
  const [fileToUpload, setFileToUpload] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState()
  const [prediction, setPrediction] = useState()

  useEffect(() => {
    if (fileToUpload) {
      setIsLoading(true)

      const imageFormData = new FormData()

      imageFormData.append('file', fileToUpload)
      imageFormData.append('filename', fileToUpload.name)

      const result = detectByImage(imageFormData)
        .then(res => {
          console.log(result)
        })
        .finally(() => setIsLoading(false))
    }
  }, [fileToUpload])

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
    <div className="App">
      <Dropzone fileToUpload={fileToUpload} setFileToUpload={setFileToUpload} />
      <Prediction imagePath={preview} isLoading={isLoading} prediction={prediction}/>
    </div>
  );
}
