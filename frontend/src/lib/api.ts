import axios from 'axios'
import { config } from "@repforce/shared"

export const api = axios.create({
  baseURL: config.backend.url,
})