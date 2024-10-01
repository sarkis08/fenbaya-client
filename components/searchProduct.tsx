"use client";

import { Product } from "@/types";
import debounce from "lodash.debounce";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SearchProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounced search handler
  const handleSearch = debounce(async (query: string) => {
    if (!query) {
      setProducts([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`https://fenbaya-admin.vercel.app/api/66de4a96-47fc-4e55-94f8-c9b38d9b3c25/products/searchProduct?query=${query}`);

      console.log("Response:", res);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      

      const data = await res.json();

      console.log("Fetched Products:", data); // Log API response to inspect data
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, 300); // Debounce to avoid too many API calls

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <input
        className="w-full p-2 border-2 border-gray-900 rounded-lg placeholder-gray-400 text-sm pl-3 focus:outline-none"
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
      />

      {/* Loading Spinner */}
      {loading ? (
        <div className="absolute top-2 right-4">
          <Loader className="animate-spin" size={22} />
        </div>
      ): null}

      {/* Product Dropdown */}
      {products.length > 0 ? (
        <div className="absolute bg-white max-w-md w-full z-20 left-0 top-12 border border-gray-300 rounded-lg shadow-lg">
          {products.map((item: Product) => (
            <div className="p-2 hover:bg-gray-100" key={item.id}>
              <Link
                href={`/products/${item.id}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  {/* Ensure the image URL is correct */}
                  <Image
                    className="rounded-md"
                    width={40}
                    height={40}
                    src={item?.images[0]?.url || "/fallback-image.png"}
                    alt={item?.name || "Product Image"}
                  />
                  <div className="ml-3 text-sm font-semibold truncate">{item?.name}</div>
                </div>
                <div className="text-sm font-medium">
                  ${(Number(item?.price) / 100).toFixed(2)}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchProduct;
