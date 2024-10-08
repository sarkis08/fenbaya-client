import { Color } from "../types";

const URL = `${process.env.NEXT_FENBAYA_PUBLIC_API_URL}/colors`

export default async function fetchColor(): Promise<Color[]> {
    const response = await fetch(URL);
    return response.json();
}