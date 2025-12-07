import { NewNote, Note} from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";


export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest={
     email: string;
  password: string;
  userName: string;
}
export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username: string;
  
};

export const fetchNotes = async (query: string, page: number, categoryId?: string) => {
  const res = await nextServer.get<NoteResponse>('/notes', {
    params: {
     search: query,
      page: page,
    tag: categoryId 
   } 
  })
  return res.data;
}

export const createNote = async (newNote: NewNote) => {
  const res = await nextServer.post<Note>('/notes', newNote )
  return res.data;
}



export const deleteNote = async (id: string) => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
   return res.data;
}

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
   return res.data;
}


export const register = async (data:RegisterRequest)=>{
    const res = await nextServer.post<User>('/auth/register', data);
    return res.data
}

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};
export const  checkSession = async () => {
    const res = await nextServer.get<CheckSessionRequest>('/auth/session');
      return res.data.success;
}
export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};