import axios from "axios";


const myKey: string = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN!;

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${myKey}`,
  }
});

