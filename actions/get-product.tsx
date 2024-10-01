import { Product } from "../types";

const URL = `${process.env.NEXT_FENBAYA_PUBLIC_API_URL}/products`

export default async function fetchProduct(id: string): Promise<Product> {
    const response = await fetch(`${URL}/${id}`);
    return response.json();
}