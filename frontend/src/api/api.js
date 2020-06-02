import axios from 'axios'

const apiPath = process.env.REACT_APP_API || 'http://localhost:3001'

export const getApiPath = path => `${apiPath}/${path}`

export function predictByImage(imageFormData) {
    return axios.post(getApiPath('predict'), imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
}

export function detectByImage(imageFormData) {
  return axios.post(getApiPath('detect'), imageFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
}