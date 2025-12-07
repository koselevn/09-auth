import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>

const myKey: string = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN!;


export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${myKey}`,
  }
});

