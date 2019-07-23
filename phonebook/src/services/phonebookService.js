import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getEntries = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
      console.log('Retrieved server data')
      return response.data
    })
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
  console.log('Deleted entry at id', `${id}`)
  return request.then(() => {
    // axios.delete by default doesn't return a promise, so we make one
    // We use getEntries to retrieve the updated data and return it as a promise
    return getEntries()
  })
}

export default { getEntries, createEntry, updateEntry, deleteEntry }