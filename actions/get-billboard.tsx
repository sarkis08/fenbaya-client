import { Billboard } from "../types";

const URL = `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/billboards`

export default async function fetchBillboard(id: string): Promise<Billboard> {
    const response = await fetch(`${URL}/${id}`);
    return response.json();
}