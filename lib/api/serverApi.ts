import { api } from "./api";
import { cookies } from "next/headers";
import { Note } from "../../types/note";
import { User } from "@/types/user";
import { isAxiosError, AxiosResponse } from "axios";

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

// ------------------- NOTES -------------------

export async function fetchNotes( search: string, page: number, tag?: string): Promise<NoteResponse> {
  const cookieHeader = cookies().toString();
  const response = await api.get<NoteResponse>("/notes", {
    headers: { Cookie: cookieHeader },
    params: { search, page, perPage: 12, tag },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieHeader = cookies().toString();

  const response = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });

  return response.data;
}

// ------------------- USER PROFILE -------------------

export async function getMe(): Promise<User> {
  const cookieHeader = cookies().toString();

  const response = await api.get<User>("/users/me", {
    headers: { Cookie: cookieHeader },
  });

  return response.data;
}

// ------------------- SESSION -------------------

export async function checkSession(): Promise<AxiosResponse | null> {
  try {
    const cookieHeader = cookies().toString();

    const response = await api.get("/auth/session", {
      headers: {
        Cookie: cookieHeader,
        Accept: "application/json",
      },
    });

    return response;
    
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Session refresh failed:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
}
