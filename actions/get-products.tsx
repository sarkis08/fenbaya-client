import qs from "query-string"

import { Product } from "../types";

const URL = `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/products`

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

export default async function fetchProducts(query: Query): Promise<Product[]> {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            colorId: query.colorId,
            sizeId: query.sizeId,
            isFeatured: query.isFeatured,
            categoryId: query.categoryId,
        }
    })
    const response = await fetch(url);
    return response.json();
}