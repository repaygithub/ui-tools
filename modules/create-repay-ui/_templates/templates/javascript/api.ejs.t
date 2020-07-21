---
to: <%=directory%>/<%=name%>/src/helpers/api.js
---

import * as axios from 'axios'

const BASE_URL = 'https://www.repay.com'

const getHeaders = () => {
  const authHeader = localStorage.getItem('authToken')
  return authHeader ? { Authorization: `Bearer: ${authHeader}` } : {}
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: getHeaders(),
})

// To add extra logic to each request and/or response, use
// axios incerceptors https://github.com/axios/axios#interceptors

export const getUsers = async () => apiClient.get('/users')

export const getUser = async (userId) => apiClient.get(`/users/${userId}`)

export const createUser = async (newUser) => apiClient.post('/users', newUser)

export const updateUser = async (userId, updatedUser) =>
  apiClient.put(`/users/${userId}`, updatedUser)

