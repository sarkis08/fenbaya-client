import { Category } from "../types";

const URL = `${process.env.NEXT_FENBAYA_PUBLIC_API_URL}/categories`

export default async function fetchCategory(id: string): Promise<Category> {
    const response = await fetch(`${URL}/${id}`);
    return response.json();
}