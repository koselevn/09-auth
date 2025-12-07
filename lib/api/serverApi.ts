import { cookies } from 'next/headers';
import { Note } from '@/types/note';
import { nextServer } from './api';
import { NoteResponse } from './clientApi';
import { User } from '@/types/user';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
export const fetchServerNoteById = async (id: string):Promise<Note> => {
   const cookieStore = await cookies();
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
export const fetchServerNotes = async (query: string, page: number, categoryId?: string):Promise<NoteResponse> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get(`/notes`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
     params: {
     search: query,
      page: page,
    tag: categoryId 
   } 
  });
  return data;
}
