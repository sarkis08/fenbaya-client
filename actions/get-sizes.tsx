import { Size } from "../types";

const URL = `${process.env.NEXT_FENBAYA_PUBLIC_API_URL}/sizes`

export default async function fetchSizes(): Promise<Size[]> {
    const response = await fetch(URL);
    return response.json();
}