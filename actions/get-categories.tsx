import { Category } from "../types";

const URL = `${process.env.NEXT_FENBAYA_PUBLIC_API_URL}/categories`

export default async function fetchCategories(): Promise<Category[]> {
    const response = await fetch(URL);
    return response.json();
}