import axios from 'axios'
const baseUrl = import.meta.env.VITE_API_BASE_URL + '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  // Note: Your backend does not seem to have an endpoint for updating a note.
  // This will result in a 404 Not Found error.
  // You would need to add a `app.put('/api/notes/:id', ...)` route to your backend.
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  remove,
}
