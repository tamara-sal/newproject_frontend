import axios from "axios";

const FASH_API = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

export interface ClothingItem {
  _id: string;
  name: string;
  image: string;
  category: "men" | "women";
}

export const getFashion = (category: "men" | "women") =>
  FASH_API.get<ClothingItem[]>(`/clothes?category=${category}`);

export const addCloth = (data: { name: string; image: string; category: "men" | "women" }) =>
  FASH_API.post<ClothingItem>("/clothes/add", data);

export default FASH_API;
