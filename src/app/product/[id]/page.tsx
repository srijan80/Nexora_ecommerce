"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  gender: string;
  image: string;
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from("Product")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          console.error("Error fetching product:", error);
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleBuyNow = () => {
    if (!product) return;
    alert(`Added ${product.name} to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <ChevronLeft size={20} />
            Go Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="max-w-6xl w-full px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="sticky top-24">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-light text-gray-900 mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="text-gray-600">
                  <p className="mb-2">Gender: {product.gender}</p>
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-xl hover:bg-gray-800 transition-colors font-medium text-lg"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}