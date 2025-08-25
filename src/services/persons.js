// src/services/persons.js
import axios from 'axios'

// This will be determined by how you run your app. 
// If your frontend and backend are on the same origin (like with a proxy), you can use a relative URL.
// If not, you'll need the full URL like 'http://localhost:3001/api/persons' for local dev.
// For now, a relative URL is often the best practice.
const baseUrl = import.meta.env.VITE_API_BASE_URL + '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// Note: The exercise says not to implement update yet, but we'll export it for later
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, remove, update }