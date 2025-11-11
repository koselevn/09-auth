import { api } from "./api";
import { FormValues, Note } from "../../types/note";
import { User } from "@/types/user";

// ------------------- TYPES -------------------

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  user?: User;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// ------------------- AXIOS CONFIG -------------------

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});


// ------------------- NOTES -------------------

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<NoteResponse> {
  const response = await api.get<NoteResponse>("/notes", {
    params: { search, page, perPage: 12, tag },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(data: FormValues): Promise<Note> {
  const response = await api.post<Note>("/notes", data);
  return response.data;
}

export async function deleteNote(id: string): Promise<{ message: string }> {
  const response = await api.delete<{ message: string }>(`/notes/${id}`);
  return response.data;
}

// ------------------- AUTH -------------------

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
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

// ------------------- USER PROFILE -------------------

// ✅ Отримання профілю поточного користувача
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}

// ✅ Оновлення профілю користувача
export async function updateCurrentUser(
  data: Partial<User>
): Promise<User> {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
}