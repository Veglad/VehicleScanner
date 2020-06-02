import axios from 'axios'

const apiPath = process.env.REACT_APP_API || 'http://localhost:3001'

export const getApiPath = path => `${apiPath}/${path}`

export async function predictByImage(imageFormData) {
    axios.post(getApiPath('predict'), imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
}

export async function detectByImage(imageFormData) {
  axios.post(getApiPath('detect'), imageFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
}