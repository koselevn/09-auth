import { api } from "../api";
import { FormValues, Note } from "../../types/note";

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// ------------------- NOTES -------------------

export async function fetchNotes(search: string, page: number, tag?: string): Promise<NoteResponse> {
  const response = await api.get<NoteResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

export async function createNote(data: FormValues): Promise<Note> {
  const response = await api.post<Note>("/notes", data, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

// ------------------- AUTH -------------------

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  } catch (error) {
    if (error) {
      console.log(error);
    }
    console.log("Login filed")
  }
}