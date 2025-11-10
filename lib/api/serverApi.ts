import { api } from "./api";
import { cookies } from "next/headers";
import { Note } from "../../types/note";

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(search: string, page: number, tag?: string): Promise<NoteResponse> {
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

export async function getMe() {
  const cookieHeader = cookies().toString();
  const response = await api.get("/users/me", {
    headers: { Cookie: cookieHeader },
  });
  return response.data;
}

export async function checkSession() {
  const cookieHeader = cookies().toString();
  const response = await api.get("/users/session", {
    headers: { Cookie: cookieHeader },
  });
  return response.data;
}
