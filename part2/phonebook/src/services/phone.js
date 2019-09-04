import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const request = axios.post(baseUrl, newObject)
  const response = await request;
    return response.data;
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteItem = id => {
   const request = axios.delete(`${baseUrl}/${id}`)
   return request.then(response => response.data )
}

export default { getAll, create, update, deleteItem }