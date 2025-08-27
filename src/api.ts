import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// Auth
export const signup = (data: { name: string; email: string; password: string }) =>
  API.post("/signup", data);

export const login = (data: { email: string; password: string }) =>
  API.post("/login", data);

// Notes
export const getNotes = () => API.get("/note");
export const createNote = (note: { title: string; description: string; authorEmail: string }) =>
  API.post("/note", note);
export const updateNote = (id: string, note: { title: string; description: string }) =>
  API.put(`/note?id=${id}`, note);
export const deleteNote = (id: string) =>
  API.delete(`/note?id=${id}`);

export default API;
