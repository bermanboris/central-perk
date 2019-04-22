import axios from 'axios';
import { config } from './config';

/**
 * HTTP Client - Axios Instance with predefined base API url
 */
export const httpClient = axios.create({
  baseURL: config.bringg.apiUrl,
});
