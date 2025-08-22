const BASE_URL = "http://localhost:8000"; // your Go backend

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  message?: string;
  token?: string;
  user?: T;
  error?: string;
}

export const login = async (body: LoginRequest): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const signup = async (body: SignupRequest): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const uploadNotes = async (token: string, fileData: FormData): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: fileData,
  });
  return res.json();
};

export const getNotes = async (token: string): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
