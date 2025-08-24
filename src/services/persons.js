import axios from 'axios'
// You can set this up similarly to your notes service,
// perhaps with another environment variable like VITE_API_PERSONS_URL
// or by constructing it from a base API URL.
// For now, we'll assume the base URL for the API is the same
// and the resource path is /api/persons.
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

// Note: Your backend does not have an endpoint for updating a person.
// If you were to add one (e.g., app.put('/api/persons/:id', ...)),
// the frontend function would look like this:
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  remove,
  update,
}
