import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getEntries = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createEntry = (newEntry) => {
  const request = axios.post(baseUrl, newEntry)
  return request.then(response => response.data)
}

const updateEntry = (id, newEntry) => {
  const request = axios.put(`${baseUrl}/${id}`, newEntry)
  return request.then(response => response.data)
}

const deleteEntry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(() => {
    console.log('deleted entry at id', `${id}`)
    const getUpdatedData = axios.get(baseUrl);
    return getUpdatedData.then(response => response.data)
  })
}

export default { getEntries, createEntry, updateEntry, deleteEntry }