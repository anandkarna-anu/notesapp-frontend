import axios from 'axios'
const baseUrl = import.meta.env.VITE_API_BASE_URL
console.log('baseUrl in service:', baseUrl) // Add this line here

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}
// ... rest of your code

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
}
