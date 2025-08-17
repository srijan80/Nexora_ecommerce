"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  gender: string;
  image: string;
}

export default function ShopPage() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase.from("Product").select("*");

        if (error) {
          console.error("Error fetching products:", error);
          return;
        }

        setProducts(data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedGender === "All"
      ? products
      : products.filter(
          (p) => p.gender.toLowerCase() === selectedGender.toLowerCase()
        );

  const handleBuyNow = (productId: number) => {
    if (!auth.currentUser) {
      router.push("/auth");
    } else {
      router.push(`/product/${productId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen pt-36 bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-60 bg-[#EFF3EA] p-6 shadow-xl h-full sticky top-36 self-start">
        <h2 className="text-lg font-bold mb-5">FILTER BY GENDER</h2>
        <ul className="space-y-2">
          {["All", "Male", "Female"].map((gender) => (
            <li key={gender}>
              <button
                onClick={() => setSelectedGender(gender)}
                className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer font-medium transition-all duration-200 capitalize ${
                  selectedGender === gender
                    ? "bg-black text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {gender}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-8">Our Products</h2>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-400">No products available for this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white text-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-5 flex flex-col"
              >
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-2xl hover:opacity-80"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-blue-600 font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="line-through text-gray-500 text-sm">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto space-y-2">
                    <button
                      onClick={() => handleBuyNow(product.id)}
                      className="w-full cursor-pointer bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
