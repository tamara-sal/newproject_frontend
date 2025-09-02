import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});


export interface User {
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Note {
  _id: string;
  title: string;
  description: string;
  authorEmail: string;
}


export const signup = (data: { name: string; email: string; password: string }) =>
  API.post<AuthResponse>("/signup", data);


export const login = (data: { email: string; password: string }) =>
  API.post<AuthResponse>("/login", data);


export const getNotes = () =>
  API.get<Note[]>("/note");


export const createNote = (note: { title: string; description: string; authorEmail: string }) =>
  API.post<Note>("/note", note);


export const updateNote = (id: string, note: { title: string; description: string }) =>
  API.put<Note>(`/note?id=${id}`, note);

export const deleteNote = (id: string) =>
  API.delete<void>(`/note?id=${id}`);
export const updateUser = (user: { name: string; email: string }) =>
  API.put("/profile", user);
export default API;
