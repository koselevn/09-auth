import { api } from "../api";
import { FormValues, Note } from "../../types/note";
import { User } from "@/types/user";

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
  user?: User;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    return { message: "Login failed" };
  }
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Register failed:", error);
    return { message: "Register failed" };
  }
}

export async function logout(): Promise<{ message: string }> {
  try {
    const response = await api.post<{ message: string }>("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    return { message: "Logout failed" };
  }
}

export async function checkSession(): Promise<{ valid: boolean }> {
  try {
    const response = await api.get<{ valid: boolean }>("/auth/session");
    return response.data;
  } catch (error) {
    console.error("Check session failed:", error);
    return { valid: false };
  }
}