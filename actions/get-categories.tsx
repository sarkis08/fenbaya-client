import { Category } from "../types";

const categoriesAPI = `${process.env.NEXT_FENBAYA_PUBLIC_API_URL}/categories`

export default async function fetchCategories(): Promise<Category[]> {
    
    const response = await fetch(categoriesAPI);
    return response.json();
}