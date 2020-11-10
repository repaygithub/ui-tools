---
to: <%=directory%>/<%=name%>/src/helpers/api.ts
---

import axios, { AxiosResponse } from 'axios'

const BASE_URL = 'https://www.repay.com'

type User = { name: string; id: string }

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

export const getUsers = async (): Promise<AxiosResponse<unknown>> => apiClient.get('/users')

export const getUser = async (userId: string): Promise<AxiosResponse<unknown>> =>
  apiClient.get(`/users/${userId}`)

export const createUser = async (newUser: User): Promise<AxiosResponse<unknown>> =>
  apiClient.post('/users', newUser)

export const updateUser = async (
  userId: string,
  updatedUser: User
): Promise<AxiosResponse<unknown>> => apiClient.put(`/users/${userId}`, updatedUser)
